/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LiveJournal (https://livejournal.com) provider.
 */

class LiveJournal {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=livejournal]');
    let share_url = 'http://livejournal.com/update.bml?event=' + this.url + '&subject=' + this.title;
  
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
}

export let livejournal_share = new LiveJournal().shareWindow();