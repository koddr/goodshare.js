/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LiveInternet (http://liveinternet.ru) provider.
 */

class LiveInternet {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=liveinternet]');
    let share_url = 'http://www.liveinternet.ru/journal_post.php?action=n_add&cnurl=' + this.url +
      '&cntitle=' + this.title;
  
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
}

export let liveinternet_share = new LiveInternet().shareWindow();