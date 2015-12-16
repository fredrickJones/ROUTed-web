'use strict';

var app = require('../..');
var request = require('supertest');

var newHiking;

describe('Hiking API:', function() {

  describe('GET /api/hiking', function() {
    var hikings;

    beforeEach(function(done) {
      request(app)
        .get('/api/hiking')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          hikings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      hikings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/hiking', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/hiking')
        .send({
          name: 'New Hiking',
          info: 'This is the brand new hiking!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHiking = res.body;
          done();
        });
    });

    it('should respond with the newly created hiking', function() {
      newHiking.name.should.equal('New Hiking');
      newHiking.info.should.equal('This is the brand new hiking!!!');
    });

  });

  describe('GET /api/hiking/:id', function() {
    var hiking;

    beforeEach(function(done) {
      request(app)
        .get('/api/hiking/' + newHiking._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          hiking = res.body;
          done();
        });
    });

    afterEach(function() {
      hiking = {};
    });

    it('should respond with the requested hiking', function() {
      hiking.name.should.equal('New Hiking');
      hiking.info.should.equal('This is the brand new hiking!!!');
    });

  });

  describe('PUT /api/hiking/:id', function() {
    var updatedHiking

    beforeEach(function(done) {
      request(app)
        .put('/api/hiking/' + newHiking._id)
        .send({
          name: 'Updated Hiking',
          info: 'This is the updated hiking!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHiking = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHiking = {};
    });

    it('should respond with the updated hiking', function() {
      updatedHiking.name.should.equal('Updated Hiking');
      updatedHiking.info.should.equal('This is the updated hiking!!!');
    });

  });

  describe('DELETE /api/hiking/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/hiking/' + newHiking._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when hiking does not exist', function(done) {
      request(app)
        .delete('/api/hiking/' + newHiking._id)
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
