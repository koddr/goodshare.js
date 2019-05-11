/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Digg (https://digg.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Digg extends ProviderMixin {
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
    const share_url = `https://digg.com/submit?url=${url}&title=${title}`;

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
    const share_elements = document.querySelectorAll('[data-social="digg"]');

    return this.createEvents(share_elements);
  }
}
