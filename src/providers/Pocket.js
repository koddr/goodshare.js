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
    let thisUrl = this.url;
    let thisTitle = this.title;
    let share_elements = document.querySelectorAll('[data-social=pocket]');
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          let share_url = 'https://getpocket.com/save?url=' + thisUrl + '&title=' + thisTitle;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=pocket]');
    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, itemCountUrl, targetUrl;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('pocket_' + id);
          itemCountUrl = item.parentNode.getAttribute('data-target');
          itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
        }
        else{
          id = 0;
          callback = ('pocket_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        targetUrl = 'https://widgets.getpocket.com/v1/button?count=horizontal&url=' + thisUrl;
        count_url = 'https://query.yahooapis.com/v1/public/yql?q='
          + encodeURIComponent('select * from html where url="' + targetUrl + '" and xpath="*"')
          + '&callback=' + callback;
        window[callback] = (counter) => {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/em id="cnt">(\d+)</)[1] / 1
            : 0;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let pocket_share = new Pocket().shareWindow();
export let pocket_counter = new Pocket().getCounter();