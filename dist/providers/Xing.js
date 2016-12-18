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
 *  Xing (https://xing.com) provider.
 */

var Xing = function () {
  function Xing() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;

    _classCallCheck(this, Xing);

    this.url = encodeURIComponent(url);
  }

  _createClass(Xing, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://www.xing.com/spi/shares/new?url=' + this.url;

      document.body.querySelectorAll("[data-social=xing]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var count_url = 'https://www.xing-share.com/app/share?op=get_share_button;counter=top;url=' + this.url;

      fetch(count_url, { method: 'GET', mode: 'cors' }).then(this.checkStatus).then(function (response) {
        return response.text();
      }).then(function (counter) {
        document.body.querySelectorAll("[data-counter=xing]").forEach(function (item) {
          return item.innerHTML = counter.match(/span class="xing-count top">(\d+)</)[1] / 1;
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

  return Xing;
}();

var xing_share = exports.xing_share = new Xing().shareWindow();
var xing_counter = exports.xing_counter = new Xing().getCounter();