/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Viber (https://viber.com) provider.
 */

class Viber {
  constructor(url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=viber]');
    let share_url = 'viber://forward?text=' + this.url;
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
}

export let viber_share = new Viber().shareWindow();