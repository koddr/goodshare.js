/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pocket (https://getpocket.com) provider.
 */

class Pocket {
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
    let share_url = 'https://getpocket.com/save?url=' + this.url + '&title=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=pocket]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&align=left&v=1&url=' +
      this.url + "&src=" + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=pocket]")
          .forEach(function (item) {
            return item.innerHTML = counter.match(/em id="cnt">(\d+)</)[1] / 1;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let pocket_share = new Pocket().shareWindow();
export let pocket_counter = new Pocket().getCounter();