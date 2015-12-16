'use strict';

describe('Controller: ClimbingCtrl', function () {

  // load the controller's module
  beforeEach(module('routedApp'));

  var ClimbingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClimbingCtrl = $controller('ClimbingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
