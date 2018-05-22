/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Tumblr (https://tumblr.com) provider.
 */

import { EventWithNamespace, getUniqId } from '../utils';

export class Tumblr {
  constructor (url = document.location.href, title = document.title,
               description = document.querySelector('meta[name="description"]')) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.events = new EventWithNamespace();
    this.instanceId = getUniqId('tumblr');
  }

  static getInstance () {
    const _instance = new Tumblr();

    _instance.shareWindow();
    _instance.getCounter();

    return _instance;
  }

  reNewInstance () {
    this.events.removeAll();
    Tumblr.getInstance();
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="tumblr"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const description = item.dataset.description ? encodeURIComponent(item.dataset.description) : this.description;
      const share_url = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${title}&caption=${description}&posttype=link`;
      
      this.events.addEventListener(item, `click.${this.instanceId}`, function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const callback = ('goodshare_' + Math.random()).replace('.', '');
    const count_elements = document.querySelectorAll('[data-counter="tumblr"]');
    const count_url = `https://api.tumblr.com/v2/share/stats?url=${this.url}&callback=${callback}`;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = counter.response.note_count;
        });
        
        if (script.parentNode === null) {
          return;
        }
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
