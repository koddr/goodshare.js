/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Surfingbird (https://surfingbird.ru) provider.
 */

class Surfingbird {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector('meta[name=description]').content) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
  }
  
  shareWindow() {
    let share_url = 'https://surfingbird.ru/share?url=' + this.url + '&title=' + this.title +
      '&description=' + this.description;
    
    document.body
      .querySelectorAll('[data-social=surfingbird]')
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
      + encodeURIComponent('select * from html where url="https://surfingbird.ru/button?url=' + this.url + '" and xpath="*"') + '&callback=' + callback;
  
    window[callback] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=surfingbird]')
        .forEach(function (item) {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/span class="stats-num">(\d+)</)[1] / 1
            : 0;
        });
    
      script.parentNode.removeChild(script);
    };
  
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let surfingbird_share = new Surfingbird().shareWindow();
export let surfingbird_counter = new Surfingbird().getCounter();