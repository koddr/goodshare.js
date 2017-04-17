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
    let thisUrl = this.url;
    let thisTitle = this.title;
    let share_elements = document.querySelectorAll('[data-social=stumbleupon]');
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          let share_url = 'https://stumbleupon.com/submit?url=' + thisUrl + '&title=' + thisTitle;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=stumbleupon]');
    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, itemCountUrl;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('stumbleupon_' + id);
          itemCountUrl = item.parentNode.getAttribute('data-target');
          itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
        }
        else{
          id = 0;
          callback = ('stumbleupon_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        count_url = 'https://query.yahooapis.com/v1/public/yql?q='
          + encodeURIComponent('select * from html where url="http://www.stumbleupon.com/services/1.01/badge.getinfo?url='
            + thisUrl + '" and xpath="*"') + '&callback=' + callback;
        window[callback] = (counter) => {
          item.innerHTML = ((counter.results[0]).match(/"views":(\d+),/) != null)
            ? (counter.results[0]).match(/"views":(\d+),/)[1] / 1
            : 0;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let stumbleupon_share = new StumbleUpon().shareWindow();
export let stumbleupon_counter = new StumbleUpon().getCounter();