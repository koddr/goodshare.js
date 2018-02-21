/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Telegram (https://telegram.org) provider.
 */

class Telegram {
  constructor (url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="telegram"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const rhash = item.dataset.rhash ? item.dataset.rhash : null;
      let share_url = `https://t.me/share/url?url=${url}`;
      
      if (rhash !== null) {
        // For more info about Telegram Instant View read the docs:
        // https://instantview.telegram.org/docs
        share_url = `https://t.me/iv?url=${url}&rhash=${rhash}`;
      }
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
}

export const telegram_share = new Telegram().shareWindow();
