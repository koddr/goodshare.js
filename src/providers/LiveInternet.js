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
    let share_url = 'http://www.liveinternet.ru/journal_post.php?action=n_add&cnurl=' + this.url +
      '&cntitle=' + this.title;
    
    document.body
      .querySelectorAll("[data-social=liveinternet]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
}

export let liveinternet_share = new LiveInternet().shareWindow();