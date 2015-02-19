'use strict';

/**
 * @ngdoc service
 * @name exitEntryApp.dataService
 * @description
 * # dataService
 * Service in the exitEntryApp.
 */
angular.module('exitEntryApp')
  .service('dataService', function ($rootScope, $log, $q, connectionService, configData) {
    var playerName     = '';
    var gameName       = '';
    var gameId         = 0;
    var buyerValue     = 0;
    var currentSession = 0;
    var isGameMaster   = false;
    var playerMax      = 0;
    var openRestaurants = [];

    // Restaurant variables
    var restaurantName      = '';
    var servedCustomers     = [];
    var advertisedMealPrice = 0;



    connectionService.on(configData.event.in.restaurantCreated, function(restaurant) {
      console.log(restaurant);
      openRestaurants.push(restaurant);
    });

    connectionService.on(configData.event.in.restaurantUpdated, function(restaurant) {
      for (var indexOfRestaurant = 0; indexOfRestaurant < openRestaurants.length; indexOfRestaurant++)
      {
        if (openRestaurants[indexOfRestaurant].id === restaurant.id)
        {
          openRestaurants[indexOfRestaurant].offer.price = restaurant.offer.price;
          break;
        }
      }
    });


    return {
      getRestaurantName: function() {
        return restaurantName;
      },

      getServedCustomers: function() {
        return servedCustomers;
      },

      getAdvertisedPricePerMeal: function() {
        return advertisedMealPrice;
      },

      getRestaurantBalance: function() {
        var balance = -configData.init.fixCostsPerRestaurant;

        for (var indexOfCustomer = 0; indexOfCustomer < servedCustomers.length; indexOfCustomer++)
        {
          balance += servedCustomers[indexOfCustomer].payedPrice - configData.init.variableCostsPerMeal;
        }

        return balance;
      },

      setAdvertisedPricePerMeal: function(_price) {
        advertisedMealPrice = _price;
      },

      setRestaurantName: function (_name) {
        restaurantName = _name;
      },

      getOpenRestaurants: function () {
        return openRestaurants;
      },

      resetRoundData: function() {
        restaurantName      = '';
        advertisedMealPrice = 0;
        servedCustomers     = [];
        openRestaurants     = [];
      },

      setOpenRestaurants: function(_openRestaurants) {
        openRestaurants = _openRestaurants;
      },

      addRestaurant: function(_restaurant) {
        openRestaurants.push(_restaurant);
      },

      removeRestaurant: function(_restaurant) {
        for (var indexOfRestaurant = 0; indexOfRestaurant < openRestaurants.length; indexOfRestaurant++)
        {
          if (openRestaurants[indexOfRestaurant].id === _restaurant.id)
          {
            openRestaurants.splice(indexOfRestaurant, 1);
            break;
          }
        }
      },

      hasRestaurant: function() {
        return restaurantName !== '';
      },


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

      increaseSession: function() {
        currentSession++;

        return currentSession;
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
