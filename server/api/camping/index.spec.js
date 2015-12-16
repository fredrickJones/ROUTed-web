'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var campingCtrlStub = {
  index: 'campingCtrl.index',
  show: 'campingCtrl.show',
  create: 'campingCtrl.create',
  update: 'campingCtrl.update',
  destroy: 'campingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var campingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './camping.controller': campingCtrlStub
});

describe('Camping API Router:', function() {

  it('should return an express router instance', function() {
    campingIndex.should.equal(routerStub);
  });

  describe('GET /api/camping', function() {

    it('should route to camping.controller.index', function() {
      routerStub.get
        .withArgs('/', 'campingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/camping/:id', function() {

    it('should route to camping.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'campingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/camping', function() {

    it('should route to camping.controller.create', function() {
      routerStub.post
        .withArgs('/', 'campingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/camping/:id', function() {

    it('should route to camping.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'campingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/camping/:id', function() {

    it('should route to camping.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'campingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/camping/:id', function() {

    it('should route to camping.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'campingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
