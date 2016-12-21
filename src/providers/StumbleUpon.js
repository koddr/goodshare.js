/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  StumbleUpon (https://stumbleupon.com) provider.
 */

class StumbleUpon {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_url = 'https://stumbleupon.com/submit?url=' + this.url + '&title=' + this.title;
    
    document.body
      .querySelectorAll('[data-social=stumbleupon]')
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
    let count_url = 'https://query.yahooapis.com/v1/public/yql?q='
      + encodeURIComponent('select * from html where url="http://www.stumbleupon.com/services/1.01/badge.getinfo?url=' + this.url + '" and xpath="*"') + '&callback=' + callback;
    
    window[callback] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=stumbleupon]')
        .forEach(function (item) {
          item.innerHTML = ((counter.results[0]).match(/"views":(\d+),/) != null)
            ? (counter.results[0]).match(/"views":(\d+),/)[1] / 1
            : 0;
        });
      
      script.parentNode.removeChild(script);
    };
    
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let stumbleupon_share = new StumbleUpon().shareWindow();
export let stumbleupon_counter = new StumbleUpon().getCounter();