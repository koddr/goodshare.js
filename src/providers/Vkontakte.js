/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

import { EventWithNamespace, getUniqId } from '../utils';

export class Vkontakte {
  constructor (url = document.location.href, title = document.title,
               image = document.querySelector('link[rel="apple-touch-icon"]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.image = (image) ? encodeURIComponent(image.href) : '';
    this.events = new EventWithNamespace();
    this.instanceId = getUniqId('vkontakte');
  }

  static getInstance () {
    const _instance = new Vkontakte();

    _instance.shareWindow();
    _instance.getCounter();

    return _instance;
  }

  reNewInstance () {
    this.events.removeAll();
    Vkontakte.getInstance();
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="vkontakte"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const image = item.dataset.image ? encodeURIComponent(item.dataset.image) : this.image;
      const share_url = `https://vk.com/share.php?url=${url}&title=${title}&image=${image}`;
      
      this.events.addEventListener(item, 'click.' + this.instanceId, function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const count_elements = document.querySelectorAll('[data-counter="vkontakte"]');
    const count_url = `https://vk.com/share.php?act=count&index=1&url=${this.url}`;
    
    window.VK = Object.assign({}, { Share: {} }, window.VK);
    
    if (count_elements.length > 0) {
      window.VK.Share.count = (_, counter) => {
        [...count_elements].forEach((item) => {
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
