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
 *  Readability (https://readability.com) provider.
 */

var Readability = function () {
  function Readability() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;

    _classCallCheck(this, Readability);

    this.url = encodeURIComponent(url);
  }

  _createClass(Readability, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'http://www.readability.com/save?url=' + this.url;

      document.body.querySelectorAll("[data-social=readability]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }]);

  return Readability;
}();

var readability_share = exports.readability_share = new Readability().shareWindow();