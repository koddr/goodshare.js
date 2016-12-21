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
 *  Odnoklassniki (https://ok.ru) provider.
 */

var Odnoklassniki = function () {
  function Odnoklassniki() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;

    _classCallCheck(this, Odnoklassniki);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }

  _createClass(Odnoklassniki, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + this.url + '&st.comments=' + this.title;

      document.body.querySelectorAll('[data-social=odnoklassniki]').forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      window.ODKL = {};

      var script = document.createElement('script');
      var count_url = 'https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=' + this.url;

      window.ODKL.updateCount = function (counter) {
        document.body.querySelectorAll('[data-counter=odnoklassniki]').forEach(function (item) {
          item.innerHTML = counter;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }]);

  return Odnoklassniki;
}();

var odnoklassniki_share = exports.odnoklassniki_share = new Odnoklassniki().shareWindow();
var odnoklassniki_counter = exports.odnoklassniki_counter = new Odnoklassniki().getCounter();