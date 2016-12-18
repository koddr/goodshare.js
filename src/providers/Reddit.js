/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Reddit (https://reddit.com) provider.
 */

class Reddit {
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
    let share_url = 'https://reddit.com/submit?url=' + this.url + '&title=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=reddit]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://reddit.com/api/info.json?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=reddit]")
          .forEach(function (item) {
            if (counter.data.children.length > 0) {
              let total_count = 0;
              
              for (let i = 0; i < counter.data.children.length; i++) {
                total_count += counter.data.children[i].data.score;
              }
              
              return item.innerHTML = total_count;
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

export let reddit_share = new Reddit().shareWindow();
export let reddit_counter = new Reddit().getCounter();