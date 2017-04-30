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
              description = document.querySelector('meta[name=description]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=baidu]');
    let thisUrl = this.url;
    let thisTitle = this.title;
    let thisDescription = this.description;

    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          item.hasAttribute('data-description') ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          let share_url = 'https://cang.baidu.com/do/add?iu=' + thisUrl + '&it=' + thisTitle + '&dc=' + thisDescription + '&fr=ien';
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
}

export let baidu_share = new Baidu().shareWindow();