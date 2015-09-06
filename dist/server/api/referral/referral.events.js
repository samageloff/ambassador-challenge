/**
 * referral model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var referral = require('./referral.model');
var referralEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
referralEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  referral.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    referralEvents.emit(event + ':' + doc._id, doc);
    referralEvents.emit(event, doc);
  }
}

module.exports = referralEvents;
