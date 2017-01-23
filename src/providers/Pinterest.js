/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pinterest (https://pinterest.com) provider.
 */

class Pinterest {
  constructor(url = document.location.href,
              description = document.querySelector('meta[name=description]'),
              image = document.querySelector('link[rel=image_src]')) {
    this.url = encodeURIComponent(url);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=pinterest]');
    let share_url = 'https://www.pinterest.com/pin/create/button/?url=' + this.url +
      '&description=' + this.description + '&media=' + this.image;
    
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
    let count_elements = document.querySelectorAll('[data-counter=pinterest]');
    let count_url = 'https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=' + this.url;
    
    if (count_elements.length > 0) {
      window['receiveCount'] = (counter) => {
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

export let pinterest_share = new Pinterest().shareWindow();
export let pinterest_counter = new Pinterest().getCounter();