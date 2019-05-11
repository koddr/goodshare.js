/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Vkontakte extends ProviderMixin {
  constructor(
    url = document.location.href,
    title = document.title,
    image = document.querySelector('link[rel="apple-touch-icon"]')
  ) {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.image = image ? encodeURIComponent(image.href) : "";
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? encodeURIComponent(item.dataset.url)
      : this.url;
    const title = item.dataset.title
      ? encodeURIComponent(item.dataset.title)
      : this.title;
    const image = item.dataset.image
      ? encodeURIComponent(item.dataset.image)
      : this.image;
    const share_url = `https://vk.com/share.php?url=${url}&title=${title}&image=${image}`;

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
      '[data-social="vkontakte"]'
    );

    return this.createEvents(share_elements);
  }

  // Show counter event
  getCounter() {
    const script = document.createElement("script");
    const count_elements = document.querySelectorAll(
      '[data-counter="vkontakte"]'
    );
    const count_url = `https://vk.com/share.php?act=count&index=1&url=${
      this.url
    }`;

    window.VK = Object.assign({}, { Share: {} }, window.VK);

    if (count_elements.length > 0) {
      window.VK.Share.count = (_, counter) => {
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
