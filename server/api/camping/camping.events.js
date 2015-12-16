/**
 * Camping model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Camping = require('./camping.model');
var CampingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CampingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Camping.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CampingEvents.emit(event + ':' + doc._id, doc);
    CampingEvents.emit(event, doc);
  }
}

module.exports = CampingEvents;
