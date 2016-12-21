/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

class Vkontakte {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector('meta[name=description]').content,
              image = document.head.querySelector('link[rel=image_src]').href) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
  }
  
  shareWindow() {
    let share_url = 'https://vk.com/share.php?url=' + this.url +
      '&title=' + this.title + '&description=' + this.description +
      '&image=' + this.image;
    
    document.body
      .querySelectorAll('[data-social=vkontakte]')
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
          });
      });
  }
  
  getCounter() {
    window.VK = {Share: {}};
    
    let script = document.createElement('script');
    let count_url = 'https://vk.com/share.php?act=count&index=1&url=' + this.url;
    
    window.VK.Share.count = (counter) => {
      document.body
        .querySelectorAll('[data-counter=vkontakte]')
        .forEach(function (item) {
          item.innerHTML = counter;
        });
      
      script.parentNode.removeChild(script);
    };
    
    script.src = count_url;
    document.body.appendChild(script);
  }
}

export let vkontakte_share = new Vkontakte().shareWindow();
export let vkontakte_counter = new Vkontakte().getCounter();