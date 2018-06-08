/**
 *  Ilya Reshetnikov
 *  Copyright (c) 2018 Ilya Reshetnikov https://github.com/devxom
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  ProviderMixin for goodshare.js
 */

import { EventWrapper } from './EventWrapper';

// Generate unique ID
const getUniqueId = (prefix = 'id') =>
  `${prefix}-${Math.random().toString(36).substr(2, 8)}`;

export class ProviderMixin {
  constructor () {
    this.events = new EventWrapper();
    this.updateInstanceId();
  }
  
  // Get instance
  getInstance () {
    if (typeof this.shareWindow === 'function') {
      this.shareWindow();
    }
    
    if (typeof this.getCounter === 'function') {
      this.getCounter();
    }
    
    return this;
  }
  
  // Update instance ID
  updateInstanceId () {
    this.instanceId = getUniqueId();
  }
  
  // Renew instance
  reNewInstance () {
    this.events.removeAll();
    this.updateInstanceId();
    return this.getInstance();
  }
}
