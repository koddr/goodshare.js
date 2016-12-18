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
    let share_url = 'https://stumbleupon.com/submit?url=' + this.url + '&title=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=stumbleupon]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://stumbleupon.com/services/1.01/badge.getinfo?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=stumbleupon]")
          .forEach(function (item) {
            if (counter.result.views) {
              return item.innerHTML = counter.result.views;
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

export let stumbleupon_share = new StumbleUpon().shareWindow();
export let stumbleupon_counter = new StumbleUpon().getCounter();