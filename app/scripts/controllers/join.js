'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('JoinCtrl', function ($routeParams, $scope, $location, dataService, configData) {
    // -----------------------------------------------------------------------------
    // Get game id from url
    // -----------------------------------------------------------------------------
    $scope.gameId     = $routeParams.gameId || 0;
    $scope.playerName = '';
    $scope.isJoinGameButtonDisabled = false;
    $scope.buttonLabelJoin          = 'Join Game';

    dataService.setIsGameMaster(false);

    $scope.joinGame = function() {
      $scope.isJoinGameButtonDisabled = true;
      $scope.buttonLabelJoin = 'Joining..';

      dataService.setPlayerName($scope.playerName);
      dataService.setGameId($scope.gameId);

      $location.path(configData.routes.lobby);

    };
  });
