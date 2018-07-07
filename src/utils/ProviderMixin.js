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
  
  // handler wrapper for cb manipulations
  eventHandler(
    event,
    {
      callback,
      share_url,
      windowTitle,
      windowOptions,
    }
  ) {
    event.preventDefault();
    
    const windowObject = window.open(share_url, windowTitle, windowOptions);
    
    const windowCloseChecker = setInterval(() => {
      if (windowObject.closed) {
        callback();
        clearInterval(windowCloseChecker);
      }
    }, 10);
    
    return windowObject;
  };
  
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
