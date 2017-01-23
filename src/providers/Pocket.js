/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pocket (https://getpocket.com) provider.
 */

class Pocket {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=pocket]');
    let share_url = 'https://getpocket.com/save?url=' + this.url + '&title=' + this.title;
    
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
    let count_elements = document.querySelectorAll('[data-counter=pocket]');
    let count_url = 'https://query.yahooapis.com/v1/public/yql?q='
      + encodeURIComponent('select * from html where url="https://widgets.getpocket.com/v1/button?count=horizontal&url='
        + this.url + '" and xpath="*"') + '&callback=' + callback;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/em id="cnt">(\d+)</)[1] / 1
            : 0;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export let pocket_share = new Pocket().shareWindow();
export let pocket_counter = new Pocket().getCounter();