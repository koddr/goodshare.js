/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Baidu (https://baidu.com) provider.
 */

class Baidu {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector("meta[name=description]").content) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
  }
  
  shareWindow() {
    let share_url = 'https://cang.baidu.com/do/add?iu=' + this.url +
      '&it=' + this.title + '&dc=' + this.description + '&fr=ien';
    
    document.body
      .querySelectorAll("[data-social=baidu]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
}

export let baidu_share = new Baidu().shareWindow();