/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/camping              ->  index
 * POST    /api/camping              ->  create
 * GET     /api/camping/:id          ->  show
 * PUT     /api/camping/:id          ->  update
 * DELETE  /api/camping/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Camping = require('./camping.model');

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

// Gets a list of Campings
exports.index = function(req, res) {
  // Camping.findAsync()
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
  Camping.find({
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
  })
    .limit(100)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Camping from the DB
exports.show = function(req, res) {
  Camping.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Camping in the DB
exports.create = function(req, res) {
  // var coords = [req.body.lon, req.body.lat];
  // req.body.loc = coords;
  // var newCamping = new Camping(req.body);
  // newCamping.save(function(err, camp) {
  //   if(err) {
  //     return res.status(500).end();
  //   } else {
  //     return res.status(200).json(camp);
  //   }
  // })
  Camping.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Camping in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Camping.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Camping from the DB
exports.destroy = function(req, res) {
  Camping.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
