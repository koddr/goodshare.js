/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Evernote (https://evernote.com) provider.
 */

class Evernote {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector("meta[name=description]").content) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
  }
  
  shareWindow() {
    let share_url = 'https://www.evernote.com/clip.action?url=' + this.url +
      '&title=' + this.title + '&body=' + this.description;
    
    document.body
      .querySelectorAll("[data-social=evernote]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
}

export let evernote_share = new Evernote().shareWindow();