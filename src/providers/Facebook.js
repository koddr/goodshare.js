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
  
  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  
  shareWindow() {
    let share_url = 'https://facebook.com/sharer/sharer.php?u=' + this.url + '&t=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=facebook]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://graph.facebook.com/?id=' + this.url;
    
    fetch(count_url, {method: 'get', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=facebook]")
          .forEach(function (item) {
            if (counter.share) {
              return item.innerHTML = counter.share.share_count;
            }
            else {
              return item.innerHTML = 0;
            }
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let facebook_share = new Facebook().shareWindow();
export let facebook_counter = new Facebook().getCounter();