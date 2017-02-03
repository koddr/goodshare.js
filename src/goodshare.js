/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2017 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js v4.0.6 at 03/02/2017 (20:00)
 *
 *  Useful modern JavaScript solution that will help your website visitors share a
 *  link on social networks and microblogs. Easy to install and configuring on
 *  any of your website!
 */

/**
 *  Import social networks providers with share counter.
 */

import { vkontakte_share, vkontakte_counter } from './providers/Vkontakte';
import { facebook_share, facebook_counter } from './providers/Facebook';
import { odnoklassniki_share, odnoklassniki_counter } from './providers/Odnoklassniki';
import { moimir_share, moimir_counter } from './providers/MoiMir';
import { googleplus_share, googleplus_counter } from './providers/GooglePlus';
import { linkedin_share, linkedin_counter } from './providers/LinkedIn';
import { tumblr_share, tumblr_counter } from './providers/Tumblr';
import { pinterest_share, pinterest_counter } from './providers/Pinterest';
import { surfingbird_share, surfingbird_counter } from './providers/Surfingbird';
import { reddit_share, reddit_counter } from './providers/Reddit';
import { buffer_share, buffer_counter } from './providers/Buffer';
import { stumbleupon_share, stumbleupon_counter } from './providers/StumbleUpon';
import { pocket_share, pocket_counter } from './providers/Pocket';
import { xing_share, xing_counter } from './providers/Xing';

/**
 *  Import social networks providers without share counter.
 */

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

import { telegram_share } from './providers/Telegram';
import { viber_share } from './providers/Viber';
import { whatsapp_share } from './providers/WhatsApp';
import { line_share } from './providers/Line';
