/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  SMS provider.
 */

class SMS {
  constructor (url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="sms"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      let share_url = `sms:?&body=${url}`;
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.location.replace(share_url);
      });
    });
  }
}

export const sms_share = new SMS().shareWindow();
