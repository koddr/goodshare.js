/**
 *  Vic Shóstak <truewebartisans@gmail.com>
 *  Copyright (c) 2020 True web artisans https://1wa.co
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js v6.1.4 at 04/01/2020
 *
 *  Useful modern JavaScript solution for share a link from your website
 *  to social networks or mobile messengers. Easy to install and configuring
 *  on any of your website!
 */

/**
 *  Import social networks providers with share counter.
 */

import { Vkontakte } from "./providers/Vkontakte";
import { Facebook } from "./providers/Facebook";
import { Odnoklassniki } from "./providers/Odnoklassniki";
import { MoiMir } from "./providers/MoiMir";
import { Tumblr } from "./providers/Tumblr";
import { Pinterest } from "./providers/Pinterest";
import { Reddit } from "./providers/Reddit";
import { Buffer } from "./providers/Buffer";

/**
 *  Import social networks providers without share counter.
 */

import { Twitter } from "./providers/Twitter";
import { LiveJournal } from "./providers/LiveJournal";
import { LinkedIn } from "./providers/LinkedIn";
import { Evernote } from "./providers/Evernote";
import { Delicious } from "./providers/Delicious";
import { Flipboard } from "./providers/Flipboard";
import { Mix } from "./providers/Mix";
import { Meneame } from "./providers/Meneame";
import { Blogger } from "./providers/Blogger";
import { Pocket } from "./providers/Pocket";
import { Instapaper } from "./providers/Instapaper";
import { Digg } from "./providers/Digg";
import { LiveInternet } from "./providers/LiveInternet";
import { Surfingbird } from "./providers/Surfingbird";
import { Xing } from "./providers/Xing";
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
import { WeChat } from "./providers/WeChat";
import { Line } from "./providers/Line";

/**
 * Imports others providers
 */

import { CopyToClipboard } from "./providers/CopyToClipboard"

/**
 *  Create providers list.
 */

const providers = [
  // Import social networks providers with share counter.
  Vkontakte,
  Facebook,
  Odnoklassniki,
  MoiMir,
  LinkedIn,
  Tumblr,
  Pinterest,
  Reddit,
  Buffer,
  // Import social networks providers without share counter.
  Twitter,
  LiveJournal,
  Evernote,
  Delicious,
  Flipboard,
  Pocket,
  Mix,
  Meneame,
  Blogger,
  Instapaper,
  Digg,
  LiveInternet,
  Surfingbird,
  Xing,
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
  WeChat,
  Line,
  // Imports other provides
  CopyToClipboard
];

/**
 *  Init goodshare.js class.
 */

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

/**
 *  Create goodshare.js object.
 */

(function() {
  window._goodshare = new Goodshare();
})();
