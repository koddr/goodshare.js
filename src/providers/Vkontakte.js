/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

class Vkontakte {
  constructor (url = document.location.href, title = document.title,
               image = document.querySelector('link[rel="apple-touch-icon"]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="vkontakte"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const image = item.dataset.image ? encodeURIComponent(item.dataset.image) : this.image;
      const share_url = `https://vk.com/share.php?url=${url}&title=${title}&image=${image}`;
      
      item.addEventListener('click', function (event) {
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
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export const vkontakte_share = new Vkontakte().shareWindow();
export const vkontakte_counter = new Vkontakte().getCounter();
