/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Facebook (https://facebook.com) provider.
 */

class Facebook {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=facebook]');
    let share_url = 'https://facebook.com/sharer/sharer.php?u=' + this.url + '&t=' + this.title;
    
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
    let callback = ('goodshare_' + Math.random()).replace('.', '');
    let count_elements = document.querySelectorAll('[data-counter=facebook]');
    let count_url = 'https://graph.facebook.com/?id=' + this.url + '&callback=' + callback;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = (counter.share) ? counter.share.share_count : 0;
        });
    
        script.parentNode.removeChild(script);
      };
  
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export let facebook_share = new Facebook().shareWindow();
export let facebook_counter = new Facebook().getCounter();