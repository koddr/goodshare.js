/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Odnoklassniki (https://ok.ru) provider.
 */

class Odnoklassniki {
  constructor(url = document.location.href, title = document.title) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow() {
    let share_elements = document.querySelectorAll('[data-social=odnoklassniki]');
    let thisUrl = this.url;
    let thisTitle = this.title;

    [...share_elements].forEach((item) => {
      item.hasAttribute('data-id') ? item.setAttribute('id', 'odnoklassniki-'+item.getAttribute('data-id')) : null;
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          item.hasAttribute('data-target') ? thisUrl = encodeURIComponent(item.getAttribute('data-target')) : null;
          item.hasAttribute('data-title') ? thisTitle = encodeURIComponent(item.getAttribute('data-title')) : null;
          let share_url = 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + thisUrl +
            '&st.comments=' + thisTitle;
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter() {
    let count_elements = document.querySelectorAll('[data-counter=odnoklassniki]');
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
        let count_url = 'https://connect.ok.ru/dk?st.cmd=extLike&uid='+id+'&ref=' + thisUrl;

        script[id].src = count_url;
        document.body.appendChild(script[id]);
      });

      window.ODKL = {};
      window.ODKL.updateCount = function (elementId, counter) {
        let count = counter ? counter : 0;
        if(document.getElementById('odnoklassniki-'+elementId)){
          document.querySelector('#odnoklassniki-'+elementId+' span').innerHTML = count;
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

export let odnoklassniki_share = new Odnoklassniki().shareWindow();
export let odnoklassniki_counter = new Odnoklassniki().getCounter();