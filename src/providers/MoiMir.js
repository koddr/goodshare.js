/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  My@Mail.Ru (https://my.mail.ru) provider.
 */

class MoiMir {
  constructor(url = document.location.href,
              title = document.title,
              description = document.querySelector('meta[name=description]'),
              image = document.querySelector('link[rel=image_src]')) {
    this.url = url;
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=moimir]');
    let share_url = 'http://connect.mail.ru/share?url=' + encodeURIComponent(this.url) +
      '&title=' + this.title + '&description=' + this.description +
      '&imageurl=' + this.image;
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let script = document.createElement('script');
    let this_url = encodeURIComponent((this.url).replace(/^.*?:\/\//, ''));
    let callback = ('goodshare_' + Math.random()).replace('.', '');
    let count_elements = document.querySelectorAll('[data-counter=moimir]');
    let count_url = 'https://appsmail.ru/share/count/' + this_url + '?callback=' + callback;
    
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

export let moimir_share = new MoiMir().shareWindow();
export let moimir_counter = new MoiMir().getCounter();