'use strict';

var app = require('../..');
var request = require('supertest');

var newClimbing;

describe('Climbing API:', function() {

  describe('GET /api/rock-climbing', function() {
    var climbings;

    beforeEach(function(done) {
      request(app)
        .get('/api/rock-climbing')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          climbings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      climbings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/rock-climbing', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rock-climbing')
        .send({
          name: 'New Climbing',
          info: 'This is the brand new climbing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newClimbing = res.body;
          done();
        });
    });

    it('should respond with the newly created climbing', function() {
      newClimbing.name.should.equal('New Climbing');
      newClimbing.info.should.equal('This is the brand new climbing!!!');
    });

  });

  describe('GET /api/rock-climbing/:id', function() {
    var climbing;

    beforeEach(function(done) {
      request(app)
        .get('/api/rock-climbing/' + newClimbing._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          climbing = res.body;
          done();
        });
    });

    afterEach(function() {
      climbing = {};
    });

    it('should respond with the requested climbing', function() {
      climbing.name.should.equal('New Climbing');
      climbing.info.should.equal('This is the brand new climbing!!!');
    });

  });

  describe('PUT /api/rock-climbing/:id', function() {
    var updatedClimbing

    beforeEach(function(done) {
      request(app)
        .put('/api/rock-climbing/' + newClimbing._id)
        .send({
          name: 'Updated Climbing',
          info: 'This is the updated climbing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedClimbing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedClimbing = {};
    });

    it('should respond with the updated climbing', function() {
      updatedClimbing.name.should.equal('Updated Climbing');
      updatedClimbing.info.should.equal('This is the updated climbing!!!');
    });

  });

  describe('DELETE /api/rock-climbing/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rock-climbing/' + newClimbing._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when climbing does not exist', function(done) {
      request(app)
        .delete('/api/rock-climbing/' + newClimbing._id)
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
