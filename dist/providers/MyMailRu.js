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
 *  My @ Mail.Ru (https://my.mail.ru) provider.
 */

var MyMailRu = function () {
  function MyMailRu() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.head.querySelector("meta[name=description]").content;
    var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.head.querySelector("link[rel=image_src]").href;

    _classCallCheck(this, MyMailRu);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
    this.image = encodeURIComponent(image);
  }

  _createClass(MyMailRu, [{
    key: "shareWindow",
    value: function shareWindow() {
      var share_url = 'http://connect.mail.ru/share?url=' + this.url + '&title=' + this.title + '&description=' + this.description + '&imageurl=' + this.image;

      document.body.querySelectorAll("[data-social=mymailru]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }, {
    key: "getCounter",
    value: function getCounter() {
      var page_url = this.url;
      var count_url = 'https://connect.mail.ru/share_count?url_list=' + page_url;

      fetch(count_url, { method: 'GET', mode: 'cors' }).then(this.checkStatus).then(function (response) {
        return response.json();
      }).then(function (counter) {
        document.body.querySelectorAll("[data-counter=mymailru]").forEach(function (item) {
          for (page_url in counter) {
            if (counter.hasOwnProperty(page_url)) {
              return item.innerHTML = counter[page_url].shares;
            }
          }
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

  return MyMailRu;
}();

var mymailru_share = exports.mymailru_share = new MyMailRu().shareWindow();
var mymailru_counter = exports.mymailru_counter = new MyMailRu().getCounter();