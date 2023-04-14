/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Copy to clipboard provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class CopyToClipboard extends ProviderMixin {
  constructor(url = document.location.href) {
    super();
    this.url = url;
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? item.dataset.url
      : this.url;

    return {
      callback: this.callback,
      share_url: url,
    };
  }

  /**
   * Creates a fake textarea element with a value.
   * based on https://github.com/zenorocha/clipboard.js/commit/44df750c9fa5b573d1429159d9d63c48523d2e9c#diff-572f84d85c8c9412f76f7870e2e87cb0ceefcc1ddf0ba094f582f8ccc7974b5c
   * @param {String} value
   * @return {HTMLTextAreaElement}
   */
  createFakeTextarea(value) {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const fakeElement = document.createElement('textarea');
    // Prevent zooming on iOS
    fakeElement.style.fontSize = '12pt';
    // Reset box model
    fakeElement.style.border = '0';
    fakeElement.style.padding = '0';
    fakeElement.style.margin = '0';
    // Move element out of screen horizontally
    fakeElement.style.position = 'absolute';
    fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElement.style.top = `${yPosition}px`;

    fakeElement.setAttribute('readonly', '');
    fakeElement.value = value;

    return fakeElement;
  }

  /**
   * Legacy handler for write to clipboard throw fake element for browser not support API navigator.clipboard.writeText
   * @param value
   * @returns {Promise<void>}
   */
  legacyCopyToClipboard (value) {
    return new Promise(() => {
      const fateTextarea = this.createFakeTextarea(value);
      document.body.appendChild(fateTextarea);
      fateTextarea.select();
      fateTextarea.setSelectionRange(0, fateTextarea.value.length);
      document.execCommand('copy');
      document.body.removeChild(fateTextarea);
    });
  }

  /**
   * Handler wrapper for callback manipulations
   * @param event
   * @param share_url
   * @returns {Promise<never>}
   */
  eventHandler(event, { share_url }) {
    event.preventDefault();

    try {
      navigator.permissions.query({ name: "clipboard-write" })
        .then((result) => {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(share_url).then(() => {
              this.callback(event, {share_url});
            });
          } else {
            this.legacyCopyToClipboard(share_url).then(() => {
              this.callback(event, {share_url});
            });
          }
        });
    } catch (e) {
      this.legacyCopyToClipboard(share_url).then(() => {
        this.callback(event, {share_url});
      });
    }
  }

  /** Share event */
  shareWindow() {
    const share_elements = document.querySelectorAll('[data-social="copy-to-clipboard"]');

    return this.createEvents(share_elements);
  }
}
