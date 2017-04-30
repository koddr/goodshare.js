/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Tumblr (https://tumblr.com) provider.
 */

class Tumblr {
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
    let share_elements = document.querySelectorAll('[data-social=tumblr]');
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          item.hasAttribute('data-description')
            ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          let share_url = 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' + thisUrl +
            '&title=' + thisTitle + '&caption=' + thisDescription + '&posttype=link';
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=tumblr]');
    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, itemCountUrl;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('tumblr_' + id);
          itemCountUrl = item.parentNode.getAttribute('data-target');
          itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
        }
        else{
          id = 0;
          callback = ('tumblr_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        count_url = 'https://api.tumblr.com/v2/share/stats?url=' + thisUrl + '&callback=' + callback;
        window[callback] = (counter) => {
          item.innerHTML = counter.response.note_count;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let tumblr_share = new Tumblr().shareWindow();
export let tumblr_counter = new Tumblr().getCounter();