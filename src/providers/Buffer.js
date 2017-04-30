/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Buffer (https://buffer.com) provider.
 */

class Buffer {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=buffer]');
    let thisUrl = this.url;
    let thisTitle = this.title;

    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          let share_url = 'https://buffer.com/add?url=' + thisUrl + '&text=' + thisTitle;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=buffer]');
    if (count_elements.length > 0) {
        let script = [];
        let thisUrl = this.url;
        let count_url, itemCountUrl;

        [...count_elements].forEach((item) => {
            let id, callback;
            if (item.hasAttribute('data-id')) {
                id = item.getAttribute('data-id');
                callback = ('buffer_' + id);
                itemCountUrl = item.parentNode.getAttribute('data-target');
                itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
            }
            else{
                id = 0;
                callback = ('buffer_' + Math.random()).replace('.', '');
            }
            script[id] = document.createElement('script');
            count_url = 'https://api.bufferapp.com/1/links/shares.json?url=' + thisUrl + '&callback=' + callback;
            window[callback] = (counter) => {
                item.innerHTML = typeof(counter.shares) !== 'undefined' ? counter.shares : 0;
                script[id].parentNode.removeChild(script[id]);
            };
            script[id].src = count_url;
            document.body.appendChild(script[id]);
        });
    }
  }
}

export let buffer_share = new Buffer().shareWindow();
export let buffer_counter = new Buffer().getCounter();