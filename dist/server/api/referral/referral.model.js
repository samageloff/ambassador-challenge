'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReferralSchema = new Schema({
  link: String,
  clicks: Number
});

module.exports = mongoose.model('Referral', ReferralSchema);