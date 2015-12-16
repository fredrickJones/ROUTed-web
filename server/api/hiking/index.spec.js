'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var hikingCtrlStub = {
  index: 'hikingCtrl.index',
  show: 'hikingCtrl.show',
  create: 'hikingCtrl.create',
  update: 'hikingCtrl.update',
  destroy: 'hikingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var hikingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './hiking.controller': hikingCtrlStub
});

describe('Hiking API Router:', function() {

  it('should return an express router instance', function() {
    hikingIndex.should.equal(routerStub);
  });

  describe('GET /api/hiking', function() {

    it('should route to hiking.controller.index', function() {
      routerStub.get
        .withArgs('/', 'hikingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/hiking/:id', function() {

    it('should route to hiking.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'hikingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/hiking', function() {

    it('should route to hiking.controller.create', function() {
      routerStub.post
        .withArgs('/', 'hikingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/hiking/:id', function() {

    it('should route to hiking.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'hikingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/hiking/:id', function() {

    it('should route to hiking.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'hikingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/hiking/:id', function() {

    it('should route to hiking.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'hikingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
