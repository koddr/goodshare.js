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
              description = document.head.querySelector('meta[name=description]').content,
              image = document.head.querySelector('link[rel=image_src]').href) {
    this.url = encodeURIComponent(url);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
  }
  
  shareWindow() {
    let share_url = 'https://www.pinterest.com/pin/create/button/?url=' + this.url +
      '&description=' + this.description + '&media=' + this.image;
    
    document.body
      .querySelectorAll('[data-social=pinterest]')
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
          });
      });
  }
  
  getCounter() {
    let script = document.createElement('script');
    let count_url = 'http://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=' + this.url;
  
    window['receiveCount'] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=pinterest]')
        .forEach(function (item) {
          item.innerHTML = counter.count;
        });
    
      script.parentNode.removeChild(script);
    };
  
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let pinterest_share = new Pinterest().shareWindow();
export let pinterest_counter = new Pinterest().getCounter();