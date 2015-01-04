'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
