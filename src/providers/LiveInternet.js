/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LiveInternet (http://liveinternet.ru) provider.
 */

import { ProviderMixin } from '../utils/ProviderMixin';

export class LiveInternet extends ProviderMixin {
  constructor (url = document.location.href, title = document.title) {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.createEvents = this.createEvents.bind(this);
  }
  
  getPreparedData(item) {
    const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
    const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
    const share_url = `http://www.liveinternet.ru/journal_post.php?action=n_add&cnurl=${url}&cntitle=${title}`;

    return {
      callback: this.callback,
      share_url: share_url,
      windowTitle: "Share this",
      windowOptions: "width=640,height=480,location=no,toolbar=no,menubar=no",
    };
  }
  
  // Share event
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="liveinternet"]');
  
    return this.createEvents(share_elements);
  }
}
