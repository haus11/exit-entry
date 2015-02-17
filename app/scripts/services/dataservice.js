'use strict';

/**
 * @ngdoc service
 * @name exitEntryApp.dataService
 * @description
 * # dataService
 * Service in the exitEntryApp.
 */
angular.module('exitEntryApp')
  .service('dataService', function ($log, $q, $rootScope, connectionService, configData) {
    var playerName     = '';
    var gameName       = '';
    var gameId         = 0;
    var buyerValue     = 0;
    var currentSession = 1;
    var isGameMaster   = false;
    var playerMax      = 0;

    return {

      getGameId: function () {
        return gameId;
      },

      setGameId: function (_gameId) {
        gameId = _gameId;
      },

      getPlayerName: function () {
        return playerName;
      },

      setPlayerName: function (_playerName) {
        playerName = _playerName;
      },


      getGameName: function () {
        return gameName;
      },

      setGameName: function (_gameName) {
        gameName = _gameName;
      },

      getCurrentSession: function() {
        return currentSession;
      },

      getBuyerValue: function() {
        return buyerValue;
      },

      isGameMaster: function () {
        return isGameMaster;
      },

      setIsGameMaster: function (_gameMaster) {
        isGameMaster = _gameMaster;
      },

      getPlayerMax: function () {
        return playerMax;
      },

      setPlayerMax: function (_playerMax) {
        playerMax = _playerMax;
      },


      joinGame : function(payload) {
        if (typeof(payload.gameId)     === 'undefined') { $log.info('Game ID ist not set.'); }
        if (typeof(payload.playerName) === 'undefined') { $log.info('Player name ist not set.'); }

        return $q(function (resolve, reject) {
          connectionService.put(configData.event.out.joinGame.replace(':id', payload.gameId), { gameID: payload.gameId, username: payload.playerName })
            .then(function(data) {
              playerName = payload.playerName;
              gameId     = payload.gameId;
              buyerValue = data.buyerValue || 0;

              resolve(data);
            })
            .catch(function(reason) {
              reject(reason);
            });
        });
      }
    };
  });
