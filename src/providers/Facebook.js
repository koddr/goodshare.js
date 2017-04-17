/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Facebook (https://facebook.com) provider.
 */

class Facebook {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=facebook]');
    let thisUrl = this.url;
    let thisTitle = this.title;
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          let share_url = 'https://facebook.com/sharer/sharer.php?u=' + thisUrl + '&t=' + thisTitle;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=facebook]');

    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, count;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('facebook_' + id);
          thisUrl = encodeURIComponent(item.parentNode.getAttribute('data-target'));
        }
        else{
          callback = ('facebook_' + Math.random()).replace('.', '');
          id = 0;
        }
        script[id] = document.createElement('script');
        count_url = 'https://graph.facebook.com/?id=' + thisUrl + '&callback=' + callback;
        window[callback] = (counter) => {
          count = typeof counter.share !== 'undefined' ? counter.share.share_count : 0;
          item.innerHTML = count;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let facebook_share = new Facebook().shareWindow();
export let facebook_counter = new Facebook().getCounter();