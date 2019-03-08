/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2019 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js v5.1.2 at 01/03/2019
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
import { Facebook } from "./providers/Facebook";
import { LinkedIn } from "./providers/LinkedIn";
import { Tumblr } from "./providers/Tumblr";
import { Pinterest } from "./providers/Pinterest";
import { Reddit } from "./providers/Reddit";
import { Pocket } from "./providers/Pocket";

/**
 *  Import social networks providers without share counter.
 */

import { Twitter } from "./providers/Twitter";
import { Evernote } from "./providers/Evernote";
import { Instapaper } from "./providers/Instapaper";

/**
 *  Import mobile messengers providers.
 */

import { SMS } from "./providers/SMS";
import { Skype } from "./providers/Skype";
import { Telegram } from "./providers/Telegram";
import { WhatsApp } from "./providers/WhatsApp";

const providers = [
  // Import social networks providers with share counter.
  Facebook,
  LinkedIn,
  Tumblr,
  Pinterest,
  Reddit,
  Pocket,
  // Import social networks providers without share counter.
  Twitter,
  Evernote,
  Instapaper,
  // Import mobile messengers providers.
  SMS,
  Skype,
  Telegram,
  WhatsApp,
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
