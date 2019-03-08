/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2019 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js v5.2.0 at 08/03/2019
 *
 *  Useful modern JavaScript solution for share a link from your website
 *  to social networks or mobile messengers. Easy to install and configuring
 *  on any of your website!
 */

/**
 *  Add Array.from() polyfill for IE.
 */

import "./polyfills/array.from";

/**
 *  Import social networks providers with share counter.
 */
import { Vkontakte } from "./providers/Vkontakte";
import { Facebook } from "./providers/Facebook";
import { Odnoklassniki } from "./providers/Odnoklassniki";
import { MoiMir } from "./providers/MoiMir";
import { LinkedIn } from "./providers/LinkedIn";
import { Tumblr } from "./providers/Tumblr";
import { Pinterest } from "./providers/Pinterest";
import { Surfingbird } from "./providers/Surfingbird";
import { Reddit } from "./providers/Reddit";
import { Buffer } from "./providers/Buffer";
import { StumbleUpon } from "./providers/StumbleUpon";
import { Pocket } from "./providers/Pocket";
import { Xing } from "./providers/Xing";

/**
 *  Import social networks providers without share counter.
 */

import { GooglePlus } from "./providers/GooglePlus";
import { Twitter } from "./providers/Twitter";
import { LiveJournal } from "./providers/LiveJournal";
import { Evernote } from "./providers/Evernote";
import { Delicious } from "./providers/Delicious";
import { Blogger } from "./providers/Blogger";
import { Instapaper } from "./providers/Instapaper";
import { Digg } from "./providers/Digg";
import { LiveInternet } from "./providers/LiveInternet";
import { WordPress } from "./providers/WordPress";
import { Baidu } from "./providers/Baidu";
import { RenRen } from "./providers/RenRen";
import { Weibo } from "./providers/Weibo";

/**
 *  Import mobile messengers providers.
 */

import { SMS } from "./providers/SMS";
import { Skype } from "./providers/Skype";
import { Telegram } from "./providers/Telegram";
import { Viber } from "./providers/Viber";
import { WhatsApp } from "./providers/WhatsApp";
import { Line } from "./providers/Line";

const providers = [
  // Import social networks providers with share counter.
  Vkontakte,
  Facebook,
  Odnoklassniki,
  MoiMir,
  LinkedIn,
  Tumblr,
  Pinterest,
  Surfingbird,
  Reddit,
  Buffer,
  StumbleUpon,
  Pocket,
  Xing,
  // Import social networks providers without share counter.
  GooglePlus,
  Twitter,
  LiveJournal,
  Evernote,
  Delicious,
  Blogger,
  Instapaper,
  Digg,
  LiveInternet,
  WordPress,
  Baidu,
  RenRen,
  Weibo,
  // Import mobile messengers providers.
  SMS,
  Skype,
  Telegram,
  Viber,
  WhatsApp,
  Line
];

class Goodshare {
  constructor() {
    this.providers = providers;
    this.getProviders();
  }

  setShareCallback(callback) {
    this.providers = this.providers.map(shareProvider =>
      shareProvider.setShareCallback(callback)
    );
  }

  getProviders() {
    this.providers = this.providers.map(shareProvider =>
      new shareProvider().getInstance()
    );

    return this.providers;
  }

  reNewAllInstance() {
    this.providers = this.providers.map(shareProvider =>
      shareProvider.reNewInstance()
    );
  }
}

(function() {
  window._goodshare = new Goodshare();
})();
