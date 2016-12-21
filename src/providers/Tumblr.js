/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Tumblr (https://tumblr.com) provider.
 */

class Tumblr {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector('meta[name=description]').content) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
  }
  
  shareWindow() {
    let share_url = 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' + this.url +
      '&title=' + this.title + '&caption=' + this.description + '&posttype=link';
    
    document.body
      .querySelectorAll('[data-social=tumblr]')
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
    let count_url = 'https://api.tumblr.com/v2/share/stats?url=' + this.url + '&callback=' + callback;
  
    window[callback] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=tumblr]')
        .forEach(function (item) {
          item.innerHTML = counter.response.note_count;
        });
    
      script.parentNode.removeChild(script);
    };
  
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let tumblr_share = new Tumblr().shareWindow();
export let tumblr_counter = new Tumblr().getCounter();