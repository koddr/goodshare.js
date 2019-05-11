/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Facebook (https://facebook.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Facebook extends ProviderMixin {
  constructor(url = document.location.href, title = document.title) {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? encodeURIComponent(item.dataset.url)
      : this.url;
    const title = item.dataset.title
      ? encodeURIComponent(item.dataset.title)
      : this.title;
    const share_url = `https://facebook.com/sharer/sharer.php?u=${url}&t=${title}`;

    return {
      callback: this.callback,
      share_url: share_url,
      windowTitle: "Share this",
      windowWidth: 640,
      windowHeight: 480
    };
  }

  // Share event
  shareWindow() {
    const share_elements = document.querySelectorAll(
      '[data-social="facebook"]'
    );

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const callback = ("goodshare_" + Math.random()).replace(".", "");
    const count_elements = document.querySelectorAll(
      '[data-counter="facebook"]'
    );
    const count_url = `https://graph.facebook.com/?id=${
      this.url
    }&callback=${callback}`;

    if (count_elements.length > 0) {
      window[callback] = counter => {
        [...count_elements].forEach(item => {
          item.innerHTML = counter.share ? counter.share.share_count : 0;
        });

        if (script.parentNode === null) {
          return;
        }

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
