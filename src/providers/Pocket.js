/**
 *  Vic Shóstak <vikkyshostak@gmail.com>
 *  Copyright (c) 2019 True web artisans https://truewebartisans.com
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pocket (https://getpocket.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Pocket extends ProviderMixin {
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
    const share_url = `https://getpocket.com/save?url=${url}&title=${title}`;

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
    const share_elements = document.querySelectorAll('[data-social="pocket"]');

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const callback = ("goodshare_" + Math.random()).replace(".", "");
    const count_elements = document.querySelectorAll('[data-counter="pocket"]');
    const count_url =
      "https://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent(
        'select * from html where url="https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=' +
          this.url +
          "&src=" +
          this.url +
          '" and xpath="*"'
      ) +
      "&callback=" +
      callback;

    if (count_elements.length > 0) {
      window[callback] = counter => {
        [...count_elements].forEach(item => {
          item.innerHTML =
            counter.results.length > 0
              ? counter.results[0].match(/em id="cnt">(\d+)</)[1] / 1
              : 0;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
