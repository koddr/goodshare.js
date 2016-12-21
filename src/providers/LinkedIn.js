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
              description = document.head.querySelector('meta[name=description]').content) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
  }
  
  shareWindow() {
    let share_url = 'http://www.linkedin.com/shareArticle?url=' + this.url +
      '&text=' + this.title + '&summary=' + this.description + '&mini=true';
    
    document.body
      .querySelectorAll('[data-social=linkedin]')
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
          });
      });
  }
  
  getCounter() {
    let script = document.createElement('script');
    let callback = ('cb_' + Math.random()).replace('.', '');
    let count_url = 'https://www.linkedin.com/countserv/count/share?url=' + this.url + '&callback=' + callback;
  
    window[callback] = (counter) => {
      document.body
        .querySelectorAll('[data-counter=linkedin]')
        .forEach(function (item) {
          item.innerHTML = counter.count;
        });
    
      script.parentNode.removeChild(script);
    };
  
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let linkedin_share = new LinkedIn().shareWindow();
export let linkedin_counter = new LinkedIn().getCounter();