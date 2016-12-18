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
 *  Reddit (https://reddit.com) provider.
 */

var Reddit = function () {
  function Reddit() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;

    _classCallCheck(this, Reddit);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }

  _createClass(Reddit, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://reddit.com/submit?url=' + this.url + '&title=' + this.title;

      document.body.querySelectorAll("[data-social=reddit]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var count_url = 'https://reddit.com/api/info.json?url=' + this.url;

      fetch(count_url, { method: 'GET', mode: 'cors' }).then(this.checkStatus).then(function (response) {
        return response.json();
      }).then(function (counter) {
        document.body.querySelectorAll("[data-counter=reddit]").forEach(function (item) {
          if (counter.data.children.length > 0) {
            var total_count = 0;

            for (var i = 0; i < counter.data.children.length; i++) {
              total_count += counter.data.children[i].data.score;
            }

            return item.innerHTML = total_count;
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

  return Reddit;
}();

var reddit_share = exports.reddit_share = new Reddit().shareWindow();
var reddit_counter = exports.reddit_counter = new Reddit().getCounter();