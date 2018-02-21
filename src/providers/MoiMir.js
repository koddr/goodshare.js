/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  My@Mail.Ru (https://my.mail.ru) provider.
 */

class MoiMir {
  constructor (url = document.location.href, title = document.title,
               description = document.querySelector('meta[name="description"]'),
               image = document.querySelector('link[rel="apple-touch-icon"]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="moimir"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const description = item.dataset.description ? encodeURIComponent(item.dataset.description) : this.description;
      const image = item.dataset.image ? encodeURIComponent(item.dataset.image) : this.image;
      const share_url = `https://connect.mail.ru/share?url=${url}&title=${title}&description=${description}&imageurl=${image}`;
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const this_url = encodeURIComponent((this.url).replace(/^.*?:\/\//, ''));
    const callback = ('goodshare_' + Math.random()).replace('.', '');
    const count_elements = document.querySelectorAll('[data-counter="moimir"]');
    const count_url = 'https://appsmail.ru/share/count/' + this_url + '?callback=' + callback;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = counter.share_mm;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export const moimir_share = new MoiMir().shareWindow();
export const moimir_counter = new MoiMir().getCounter();
