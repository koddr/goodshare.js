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
              description = document.head.querySelector("meta[name=description]").content) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
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
    let share_url = 'https://surfingbird.ru/share?url=' + this.url + '&title=' + this.title +
      '&description=' + this.description;
    
    document.body
      .querySelectorAll("[data-social=surfingbird]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://surfingbird.ru/button?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=surfingbird]")
          .forEach(function (item) {
            return item.innerHTML = counter.match(/span class="stats-num">(\d+)</)[1] / 1;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let surfingbird_share = new Surfingbird().shareWindow();
export let surfingbird_counter = new Surfingbird().getCounter();