/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

class Vkontakte {
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
    let share_url = 'https://vk.com/share.php?url=' + this.url +
      '&title=' + this.title + '&description=' + this.description +
      '&image=' + this.image;
    
    document.body
      .querySelectorAll("[data-social=vkontakte]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://vk.com/share.php?act=count&index=1&url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=vkontakte]")
          .forEach(function (item) {
            return item.innerHTML = counter.match(/^VK\.Share\.count\(\d, (\d+)\);$/)[1] / 1;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let vkontakte_share = new Vkontakte().shareWindow();
export let vkontakte_counter = new Vkontakte().getCounter();