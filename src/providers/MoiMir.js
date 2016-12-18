/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  My@Mail.Ru (https://my.mail.ru) provider.
 */

class MoiMir {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector("meta[name=description]").content,
              image = document.head.querySelector("link[rel=image_src]").href) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
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
    let share_url = 'http://connect.mail.ru/share?url=' + this.url +
      '&title=' + this.title + '&description=' + this.description +
      '&imageurl=' + this.image;
    
    document.body
      .querySelectorAll("[data-social=moimir]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let page_url = this.url;
    let count_url = 'https://connect.mail.ru/share_count?url_list=' + page_url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=moimir]")
          .forEach(function (item) {
            for (page_url in counter) {
              if (counter.hasOwnProperty(page_url)) {
                return item.innerHTML = counter[page_url].shares;
              }
            }
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let moimir_share = new MoiMir().shareWindow();
export let moimir_counter = new MoiMir().getCounter();