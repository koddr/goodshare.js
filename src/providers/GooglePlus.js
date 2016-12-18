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
    let share_url = 'https://plus.google.com/share?url=' + this.url;
    
    document.body
      .querySelectorAll("[data-social=googleplus]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://plusone.google.com/_/+1/fastbutton?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=googleplus]")
          .forEach(function (item) {
            return item.innerHTML = counter
                .match(/script type="text\/javascript">window.__SSR = \{c: (\d+).0/)[1] / 1;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let googleplus_share = new GooglePlus().shareWindow();
export let googleplus_counter = new GooglePlus().getCounter();