/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2017 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Digg (https://digg.com) provider.
 */

class Digg {
    constructor(url = document.location.href, title = document.title) {
        this.url = encodeURIComponent(url);
        this.title = encodeURIComponent(title);
    }
    
    shareWindow() {
        const share_elements = document.querySelectorAll('[data-social=digg]');
        
        [...share_elements].forEach((item) => {
            const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
            const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
            const share_url = 'http://digg.com/submit?url=' + url + '&title=' + title;
            
            item.addEventListener('click', function (event) {
                event.preventDefault();
                return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
            });
        });
    }
}

export const digg_share = new Digg().shareWindow();