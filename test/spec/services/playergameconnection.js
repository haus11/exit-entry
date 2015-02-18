'use strict';

describe('Service: playergameConnection', function () {

  // load the service's module
  beforeEach(module('exitEntryApp'));

  // instantiate service
  var playergameConnection;
  beforeEach(inject(function (_playergameConnection_) {
    playergameConnection = _playergameConnection_;
  }));

  it('should do something', function () {
    expect(!!playergameConnection).toBe(true);
  });

});
