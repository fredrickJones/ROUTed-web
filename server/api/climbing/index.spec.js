'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var climbingCtrlStub = {
  index: 'climbingCtrl.index',
  show: 'climbingCtrl.show',
  create: 'climbingCtrl.create',
  update: 'climbingCtrl.update',
  destroy: 'climbingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var climbingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './climbing.controller': climbingCtrlStub
});

describe('Climbing API Router:', function() {

  it('should return an express router instance', function() {
    climbingIndex.should.equal(routerStub);
  });

  describe('GET /api/rock-climbing', function() {

    it('should route to climbing.controller.index', function() {
      routerStub.get
        .withArgs('/', 'climbingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/rock-climbing/:id', function() {

    it('should route to climbing.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'climbingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/rock-climbing', function() {

    it('should route to climbing.controller.create', function() {
      routerStub.post
        .withArgs('/', 'climbingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/rock-climbing/:id', function() {

    it('should route to climbing.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'climbingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rock-climbing/:id', function() {

    it('should route to climbing.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'climbingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rock-climbing/:id', function() {

    it('should route to climbing.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'climbingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
