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
          openRestaurant    : '/ee/restaurant',
          updateRestaurant  : '/ee/restaurant',
          startGame         : '/game/:id/start',
          startSession      : '/game/session',
          endSession        : '/game/session/end',
          newRound          : '/game/session/round',
          endRound          : '/game/session/round',
          startSurvey       : '/ee/survey',
          surveyVote        : '/ee/survey/vote',
          tradeUpdate       : '/trade/:tradeId',
          tradeAccept       : '/trade/:tradeId/accept',
          tradeStart        : '/offer/:offerId/trade'
        },
        in: {
          restaurantCreated : 'restaurant:created',
          restaurantUpdated : 'restaurant:updated',
          playerJoined      : 'game:playerJoined',
          playerLeaved      : 'game:playerLeaved',
          gameStarted       : 'game:started',
          playerReconnected : '',
          surveyStarted     : 'survey:started',
          surveyConsult     : 'survey:consult',
          surveyTick        : 'survey:tick',
          surveyFinished    : 'survey:finished',
          surveyTimeout     : 'survey:timeout',
          tradeOffer        : 'trade:created',
          tradeAccepted     : 'trade:accepted',
          allRestaurantsCreated : 'survey:allRestaurantsCreated'

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
