/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  LINE (https://line.me) provider.
 */

class Line {
  constructor(url = document.location.href) {
    this.url = encodeURIComponent(url);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=line]');
    let share_url = 'line://msg/text/' + this.url;
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
}

export let line_share = new Line().shareWindow();