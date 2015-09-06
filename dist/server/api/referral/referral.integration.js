'use strict';

var app = require('../..');
var request = require('supertest');

var newreferral;

describe('referral API:', function() {

  describe('GET /api/referrals', function() {
    var referrals;

    beforeEach(function(done) {
      request(app)
        .get('/api/referrals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          referrals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      referrals.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/referrals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/referrals')
        .send({
          link: 'New referral',
          clicks: 0
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newreferral = res.body;
          done();
        });
    });

    it('should respond with the newly created referral', function() {
      newreferral.link.should.equal('New referral');
      newreferral.clicks.should.equal(0);
    });

  });

  describe('GET /api/referrals/:id', function() {
    var referral;

    beforeEach(function(done) {
      request(app)
        .get('/api/referrals/' + newreferral._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          referral = res.body;
          done();
        });
    });

    afterEach(function() {
      referral = {};
    });

    it('should respond with the requested referral', function() {
      referral.link.should.equal('New referral');
      referral.clicks.should.equal(0);
    });

  });

  describe('PUT /api/referrals/:id', function() {
    var updatedreferral

    beforeEach(function(done) {
      request(app)
        .put('/api/referrals/' + newreferral._id)
        .send({
          link: 'Updated referral',
          clicks: 0
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedreferral = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedreferral = {};
    });

    it('should respond with the updated referral', function() {
      updatedreferral.link.should.equal('Updated referral');
      updatedreferral.clicks.should.equal(0);
    });

  });

  describe('DELETE /api/referrals/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/referrals/' + newreferral._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when referral does not exist', function(done) {
      request(app)
        .delete('/api/referrals/' + newreferral._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
