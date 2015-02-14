'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('JoinCtrl', function ($routeParams, $scope, $location, dataService, notificationService) {
    // -----------------------------------------------------------------------------
    // Get game id from url
    // -----------------------------------------------------------------------------
    $scope.gameId     = $routeParams.gameId || 0;
    $scope.playerName = '';
    $scope.isJoinGameButtonDisabled = false;
    $scope.buttonLabelJoin          = 'Join Game';


    $scope.joinGame = function() {
      $scope.isJoinGameButtonDisabled = true;
      $scope.buttonLabelJoin = 'Joining..';

      // -----------------------------------------------------------------------------
      // Connect to server
      // -----------------------------------------------------------------------------
      dataService.joinGame({ gameId: $scope.gameId, playerName: $scope.playerName })
        .then(function() {
          $location.path('/playergame');
        })
        .catch(function(reason) {
          notificationService.notify($scope, 'Info', reason);

          $scope.isJoinGameButtonDisabled = false;
          $scope.buttonLabelJoin          = 'Join Game';
        });
    };
  });
