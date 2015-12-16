'use strict';

describe('Controller: CampingCtrl', function () {

  // load the controller's module
  beforeEach(module('routedApp'));

  var CampingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampingCtrl = $controller('CampingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
