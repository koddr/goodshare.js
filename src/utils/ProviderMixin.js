/**
 *  Ilya Reshetnikov
 *  Copyright (c) 2018 Ilya Reshetnikov https://github.com/devxom
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  ProviderMixin for goodshare.js
 */

import { EventWrapper } from "./EventWrapper";

// Generate unique ID
const getUniqueId = (prefix = "id") =>
  `${prefix}-${Math.random()
    .toString(36)
    .substr(2, 8)}`;

export class ProviderMixin {
  constructor() {
    this.events = new EventWrapper();
    this.callback = function() {};
    this.updateInstanceId();
  }

  // handler wrapper for cb manipulations
  eventHandler(event, { share_url, windowTitle, windowOptions }) {
    event.preventDefault();

    // Turn the string of window options into an object we can destructure to get
    // the width and the height.
    const windowOptionsObject = windowOptions
      .replace(/(^\?)/, "")
      .split(",")
      .map(
        function(n) {
          return (n = n.split("=")), (this[n[0]] = n[1]), this;
        }.bind({})
      )[0];
    const { width, height } = windowOptionsObject;

    // https://github.com/BrandwatchLtd/twitter-intents/blob/master/twitter-intents.js
    const screenTop = window.screenTop;
    const screenLeft = window.screenLeft;
    const windowWidth =
      window.outerWidth || window.document.documentElement.offsetWidth;
    const windowHeight =
      window.outerHeight || window.document.documentElement.offsetHeight;
    let left = screenLeft;
    let top = screenTop;

    left += Math.round(windowWidth / 2 - width / 2);
    if (windowHeight > height) {
      top += Math.round(windowHeight / 2 - height / 2);
    }

    windowOptions = `${windowOptions},left=${left},top=${top}`;
    const windowObject = window.open(share_url, windowTitle, windowOptions);

    const windowCloseChecker = setInterval(() => {
      if (windowObject.closed) {
        this.callback(
          event,
          { share_url, windowTitle, windowOptions },
          windowObject
        );
        clearInterval(windowCloseChecker);
      }
    }, 10);

    return windowObject;
  }

  setShareCallback(callback) {
    this.callback = callback;
  }

  createEvents(share_elements) {
    [...share_elements].forEach(item => {
      const options = this.getPreparedData(item);
      const eventHandler = event =>
        this.eventHandler.call(this, event, options);

      this.events.addEventListener(
        item,
        `click.${this.instanceId}`,
        eventHandler
      );
    });
  }

  // Get instance
  getInstance() {
    if (typeof this.shareWindow === "function") {
      this.shareWindow();
    }

    if (typeof this.getCounter === "function") {
      this.getCounter();
    }

    return this;
  }

  // Update instance ID
  updateInstanceId() {
    this.instanceId = getUniqueId();
  }

  // Renew instance
  reNewInstance() {
    this.events.removeAll();
    this.updateInstanceId();
    return this.getInstance();
  }
}
