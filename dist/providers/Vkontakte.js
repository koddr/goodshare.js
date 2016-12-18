"use strict";

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
 *  Vkontakte (https://vk.com) provider.
 */

var Vkontakte = function () {
  function Vkontakte() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.head.querySelector("meta[name=description]").content;
    var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.head.querySelector("link[rel=image_src]").href;

    _classCallCheck(this, Vkontakte);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
  }

  _createClass(Vkontakte, [{
    key: "shareWindow",
    value: function shareWindow() {
      var share_url = 'https://vk.com/share.php?url=' + this.url + '&title=' + this.title + '&description=' + this.description + '&image=' + this.image;

      document.body.querySelectorAll("[data-social=vkontakte]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }, {
    key: "getCounter",
    value: function getCounter() {
      var count_url = 'https://vk.com/share.php?act=count&index=1&url=' + this.url;

      fetch(count_url, { method: 'GET', mode: 'cors' }).then(this.checkStatus).then(function (response) {
        return response.text();
      }).then(function (counter) {
        document.body.querySelectorAll("[data-counter=vkontakte]").forEach(function (item) {
          return item.innerHTML = counter.match(/^VK\.Share\.count\(\d, (\d+)\);$/)[1] / 1;
        });
      }).catch(function (error) {
        console.log('Request failed!', error);
      });
    }
  }], [{
    key: "checkStatus",
    value: function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  }]);

  return Vkontakte;
}();

var vkontakte_share = exports.vkontakte_share = new Vkontakte().shareWindow();
var vkontakte_counter = exports.vkontakte_counter = new Vkontakte().getCounter();