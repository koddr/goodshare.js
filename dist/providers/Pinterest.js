'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Pinterest (https://pinterest.com) provider.
 */

var Pinterest = function () {
  function Pinterest() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.head.querySelector('meta[name=description]').content;
    var image = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.head.querySelector('link[rel=image_src]').href;

    _classCallCheck(this, Pinterest);

    this.url = encodeURIComponent(url);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
  }

  _createClass(Pinterest, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://www.pinterest.com/pin/create/button/?url=' + this.url + '&description=' + this.description + '&media=' + this.image;

      document.body.querySelectorAll('[data-social=pinterest]').forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var script = document.createElement('script');
      var count_url = 'https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=' + this.url;

      window['receiveCount'] = function (counter) {
        document.body.querySelectorAll('[data-counter=pinterest]').forEach(function (item) {
          item.innerHTML = counter.count;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }]);

  return Pinterest;
}();

var pinterest_share = exports.pinterest_share = new Pinterest().shareWindow();
var pinterest_counter = exports.pinterest_counter = new Pinterest().getCounter();