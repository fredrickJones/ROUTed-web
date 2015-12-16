'use strict';

var app = require('../..');
var request = require('supertest');

var newCamping;

describe('Camping API:', function() {

  describe('GET /api/camping', function() {
    var campings;

    beforeEach(function(done) {
      request(app)
        .get('/api/camping')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          campings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      campings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/camping', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/camping')
        .send({
          name: 'New Camping',
          info: 'This is the brand new camping!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCamping = res.body;
          done();
        });
    });

    it('should respond with the newly created camping', function() {
      newCamping.name.should.equal('New Camping');
      newCamping.info.should.equal('This is the brand new camping!!!');
    });

  });

  describe('GET /api/camping/:id', function() {
    var camping;

    beforeEach(function(done) {
      request(app)
        .get('/api/camping/' + newCamping._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          camping = res.body;
          done();
        });
    });

    afterEach(function() {
      camping = {};
    });

    it('should respond with the requested camping', function() {
      camping.name.should.equal('New Camping');
      camping.info.should.equal('This is the brand new camping!!!');
    });

  });

  describe('PUT /api/camping/:id', function() {
    var updatedCamping

    beforeEach(function(done) {
      request(app)
        .put('/api/camping/' + newCamping._id)
        .send({
          name: 'Updated Camping',
          info: 'This is the updated camping!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCamping = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCamping = {};
    });

    it('should respond with the updated camping', function() {
      updatedCamping.name.should.equal('Updated Camping');
      updatedCamping.info.should.equal('This is the updated camping!!!');
    });

  });

  describe('DELETE /api/camping/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/camping/' + newCamping._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when camping does not exist', function(done) {
      request(app)
        .delete('/api/camping/' + newCamping._id)
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
