/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Referral = require('../api/referral/referral.model');


Referral.find({}).removeAsync()
  .then(function() {
    Referral.create({
      link: 'wolverines',
      clicks: 10
    }, {
      link: 'spartans',
      clicks: 5
    }, {
      link: 'lakers',
      clicks: 12
    }, {
      link: 'broncos',
      clicks: 34
    }, {
      link: 'lions',
      clicks: 0
    });
  });

