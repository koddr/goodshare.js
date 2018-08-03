/**
 *  Ilya Reshetnikov
 *  Copyright (c) 2018 Ilya Reshetnikov https://github.com/devxom
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  EventWrapper for goodshare.js
 */

export class EventWrapper {
  constructor() {
    this.handlers = {};
  }

  // Add EventListener to element
  addEventListener(target = document, eventWithNamespace = "click", func) {
    this.handlers[eventWithNamespace] = {
      func: func,
      target: target
    };

    const eventType = eventWithNamespace.split(".")[0];
    const eventHandler = this.handlers[eventWithNamespace]["func"];

    target.addEventListener(eventType, eventHandler);
  }

  // Remove EventListener from element
  removeEventListener(event = "click") {
    const eventType = event.split(".")[0];
    const eventData = this.handlers[event];
    const target = eventData.target;

    target.removeEventListener(eventType, eventData.func);

    delete this.handlers[event];
  }

  // Remove all EventListeners
  removeAll() {
    for (const key in this.handlers) {
      this.removeEventListener(key);
    }
  }
}
