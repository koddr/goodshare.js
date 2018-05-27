import { EventWrapper } from '../utils/EventWrapper';

const getUniqId = (prefix = 'id') =>
  `${prefix}-${Math.random().toString(36).substr(2, 8)}`;

export class ProviderMixin {
  constructor () {
    this.events = new EventWrapper();
    this.updateInstanceId();
  }
  
  updateInstanceId () {
    this.instanceId = getUniqId();
  }
  
  getInstance () {
    if (typeof this.shareWindow === 'function') {
      this.shareWindow();
    }
    
    if (typeof this.getCounter === 'function') {
      this.getCounter();
    }
    
    return this;
  }
  
  reNewInstance () {
    this.events.removeAll();
    this.updateInstanceId();
    return this.getInstance();
  }
}
