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
      connectionService.post(configData.event.out.newRound)
        .then(function() {
          return connectionService.post(configData.event.out.startSurvey);
        })
        .catch();
    };

    $scope.endRound = function() {
      connectionService.post(configData.event.out.endRound);
    };

    $scope.startSession = function() {
      connectionService.post(configData.event.out.startSession);
    };

    $scope.endSession = function() {
      connectionService.post(configData.event.out.endSession);
    };
  });
