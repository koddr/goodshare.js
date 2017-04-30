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
    let share_elements = document.querySelectorAll('[data-social=googleplus]');
    let thisUrl = this.url;

    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          let share_url = 'https://plus.google.com/share?url=' + thisUrl;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=googleplus]');

    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;

      [...count_elements].forEach((item) => {
        let callback, id;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('google_' + id);
          thisUrl = encodeURIComponent(item.parentNode.getAttribute('data-target'));
        }
        else{
          id = 0;
          callback = ('google_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        let count_url = 'https://query.yahooapis.com/v1/public/yql?q='
          + encodeURIComponent('select * from html where url="https://plusone.google.com/_/+1/fastbutton?url='
            + thisUrl + '" and xpath="*"') + '&callback=' + callback;

          window[callback] = (counter) => {
            let m = counter.results[0].match(/window.__SSR = \{c: (\d+).0/);
            let count = m !== null ? m[1] / 1 : 0;
            item.innerHTML = count;
            script[id].parentNode.removeChild(script[id]);
          };
          script[id].src = count_url;
          document.body.appendChild(script[id]);
      });
    }
  }
}

export let googleplus_share = new GooglePlus().shareWindow();
export let googleplus_counter = new GooglePlus().getCounter();