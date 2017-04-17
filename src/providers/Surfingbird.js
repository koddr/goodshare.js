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
              description = document.querySelector('meta[name=description]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
  }
  
  shareWindow() {
    let thisUrl = this.url;
    let thisTitle = this.title;
    let thisDescription = this.description;
    let share_elements = document.querySelectorAll('[data-social=surfingbird]');
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          item.hasAttribute('data-description')
            ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          let share_url = 'https://surfingbird.ru/share?url=' + thisUrl + '&title=' + thisTitle +
            '&description=' + thisDescription;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=surfingbird]');
    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, itemCountUrl;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('surfingbird_' + id);
          itemCountUrl = item.parentNode.getAttribute('data-target');
          itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
        }
        else{
          id = 0;
          callback = ('surfingbird_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        count_url = 'https://query.yahooapis.com/v1/public/yql?q='
          + encodeURIComponent('select * from html where url="https://surfingbird.ru/button?url='
            + thisUrl + '" and xpath="*"') + '&callback=' + callback;
        window[callback] = (counter) => {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/span class="stats-num">(\d+)</)[1] / 1
            : 0;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let surfingbird_share = new Surfingbird().shareWindow();
export let surfingbird_counter = new Surfingbird().getCounter();