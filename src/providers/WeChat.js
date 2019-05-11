/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  WeChat (http://wechat.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class WeChat extends ProviderMixin {
  constructor(url = document.location.href) {
    super();
    this.url = encodeURIComponent(url);
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? encodeURIComponent(item.dataset.url)
      : this.url;
    const share_url = `https://chart.apis.google.com/chart?cht=qr&chs=196x196&chld=Q%7C0&chl=${url}`;

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
    const share_elements = document.querySelectorAll('[data-social="wechat"]');

    return this.createEvents(share_elements);
  }
}
