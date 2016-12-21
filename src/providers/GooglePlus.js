/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Google Plus (https://plus.google.com) provider.
 */

class GooglePlus {
  constructor(url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow() {
    let share_url = 'https://plus.google.com/share?url=' + this.url;
    
    document.body
      .querySelectorAll('[data-social=googleplus]')
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
      + encodeURIComponent('select * from html where url="https://plusone.google.com/_/+1/fastbutton?url=' + this.url + '" and xpath="*"') + '&callback=' + callback;
  
    window[callback] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=googleplus]')
        .forEach(function (item) {
          item.innerHTML = ((counter.results[0]).match(/javascript">window.__SSR = \{c: (\d+).0/) != null)
            ? (counter.results[0]).match(/javascript">window.__SSR = \{c: (\d+).0/)[1] / 1
            : 0;
        });
    
      script.parentNode.removeChild(script);
    };
  
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let googleplus_share = new GooglePlus().shareWindow();
export let googleplus_counter = new GooglePlus().getCounter();