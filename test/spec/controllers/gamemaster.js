'use strict';

describe('Controller: GamemasterCtrl', function () {

  // load the controller's module
  beforeEach(module('exitEntryApp'));

  var GamemasterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamemasterCtrl = $controller('GamemasterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
