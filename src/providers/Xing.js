/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Xing (https://xing.com) provider.
 */

import {EventWithNamespace, getUniqId} from '../utils';

export class Xing {
  constructor (url = document.location.href) {
    this.url = encodeURIComponent(url);
    this.events = new EventWithNamespace();
    this.instanceId = getUniqId('pocket');
  }
  
  static getInstance () {
    const _instance = new Xing();
    
    _instance.shareWindow();
    _instance.getCounter();
    
    return _instance;
  }
  
  reNewInstance () {
    this.events.removeAll();
    Xing.getInstance();
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="xing"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const share_url = `https://www.xing.com/spi/shares/new?url=${url}`;
  
      this.events.addEventListener(item, 'click.' + this.instanceId, function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const callback = ('goodshare_' + Math.random()).replace('.', '');
    const count_elements = document.querySelectorAll('[data-counter="xing"]');
    const count_url = 'https://query.yahooapis.com/v1/public/yql?q='
      + encodeURIComponent('select * from html where url="https://www.xing-share.com/app/share?op=get_share_button;counter=top;url='
        + this.url + '" and xpath="*"') + '&callback=' + callback;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach(function (item) {
          item.innerHTML = (counter.results.length > 0)
            ? (counter.results[0]).match(/span class="xing-count top">(\d+)</)[1] / 1
            : 0;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
