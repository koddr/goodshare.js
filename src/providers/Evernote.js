/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Evernote (https://evernote.com) provider.
 */

class Evernote {
  constructor (url = document.location.href, title = document.title,
               description = document.querySelector('meta[name="description"]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="evernote"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const description = item.dataset.description ? encodeURIComponent(item.dataset.description) : this.description;
      const share_url = `https://www.evernote.com/clip.action?url=${url}&title=${title}&body=${description}`;
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
}

export const evernote_share = new Evernote().shareWindow();
