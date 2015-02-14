'use strict';

describe('Service: connectionService', function () {

  // load the service's module
  beforeEach(module('exitEntryApp'));

  // instantiate service
  var connectionService;
  beforeEach(inject(function (_connectionService_) {
    connectionService = _connectionService_;
  }));

  it('should do something', function () {
    expect(!!connectionService).toBe(true);
  });

});
