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
    let share_url = 'https://buffer.com/add?url=' + this.url + '&text=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=buffer]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://api.bufferapp.com/1/links/shares.json?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=buffer]")
          .forEach(function (item) {
            if (counter.shares) {
              return item.innerHTML = counter.shares;
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

export let buffer_share = new Buffer().shareWindow();
export let buffer_counter = new Buffer().getCounter();