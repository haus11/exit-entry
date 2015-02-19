'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:LobbyCtrl
 * @description
 * # LobbyCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('LobbyCtrl', function ($scope, $location, $log, dataService, configData, connectionService, notificationService) {

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
          _data.game.user.splice(0,1);

          $scope.lobbyData.gameName        = _data.game.name;
          $scope.lobbyData.playerList      = _data.game.user;
          $scope.lobbyData.playerMax       = _data.game.playerMax;
          $scope.lobbyData.numberOfPlayers = _data.game.user.length - 1;


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

    connectionService.on(configData.event.in.gameStarted, function() {
      if (!$scope.isGameMaster)
      {
        $location.path('/playergame');
      }
    });

    $scope.startGame = function () {
      var gameId =  dataService.getGameId();

      connectionService.put(configData.event.out.startGame.replace(':id', gameId))
        .then(function() {
          return connectionService.post(configData.event.out.startSession);
        })
        .then(function() {
          return connectionService.post(configData.event.out.newRound);
        })
        .then(function() {
          $location.path('/gamemaster');
        })
        .catch(function(_reason) {
          console.log(_reason);
        });
    };
  });
