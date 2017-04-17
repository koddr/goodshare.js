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
              description = document.querySelector('meta[name=description]'),
              image = document.querySelector('link[rel=image_src]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
  }
  
  shareWindow() {
    var thisUrl = this.url;
    var thisTitle = this.title;
    var thisDescription = this.description;
    var thisImage = this.image;
    let share_elements = document.querySelectorAll('[data-social=vkontakte]');
    
    [...share_elements].forEach((item) => {
      item.hasAttribute('data-id') ? item.setAttribute('id', 'vkontakte-'+item.getAttribute('data-id')) : null;
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          item.hasAttribute('data-description')
            ? thisDescription = encodeURIComponent(item.getAttribute('data-description')) : null;
          item.hasAttribute('data-image') ? thisImage = encodeURIComponent(item.getAttribute('data-image')) : null;
          let share_url = 'https://vk.com/share.php?url=' + thisUrl +
            '&title=' + thisTitle + '&description=' + thisDescription +
            '&image=' + thisImage;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {

    let count_elements = document.querySelectorAll('[data-counter=vkontakte]');
    if (count_elements.length > 0) {
      let script = [];
      let thisUrl = this.url;

      [...count_elements].forEach((item) => {
        let id = 0;
        if (item.hasAttribute('data-id')) {
          id = item.getAttribute('data-id');
          thisUrl = encodeURIComponent(item.parentNode.getAttribute('data-target'));
        }
        script[id] = document.createElement('script');
        let count_url = 'https://vk.com/share.php?act=count&index='+id+'&url=' + thisUrl;

        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });

      window.VK = {Share: {}};
      window.VK.Share.count = function (elementId, counter) {
        let count = counter ? counter : 0;
        if(document.getElementById('vkontakte-'+elementId)){
          document.querySelector('#vkontakte-'+elementId+' span').innerHTML = count;
        }
        else{
          [...count_elements].forEach((item) => {
            item.innerHTML = count;
          });
        }
        script[elementId].parentNode.removeChild(script[elementId]);
      };
    }
  }
}

export let vkontakte_share = new Vkontakte().shareWindow();
export let vkontakte_counter = new Vkontakte().getCounter();