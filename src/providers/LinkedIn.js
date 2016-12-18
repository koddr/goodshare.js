/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LinkedIn (https://linkedin.com) provider.
 */

class LinkedIn {
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
    let share_url = 'http://www.linkedin.com/shareArticle?url=' + this.url +
      '&text=' + this.title + '&summary=' + this.description + '&mini=true';
    
    document.body
      .querySelectorAll("[data-social=linkedin]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://www.linkedin.com/countserv/count/share?url=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=linkedin]")
          .forEach(function (item) {
            return item.innerHTML = counter.count;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let linkedin_share = new LinkedIn().shareWindow();
export let linkedin_counter = new LinkedIn().getCounter();