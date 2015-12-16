'use strict';

describe('Service: Adventures', function () {

  // load the service's module
  beforeEach(module('routedApp'));

  // instantiate service
  var Adventures;
  beforeEach(inject(function (_Adventures_) {
    Adventures = _Adventures_;
  }));

  it('should do something', function () {
    expect(!!Adventures).toBe(true);
  });

});
