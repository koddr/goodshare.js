/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  My@Mail.Ru (https://my.mail.ru) provider.
 */

class MoiMir {
  constructor(url = document.location.href,
              title = document.title,
              description = document.querySelector('meta[name=description]'),
              image = document.querySelector('link[rel=image_src]')) {
    this.url = url;
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow() {
    let thisUrl = this.url;
    let thisTitle = this.title;
    let thisDescription = this.description;
    let thisImage = this.image;
    let share_elements = document.querySelectorAll('[data-social=moimir]');
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = item.getAttribute('data-target') : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          item.hasAttribute('data-description') ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          item.hasAttribute('data-image') ? thisImage = encodeURIComponent(item.getAttribute('data-image')) : null;
          let share_url = 'http://connect.mail.ru/share?url=' + encodeURIComponent(thisUrl) +
            '&title=' + thisTitle + '&description=' + thisDescription +
            '&imageurl=' + thisImage;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=moimir]');

    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = encodeURIComponent((this.url).replace(/^.*?:\/\//, ''));
      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('mail_' + id);
          thisUrl = encodeURIComponent(item.parentNode.getAttribute('data-target').replace(/^.*?:\/\//, ''));
        }
        else{
          id = 0;
          callback = ('mail_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        let count_url = 'https://appsmail.ru/share/count/' + thisUrl + '?callback=' + callback;
        window[callback] = (counter) => {
          let count = counter.share_mm ? counter.share_mm : 0;
          item.innerHTML = count;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let moimir_share = new MoiMir().shareWindow();
export let moimir_counter = new MoiMir().getCounter();