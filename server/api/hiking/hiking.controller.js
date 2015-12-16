/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/hiking              ->  index
 * POST    /api/hiking              ->  create
 * GET     /api/hiking/:id          ->  show
 * PUT     /api/hiking/:id          ->  update
 * DELETE  /api/hiking/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Hiking = require('./hiking.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Hikings
exports.index = function(req, res) {
  Hiking.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
  Hiking.find({
    loc: {
      $near: [Number(req.query.lon), Number(req.query.lat)],
      $maxDistance: 0.724637
    }
  }, function(err, success) {
    if(err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(success);
    }
  }).limit(100);
};

// Gets a single Hiking from the DB
exports.show = function(req, res) {
  Hiking.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Hiking in the DB
exports.create = function(req, res) {
  // var coords = [req.body.lon, req.body.lat];
  // req.body.loc = coords;
  // var newHike = new Hiking(req.body);
  // newHike.save(err, hike) {
  //   if(err) {
  //     return res.status(500).end();
  //   } else {
  //     return res.status(200).json(hike);
  //   }
  // }
  Hiking.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Hiking in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Hiking.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Hiking from the DB
exports.destroy = function(req, res) {
  Hiking.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
