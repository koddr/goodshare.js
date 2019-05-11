/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Baidu (https://baidu.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Baidu extends ProviderMixin {
  constructor(
    url = document.location.href,
    title = document.title,
    description = document.querySelector('meta[name="description"]')
  ) {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = description
      ? encodeURIComponent(description.content)
      : "";
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? encodeURIComponent(item.dataset.url)
      : this.url;
    const title = item.dataset.title
      ? encodeURIComponent(item.dataset.title)
      : this.title;
    const description = item.dataset.description
      ? encodeURIComponent(item.dataset.description)
      : this.description;
    const share_url = `https://cang.baidu.com/do/add?iu=${url}&it=${title}&dc=${description}&fr=ien`;

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
    const share_elements = document.querySelectorAll('[data-social="baidu"]');

    return this.createEvents(share_elements);
  }
}
