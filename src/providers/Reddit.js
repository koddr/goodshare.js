/**
 *  Vic Shóstak <vikkyshostak@gmail.com>
 *  Copyright (c) 2019 True web artisans https://truewebartisans.com
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Reddit (https://reddit.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Reddit extends ProviderMixin {
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
    const share_url = `https://reddit.com/submit?url=${url}&title=${title}`;

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
    const share_elements = document.querySelectorAll('[data-social="reddit"]');

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const callback = ("goodshare_" + Math.random()).replace(".", "");
    const count_elements = document.querySelectorAll('[data-counter="reddit"]');
    const count_url = `https://www.reddit.com/api/info.json?url=${
      this.url
    }&callback=${callback}`;

    if (count_elements.length > 0) {
      window[callback] = counter => {
        [...count_elements].forEach(item => {
          if (counter.data.children.length > 0) {
            let total_count = 0;

            for (let i = 0; i < counter.data.children.length; i++) {
              total_count += counter.data.children[i].data.score;
            }

            item.innerHTML = total_count;
          } else {
            item.innerHTML = 0;
          }
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
