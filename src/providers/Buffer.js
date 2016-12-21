/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Buffer (https://buffer.com) provider.
 */

class Buffer {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_url = 'https://buffer.com/add?url=' + this.url + '&text=' + this.title;
    
    document.body
      .querySelectorAll('[data-social=buffer]')
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
    let callback = ('cb_' + Math.random()).replace('.', '');
    let count_url = 'https://api.bufferapp.com/1/links/shares.json?url=' + this.url + '&callback=' + callback;
  
    window[callback] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=buffer]')
        .forEach(function (item) {
          item.innerHTML = (counter.shares) ? counter.shares : 0;
        });
    
      script.parentNode.removeChild(script);
    };
  
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let buffer_share = new Buffer().shareWindow();
export let buffer_counter = new Buffer().getCounter();