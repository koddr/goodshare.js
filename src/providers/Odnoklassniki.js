/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Odnoklassniki (https://ok.ru) provider.
 */

class Odnoklassniki {
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
    let share_url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + this.url +
      '&st.comments=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=odnoklassniki]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
  
  getCounter() {
    let count_url = 'https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=' + this.url;
    
    fetch(count_url, {method: 'GET', mode: 'cors'})
      .then(this.checkStatus)
      .then((response) => {
        return response.text();
      })
      .then((counter) => {
        document.body
          .querySelectorAll("[data-counter=odnoklassniki]")
          .forEach(function (item) {
            return item.innerHTML = counter.match(/\'(\d+)\'\)\;$/)[1] / 1;
          });
      })
      .catch((error) => {
        console.log('Request failed!', error);
      });
  };
}

export let odnoklassniki_share = new Odnoklassniki().shareWindow();
export let odnoklassniki_counter = new Odnoklassniki().getCounter();