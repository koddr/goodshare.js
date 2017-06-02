'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  WordPress (https://wordpress.com) provider.
 */

var WordPress = function () {
  function WordPress() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.querySelector('meta[name=description]');
    var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.querySelector('link[rel=image_src]');

    _classCallCheck(this, WordPress);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = description ? encodeURIComponent(description.content) : '';
    this.image = image ? encodeURIComponent(image.href) : '';
  }

  _createClass(WordPress, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_elements = document.querySelectorAll('[data-social=wordpress]');
      var share_url = 'https://wordpress.com/wp-admin/press-this.php?u=' + this.url + '&t=' + this.title + '&s=' + this.description + '&i=' + this.image + '&v=2';

      [].concat(_toConsumableArray(share_elements)).forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }]);

  return WordPress;
}();

var wordpress_share = exports.wordpress_share = new WordPress().shareWindow();