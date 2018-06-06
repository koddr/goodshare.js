/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Skype (https://skype.com) provider.
 */

import { ProviderMixin } from './ProviderMixin';

export class Skype extends ProviderMixin {
  constructor (url = document.location.href) {
    super();
    this.url = encodeURIComponent(url);
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="skype"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const share_url = `https://web.skype.com/share?${url}`;
  
      this.events.addEventListener(item, 'click.' + this.instanceId, function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
}
