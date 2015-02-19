'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:GamemasterCtrl
 * @description
 * # GamemasterCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('GamemasterCtrl', function ($scope, configData, connectionService) {
    $scope.startRound = function() {
      connectionService.post(configData.event.out.startSurvey);
    };

    $scope.endRound = function() {
      console.log('End Round');
    };

    $scope.startSession = function() {
      console.log('Start Session');
    };

    $scope.endSession = function() {
      console.log('End Session');
    };
  });
