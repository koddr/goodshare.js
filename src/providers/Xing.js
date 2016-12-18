/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Xing (https://xing.com) provider.
 */

class Xing {
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
    let share_url = 'https://www.xing.com/spi/shares/new?url=' + this.url;
    
    document.body
      .querySelectorAll("[data-social=xing]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://www.xing-share.com/app/share?op=get_share_button;counter=top;url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=xing]")
          .forEach(function (item) {
            return item.innerHTML = counter.match(/span class="xing-count top">(\d+)</)[1] / 1;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let xing_share = new Xing().shareWindow();
export let xing_counter = new Xing().getCounter();