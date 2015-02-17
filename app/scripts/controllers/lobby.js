'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:LobbyCtrl
 * @description
 * # LobbyCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('LobbyCtrl', function ($scope, $log, dataService, configData, connectionService, notificationService) {

    $scope.lobbyData =
    {
      gameName        : dataService.getGameName(),
      playerMax       : dataService.getPlayerMax(),
      numberOfPlayers : 0,
      playerList      : []
    };

    $scope.isGameMaster = dataService.isGameMaster();


    // #################################################################################################################
    //                                                Socket callbacks
    // #################################################################################################################

    // Join server if player is not game manager
    if (!$scope.isGameMaster) {

      // -----------------------------------------------------------------------------
      // Connect to server
      // -----------------------------------------------------------------------------
      dataService.joinGame({ gameId: dataService.getGameId(), playerName: dataService.getPlayerName() })
        .then(function(_data) {
          $scope.lobbyData.playerList      = _data.user;
          $scope.lobbyData.playerMax       = _data.playerMax;
          $scope.lobbyData.numberOfPlayers = _data.user.length;
        })
        .catch(function(reason) {
          notificationService.notify($scope, 'Info', reason);

          $scope.isJoinGameButtonDisabled = false;
          $scope.buttonLabelJoin          = 'Join Game';
        });
    }

    // Event: on player joins
    connectionService.on(configData.event.in.playerJoined, function (_data) {

      $scope.lobbyData.playerList.push(_data);
      $scope.lobbyData.numberOfPlayers++;
    });

    // on player reconnects
    connectionService.on(configData.event.in.playerReconnected, function (_data) {

      $scope.lobbyData.playerList.push(_data);
      $scope.lobbyData.numberOfPlayers++;
    });

    // on player disconnects
    connectionService.on(configData.event.in.playerLeaved, function (_data) {
      console.log('UserDisconnect');

      for (var i = 0; i < $scope.lobbyData.playerList.length; i++) {
        if ($scope.lobbyData.playerList[i].id === _data.id) {
          $scope.lobbyData.playerList.splice(i, 1);
          $scope.lobbyData.numberOfPlayers--;
          break;
        }
      }
    });

    $scope.startGame = function () {

      //var url = config.api.gameStart.replace('id', gameData.getGameId());
      //connectionService.put(url, null)
      //  .then(function () {
      //    gameData.increaseSessionNumber();
      //
      //    url = config.api.sessionNew.replace('gameId', gameData.getServerId());
      //    return connectionService.post(url, null);
      //  })
      //  .then(function () {
      //    gameData.resetRoundNumber();
      //    url = config.api.roundNew.replace('gameId', gameData.getServerId());
      //    url = url.replace('sessionCount', gameData.getSessionNumber());
      //    return connectionService.post(url, null);
      //  })
      //  .then(function (_data) {
      //    console.log(_data);
      //    $location.path(config.routes.managerManage);
      //  })
      //  .catch(function (_reason) {
      //    new Notification('Could not start Game: ' + _reason);
      //  });
    };
  });
