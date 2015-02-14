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
    var gameId         = 0;
    var buyerValue     = 0;
    var currentSession = 1;

    return {
      getCurrentSession: function() {
        return currentSession;
      },

      getBuyerValue: function() {
        return buyerValue;
      },

      joinGame : function(payload) {
        if (typeof(payload.gameId)     === 'undefined') { $log.info('Game ID ist not set.'); }
        if (typeof(payload.playerName) === 'undefined') { $log.info('Player name ist not set.'); }

        var networkData = {
          gameId : payload.gameId,
          name   : payload.playerName
        };

        return $q(function (resolve, reject) {
          connectionService.put(configData.event.out.joinGame, networkData)
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
