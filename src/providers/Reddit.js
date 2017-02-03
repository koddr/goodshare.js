/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Reddit (https://reddit.com) provider.
 */

class Reddit {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=reddit]');
    let share_url = 'https://reddit.com/submit?url=' + this.url + '&title=' + this.title;
  
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
    let count_elements = document.querySelectorAll('[data-counter=reddit]');
    let count_url = 'https://www.reddit.com/api/info.json?url=' + this.url + '&jsonp=' + callback;
  
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          if (counter.data.children.length > 0) {
            let total_count = 0;
        
            for (let i = 0; i < counter.data.children.length; i++) {
              total_count += counter.data.children[i].data.score;
            }
        
            item.innerHTML = total_count;
          }
          else {
            item.innerHTML = 0;
          }
        });
    
        script.parentNode.removeChild(script);
      };
  
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export let reddit_share = new Reddit().shareWindow();
export let reddit_counter = new Reddit().getCounter();