/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js v4.2.0 at 21/02/2018
 *
 *  Useful modern JavaScript solution for share a link from your website
 *  to social networks or mobile messengers. Easy to install and configuring
 *  on any of your website!
 */

/**
 *  Add Array.from() polyfill for IE.
 */

import './polyfills/array.from';

/**
 *  Import social networks providers with share counter.
 */

import { Vkontakte } from './providers/Vkontakte';
import { Facebook } from './providers/Facebook';
import { Odnoklassniki } from './providers/Odnoklassniki';
import { MoiMir } from './providers/MoiMir';
import { LinkedIn } from './providers/LinkedIn';
import { Tumblr } from './providers/Tumblr';
import { Pinterest } from './providers/Pinterest';
import { Surfingbird } from './providers/Surfingbird';
import { Reddit } from './providers/Reddit';
import { Buffer } from './providers/Buffer';
import { StumbleUpon } from './providers/StumbleUpon';
import { Pocket } from './providers/Pocket';
import { Xing } from './providers/Xing';

/**
 *  Import social networks providers without share counter.
 */

import { googleplus_share } from './providers/GooglePlus';
import { twitter_share } from './providers/Twitter';
import { livejournal_share } from './providers/LiveJournal';
import { evernote_share } from './providers/Evernote';
import { delicious_share } from './providers/Delicious';
import { blogger_share } from './providers/Blogger';
import { instapaper_share } from './providers/Instapaper';
import { digg_share } from './providers/Digg';
import { liveinternet_share } from './providers/LiveInternet';
import { wordpress_share } from './providers/WordPress';
import { baidu_share } from './providers/Baidu';
import { renren_share } from './providers/RenRen';
import { weibo_share } from './providers/Weibo';

/**
 *  Import mobile messengers providers.
 */

import { sms_share } from './providers/SMS';
import { skype_share } from './providers/Skype';
import { telegram_share } from './providers/Telegram';
import { viber_share } from './providers/Viber';
import { whatsapp_share } from './providers/WhatsApp';
import { line_share } from './providers/Line';
import { EventWithNamespace } from './utils';

const initShare = () => {
  const providers = [
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
  ];
  
  providers.forEach(provider => provider.getInstance())
};

(function() {
  initShare();
})();
