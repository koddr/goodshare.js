/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LinkedIn (https://linkedin.com) provider.
 */

class LinkedIn {
  constructor(url = document.location.href,
              title = document.title,
              description = document.querySelector('meta[name=description]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=linkedin]');
    let thisUrl = this.url;
    let thisTitle = this.title;
    let thisDescription = this.description;
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          item.hasAttribute('data-description') ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          let share_url = 'http://www.linkedin.com/shareArticle?url=' + thisUrl +
            '&text=' + thisTitle + '&summary=' + thisDescription + '&mini=true';
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=linkedin]');
    let thisUrl = this.url;

    if (count_elements.length > 0) {
      let script = [];
      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('linkedin_' + id);
          thisUrl = encodeURIComponent(item.parentNode.getAttribute('data-target'));
        }
        else{
          id = 0;
          callback = ('linkedin_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        let count_url = 'https://www.linkedin.com/countserv/count/share?url=' + thisUrl + '&callback=' + callback;
        window[callback] = (counter) => {
          let count = counter.count ? counter.count : 0;
          shareCounters[count_url] = count;
          item.innerHTML = count;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let linkedin_share = new LinkedIn().shareWindow();
export let linkedin_counter = new LinkedIn().getCounter();