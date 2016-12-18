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
 *  Google Plus (https://plus.google.com) provider.
 */

var GooglePlus = function () {
  function GooglePlus() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;

    _classCallCheck(this, GooglePlus);

    this.url = encodeURIComponent(url);
  }

  _createClass(GooglePlus, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://plus.google.com/share?url=' + this.url;

      document.body.querySelectorAll("[data-social=googleplus]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var count_url = 'https://plusone.google.com/_/+1/fastbutton?url=' + this.url;

      fetch(count_url, { method: 'GET', mode: 'cors' }).then(this.checkStatus).then(function (response) {
        return response.text();
      }).then(function (counter) {
        document.body.querySelectorAll("[data-counter=googleplus]").forEach(function (item) {
          return item.innerHTML = counter.match(/script type="text\/javascript">window.__SSR = \{c: (\d+).0/)[1] / 1;
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

  return GooglePlus;
}();

var googleplus_share = exports.googleplus_share = new GooglePlus().shareWindow();
var googleplus_counter = exports.googleplus_counter = new GooglePlus().getCounter();