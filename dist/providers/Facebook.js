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
 *  Facebook (https://facebook.com) provider.
 */

var Facebook = function () {
  function Facebook() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;

    _classCallCheck(this, Facebook);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }

  _createClass(Facebook, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://facebook.com/sharer/sharer.php?u=' + this.url + '&t=' + this.title;

      document.body.querySelectorAll("[data-social=facebook]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var count_url = 'https://graph.facebook.com/?id=' + this.url;

      fetch(count_url, { method: 'get', mode: 'cors' }).then(this.checkStatus).then(function (response) {
        return response.text();
      }).then(function (counter) {
        document.body.querySelectorAll("[data-counter=facebook]").forEach(function (item) {
          if (counter.share) {
            return item.innerHTML = counter.share.share_count;
          } else {
            return item.innerHTML = 0;
          }
        });
      }).catch(function (error) {
        console.log('Request failed!', error);
      });
    }
  }], [{
    key: 'checkStatus',
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

  return Facebook;
}();

var facebook_share = exports.facebook_share = new Facebook().shareWindow();
var facebook_counter = exports.facebook_counter = new Facebook().getCounter();