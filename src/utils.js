export const getUniqId = (prefix = 'id') =>
  `${prefix}-${Math.random().toString(36).substr(2, 8)}`;

export class EventWithNamespace {
  constructor() {
    this.handlers = {};
  }

  addEventListener(
    target = document,
    eventWithNamespace = 'click',
    func
  ) {
    this.handlers[eventWithNamespace] = {
      func: func,
      target: target
    };

    const eventType = eventWithNamespace.split('.')[0];
    const eventHandler = this.handlers[eventWithNamespace]['func'];

    target.addEventListener(eventType, eventHandler);
  }

  removeEventListener(
    event = 'click',
  ) {
    const eventType = event.split('.')[0];
    const eventData = this.handlers[event];
    const target = eventData.target;

    target.removeEventListener(eventType, eventData.func);

    delete this.handlers[event];
  }

  removeAll() {
    for (const key in this.handlers) {
      this.removeEventListener(key);
    }
  }
}

export class ProviderMixin {
  constructor() {
    this.events = new EventWithNamespace();
    this.instanceId = getUniqId();
  }
  
  getInstance() {
    if (typeof this.shareWindow === 'function') {
      this.shareWindow();
    }
  
    if (typeof this.getCounter === 'function') {
      this.getCounter();
    }
    
    return this;
  }
  
  reNewInstance() {
    this.events.removeAll();
    this.getInstance();
  }
  
}
