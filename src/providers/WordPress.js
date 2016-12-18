/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  WordPress (https://wordpress.com) provider.
 */

class WordPress {
  constructor(url = document.location.href,
              title = document.title,
              description = document.head.querySelector("meta[name=description]").content,
              image = document.head.querySelector("link[rel=image_src]").href) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
  }
  
  shareWindow() {
    let share_url = 'https://wordpress.com/wp-admin/press-this.php?u=' + this.url +
      '&t=' + this.title + '&s=' + this.description + '&i=' + this.image + '&v=2';
    
    document.body
      .querySelectorAll("[data-social=wordpress]")
      .forEach(function (item) {
        item
          .addEventListener('click', function (event) {
            event.preventDefault();
            return window.open(share_url, 'Share window', 'width=400, height=400');
          });
      });
  }
}

export let wordpress_share = new WordPress().shareWindow();