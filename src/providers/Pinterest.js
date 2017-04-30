/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pinterest (https://pinterest.com) provider.
 */

class Pinterest {
  constructor(url = document.location.href,
              description = document.querySelector('meta[name=description]'),
              image = document.querySelector('link[rel=image_src]')) {
    this.url = encodeURIComponent(url);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow() {
    let thisUrl = this.url;
    let thisDescription = this.description;
    let thisImage = this.image;
    let share_elements = document.querySelectorAll('[data-social=pinterest]');
    
    [...share_elements].forEach((item) => {
      item.hasAttribute('data-id') ? item.setAttribute('id', 'pinterest-'+item.getAttribute('data-id')) : null;
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-description') ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          item.hasAttribute('data-image') ? thisImage = encodeURIComponent(item.getAttribute('data-image')) : null;
          let share_url = 'https://www.pinterest.com/pin/create/button/?url=' + thisUrl +
            '&description=' + thisDescription + '&media=' + thisImage;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    window.pinterestUrls = [];
    let count_elements = document.querySelectorAll('[data-counter=pinterest]');

    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;
      let count_url, itemCountUrl;

      [...count_elements].forEach((item) => {
        let id, callback;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          callback = ('pinterest_' + id);
          itemCountUrl = item.parentNode.getAttribute('data-target');
          itemCountUrl !== '' ? thisUrl = encodeURIComponent(itemCountUrl) : null;
        }
        else{
          id = 0;
          callback = ('pinterest_' + Math.random()).replace('.', '');
        }
        script[id] = document.createElement('script');
        count_url = 'https://api.pinterest.com/v1/urls/count.json?callback='+callback+'&url=' + thisUrl;
        window[callback] = (counter) => {
          let count = counter.count > 0 ? counter.count : 0;
          item.innerHTML = count;
          script[id].parentNode.removeChild(script[id]);
        };
        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });
    }
  }
}

export let pinterest_share = new Pinterest().shareWindow();
export let pinterest_counter = new Pinterest().getCounter();