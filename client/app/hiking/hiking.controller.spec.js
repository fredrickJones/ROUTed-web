'use strict';

describe('Controller: HikingCtrl', function () {

  // load the controller's module
  beforeEach(module('routedApp'));

  var HikingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HikingCtrl = $controller('HikingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
