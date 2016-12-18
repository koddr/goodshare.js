/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pinterest (https://pinterest.com) provider.
 */

class Pinterest {
  constructor(url = document.location.href,
              description = document.head.querySelector("meta[name=description]").content,
              image = document.head.querySelector("link[rel=image_src]").href) {
    this.url = encodeURIComponent(url);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
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
    let share_url = 'https://www.pinterest.com/pin/create/button/?url=' + this.url +
      '&description=' + this.description + '&media=' + this.image;
    
    document.body
      .querySelectorAll("[data-social=pinterest]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'http://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=' + this.url;
    
    fetch(count_url, {method: 'get', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=pinterest]")
          .forEach(function (item) {
            return item.innerHTML = JSON.parse(counter.match(/receiveCount\((.*?)\)$/)[1]).count || 0;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let pinterest_share = new Pinterest().shareWindow();
export let pinterest_counter = new Pinterest().getCounter();