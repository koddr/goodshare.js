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

  // Handler wrapper for callback manipulations
  eventHandler(event, { share_url, windowTitle, windowWidth, windowHeight }) {
    event.preventDefault();

    // Calc top & left window position
    const screenWidth =
      window.outerWidth || window.document.documentElement.offsetWidth;
    const screenHeight =
      window.outerHeight || window.document.documentElement.offsetHeight;
    const screenTop = Math.round(screenHeight / 2 - windowHeight / 2);
    const screenLeft = Math.round(screenWidth / 2 - windowWidth / 2);

    // Set window size & window position
    const windowSize = `width=${windowWidth},height=${windowHeight}`;
    const windowPosition = `left=${screenLeft},top=${screenTop}`;

    // Build full window options
    const windowOptions = `${windowSize},${windowPosition},location=no,toolbar=no,menubar=no`;

    // Build window open object
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
    if (typeof this.shareWindow === "function") this.shareWindow();
    if (typeof this.getCounter === "function") this.getCounter();

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
