'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:PlayergameCtrl
 * @description
 * # PlayergameCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('PlayergameCtrl', function ($rootScope, $location, $scope, dataService, configData, connectionService, notificationService) {
    $scope.buyerValue               = dataService.getBuyerValue();
    $scope.currentSession           = dataService.getCurrentSession();
    $scope.currentOpenRestaurants   = dataService.getOpenRestaurants();
    $scope.restaurantButtonDisabled = dataService.hasRestaurant();
    $scope.surveyTickTime           = 30;

    var isTradingAllowed = false;


    $scope.startTrading = function(restaurant) {
      if (isTradingAllowed)
      {
        dataService.setTradingRestaurant(restaurant);
        notificationService.startTrading($scope);
      }
    };

    connectionService.on(configData.event.in.surveyStarted, function() {
      notificationService.notify($scope, 'Waiting..', 'Please be patient. It will soon be your turn...');
    });

    connectionService.on(configData.event.in.surveyTick, function(data) {
      console.log('Tick: ' + data.timeLeft);
      $scope.surveyTickTime = data;

      $rootScope.$broadcast('timeout:tick', data.timeLeft / 1000);
    });

    connectionService.on(configData.event.in.surveyTimeout, function() {
      console.log('Timeout');
      notificationService.closeAllDialogs();
    });

    connectionService.on(configData.event.in.surveyFinished, function() {
      console.log('finished');
    });

    connectionService.on(configData.event.in.tradeOffer, function(trade) {
      dataService.addOffer(trade);
    });

    connectionService.on(configData.event.in.tradeAccepted, function() {
      console.log('Trade accepted');
      notificationService.closeAllDialogs();
      isTradingAllowed = false;
    });

    connectionService.on(configData.event.in.allRestaurantsCreated, function() {
      isTradingAllowed = true;
    });

    connectionService.on(configData.event.in.surveyConsult, function() {
      notificationService.closeAllDialogs();

      notificationService.openRestaurant()
        .then(function() {
          return notificationService.requestRestaurantName($scope);
        })
        .then(function(data) {
          return connectionService.post(configData.event.out.openRestaurant, { name: data.value.name, price: data.value.price });
        })
        .then(function(restaurant) {
          //dataService.addRestaurant(restaurant);

          dataService.setRestaurantName(restaurant.name);
          dataService.setAdvertisedPricePerMeal(restaurant.offer.price);
          $scope.restaurantButtonDisabled = true;

          notificationService.closeAllDialogs();
        })
        .catch(function(_reason) {
          notificationService.closeAllDialogs();
          console.log(_reason);
        });
    });


  });
