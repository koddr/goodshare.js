/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  StumbleUpon (https://stumbleupon.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class StumbleUpon extends ProviderMixin {
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
    const share_url = `https://stumbleupon.com/submit?url=${url}&title=${title}`;

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
      '[data-social="stumbleupon"]'
    );

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const callback = ("goodshare_" + Math.random()).replace(".", "");
    const count_elements = document.querySelectorAll(
      '[data-counter="stumbleupon"]'
    );
    const count_url =
      "https://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent(
        'select * from html where url="http://www.stumbleupon.com/services/1.01/badge.getinfo?url=' +
          this.url +
          '" and xpath="*"'
      ) +
      "&callback=" +
      callback;

    if (count_elements.length > 0) {
      window[callback] = counter => {
        [...count_elements].forEach(item => {
          if (counter.results[0]) {
            item.innerHTML =
              counter.results[0].match(/"views":(\d+),/) !== null
                ? counter.results[0].match(/"views":(\d+),/)[1] / 1
                : 0;
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
