/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Odnoklassniki (https://ok.ru) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Odnoklassniki extends ProviderMixin {
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
    const share_url = `https://connect.ok.ru/offer?url=${url}&title=${title}`;

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
      '[data-social="odnoklassniki"]'
    );

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const count_elements = document.querySelectorAll(
      '[data-counter="odnoklassniki"]'
    );
    const count_url = `https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=${
      this.url
    }`;

    window.ODKL = {};

    if (count_elements.length > 0) {
      window.ODKL.updateCount = (_, counter) => {
        [...count_elements].forEach(item => {
          item.innerHTML = counter;
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
