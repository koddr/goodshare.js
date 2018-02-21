/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Odnoklassniki (https://ok.ru) provider.
 */

class Odnoklassniki {
  constructor (url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="odnoklassniki"]');
    
    [...share_elements].forEach((item) => {
      const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
      const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
      const share_url = `https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=${url}&st.comments=${title}`;
      
      item.addEventListener('click', function (event) {
        event.preventDefault();
        return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
      });
    });
  }
  
  getCounter () {
    const script = document.createElement('script');
    const count_elements = document.querySelectorAll('[data-counter="odnoklassniki"]');
    const count_url = `https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=${this.url}`;
    
    window.ODKL = {};
    
    if (count_elements.length > 0) {
      window.ODKL.updateCount = (_, counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = counter;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}

export const odnoklassniki_share = new Odnoklassniki().shareWindow();
export const odnoklassniki_counter = new Odnoklassniki().getCounter();
