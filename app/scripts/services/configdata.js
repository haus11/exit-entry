'use strict';

/**
 * @ngdoc service
 * @name exitEntryApp.configData
 * @description
 * # configData
 * Service in the exitEntryApp.
 */
angular.module('exitEntryApp')
  .service('configData', function () {

    return {
      event: {
        out: {
          createGame        : '/game',
          joinGame          : '/game/:id/join',
          openRestaurant    : 'api/server/restaurant'
        },
        in: {
          newRestaurant     : 'restaurant:created',
          updateRestaurant  : 'restaurant:updated',
          removeRestaurant  : 'restaurant:destroyed',
          playerJoined      : 'game:playerJoined',
          playerLeaved      : 'game:playerLeaved',
          playerReconnected : ''
        },
        bc: {
          addedRestaurant   : 'addedRestaurant',
          removedRestaurant : 'removedRestaurant'
        }
      },
      routes: {
        base        : '/',
        join        : '/join/:gameId',
        lobby       : '/lobby',
        createGame  : '/creategame',
        playerGame  : 'playergame'
      },
      init: {
        variableCostsPerMeal  : 5,
        fixCostsPerRestaurant : 20,
        maxCustomers          : 4
      }
    };
  });
