/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pinterest (https://pinterest.com) provider.
 */

class Pinterest {
  constructor (url = document.location.href,
               description = document.querySelector('meta[name="description"]'),
               image = document.querySelector('link[rel="apple-touch-icon"]')) {
    this.url = encodeURIComponent(url);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="pinterest"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const description = item.dataset.description ? encodeURIComponent(item.dataset.description) : this.description;
      const image = item.dataset.image ? encodeURIComponent(item.dataset.image) : this.image;
      const share_url = `https://www.pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${image}`;
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const callback = ('goodshare_' + Math.random()).replace('.', '');
    const count_elements = document.querySelectorAll('[data-counter="pinterest"]');
    const count_url = `https://api.pinterest.com/v1/urls/count.json?url=${this.url}&callback=${callback}`;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = (counter.length > 0) ? counter.count : 0;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export const pinterest_share = new Pinterest().shareWindow();
export const pinterest_counter = new Pinterest().getCounter();
