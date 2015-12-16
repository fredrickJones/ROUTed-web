/**
 * Climbing model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Climbing = require('./climbing.model');
var ClimbingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClimbingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Climbing.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ClimbingEvents.emit(event + ':' + doc._id, doc);
    ClimbingEvents.emit(event, doc);
  }
}

module.exports = ClimbingEvents;
