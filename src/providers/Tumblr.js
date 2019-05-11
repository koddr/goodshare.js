/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Tumblr (https://tumblr.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Tumblr extends ProviderMixin {
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
    const share_url = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${title}&caption=${description}&posttype=link`;

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
    const share_elements = document.querySelectorAll('[data-social="tumblr"]');

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const callback = ("goodshare_" + Math.random()).replace(".", "");
    const count_elements = document.querySelectorAll('[data-counter="tumblr"]');
    const count_url = `https://api.tumblr.com/v2/share/stats?url=${
      this.url
    }&callback=${callback}`;

    if (count_elements.length > 0) {
      window[callback] = counter => {
        [...count_elements].forEach(item => {
          item.innerHTML = counter.response.note_count;
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
