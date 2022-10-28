/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2019 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Twitter (https://twitter.com) provider.
 */

import { ProviderMixin } from "../utils/ProviderMixin";

export class Twitter extends ProviderMixin {
  constructor(url = document.location.href, title = document.title, hashtags = "") {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    // Allow easy discovery of Tweets by topic by including a comma-separated list of hashtag values without the preceding # character.	
    this.hashtags = encodeURIComponent(hashtags);
    this.createEvents = this.createEvents.bind(this);
  }

  getPreparedData(item) {
    const url = item.dataset.url
      ? encodeURIComponent(item.dataset.url)
      : this.url;
    const title = item.dataset.title
      ? encodeURIComponent(item.dataset.title)
      : this.title;
    // Allow easy discovery of Tweets by topic by including a comma-separated list of hashtag values without the preceding # character.	
    // example: nature,sunset
    const hashtags = item.dataset.hashtags
      ? encodeURIComponent(item.dataset.hashtags)
      : this.hashtags;
    const share_url = `https://twitter.com/share?url=${url}&text=${title}&hashtags=${hashtags}`;

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
    const share_elements = document.querySelectorAll('[data-social="twitter"]');

    return this.createEvents(share_elements);
  }
}
