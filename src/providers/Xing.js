/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Xing (https://xing.com) provider.
 */

class Xing {
  constructor(url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=xing]');
    let share_url = 'https://www.xing.com/spi/shares/new?url=' + this.url;
    
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
    let count_elements = document.querySelectorAll('[data-counter=xing]');
    let count_url = 'https://query.yahooapis.com/v1/public/yql?q='
      + encodeURIComponent('select * from html where url="https://www.xing-share.com/app/share?op=get_share_button;counter=top;url='
        + this.url + '" and xpath="*"') + '&callback=' + callback;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach(function (item) {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/span class="xing-count top">(\d+)</)[1] / 1
            : 0;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export let xing_share = new Xing().shareWindow();
export let xing_counter = new Xing().getCounter();