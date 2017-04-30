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
    let thisUrl = this.url;
    let share_elements = document.querySelectorAll('[data-social=xing]');
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          let share_url = 'https://www.xing.com/spi/shares/new?url=' + thisUrl;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=xing]');
    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, itemCountUrl;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('xing_' + id);
          itemCountUrl = item.parentNode.getAttribute('data-target');
          itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
        }
        else{
          id = 0;
          callback = ('xing_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        count_url = 'https://query.yahooapis.com/v1/public/yql?q='
          + encodeURIComponent('select * from html where url="https://www.xing-share.com/app/share?op=get_share_button;counter=top;url='
            + thisUrl + '" and xpath="*"') + '&callback=' + callback;
        window[callback] = (counter) => {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/span class="xing-count top">(\d+)</)[1] / 1
            : 0;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let xing_share = new Xing().shareWindow();
export let xing_counter = new Xing().getCounter();