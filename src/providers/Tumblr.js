/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

class Tumblr {
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
    let share_url = 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' + this.url +
      '&title=' + this.title + '&caption=' + this.description + '&posttype=link';
    
    document.body
      .querySelectorAll("[data-social=tumblr]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://api.tumblr.com/v2/share/stats?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=tumblr]")
          .forEach(function (item) {
            return item.innerHTML = counter.response.note_count;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let tumblr_share = new Tumblr().shareWindow();
export let tumblr_counter = new Tumblr().getCounter();