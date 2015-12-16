/**
 * Hiking model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Hiking = require('./hiking.model');
var HikingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HikingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Hiking.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HikingEvents.emit(event + ':' + doc._id, doc);
    HikingEvents.emit(event, doc);
  }
}

module.exports = HikingEvents;
