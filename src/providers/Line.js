/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LINE (https://line.me) provider.
 */

import { ProviderMixin } from '../utils/ProviderMixin';

export class Line extends ProviderMixin {
  constructor (url = document.location.href) {
    super();
    this.url = encodeURIComponent(url);
  }
  
  // Share event
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="line"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const share_url = `line://msg/text/${url}`;
      
      this.events.addEventListener(item, `click.${this.instanceId}`, function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
}
