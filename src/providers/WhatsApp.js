/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  WhatsApp (https://whatsapp.com) provider.
 */

class WhatsApp {
  constructor (url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="whatsapp"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const share_url = `whatsapp://send?text=${url}`;
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
}

export const whatsapp_share = new WhatsApp().shareWindow();
