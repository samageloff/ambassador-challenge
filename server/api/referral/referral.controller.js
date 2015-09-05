/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /referral              ->  index
 * POST    /referral              ->  create
 * GET     /referral/:name        ->  single
 * PUT     /referral/:id          ->  update
 * DELETE  /referral/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Referral = require('./referral.model');

// Get list of referrals
exports.index = function(req, res) {
  Referral.find(function (err, referrals) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, referrals);
  });
};

// Get a single referral
exports.single = function(req, res) {
  Referral.findOne({'link': req.params.name}, function (err, referral) {
    if (err) {
      return handleError(res, err);
    }
    if (!referral) {
      return res.send(404);
    }
    return res.json(200, referral);
  });
};

// Create a new referral
exports.create = function(req, res) {
  Referral.create(req.body, function(err, referral) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, referral);
  });
};

// Updates an existing referral
exports.update = function(req, res) {
  console.log('req.params.id', req.params);

  if(req.body._id) {
    delete req.body._id;
  }

  Referral.findById(req.params.id, function (err, referral) {
    if (err) {
      return handleError(res, err);
    }
    if (!referral) {
      return res.send(404);
    }

    var updated = _.merge(referral, req.body);

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, referral);
    });
  });
};

// Deletes a referral
exports.destroy = function(req, res) {
  Referral.findById(req.params.id, function (err, referral) {
    if (err) {
      return handleError(res, err);
    }
    if (!referral) {
      return res.send(404);
    }
    referral.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}