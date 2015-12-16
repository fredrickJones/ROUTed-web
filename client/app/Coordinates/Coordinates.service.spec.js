'use strict';

describe('Service: Coordinates', function () {

  // load the service's module
  beforeEach(module('routedApp'));

  // instantiate service
  var Coordinates;
  beforeEach(inject(function (_Coordinates_) {
    Coordinates = _Coordinates_;
  }));

  it('should do something', function () {
    expect(!!Coordinates).toBe(true);
  });

});
