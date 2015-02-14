'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:PlayergameCtrl
 * @description
 * # PlayergameCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('PlayergameCtrl', function ($scope, dataService, configData, connectionService, notificationService) {
    $scope.buyerValue             = dataService.getBuyerValue();
    $scope.currentSession         = dataService.getCurrentSession();
    $scope.currentRound           = 1;
    $scope.currentOpenRestaurants = [];

    $scope.currentOpenRestaurants.push({ id: 0, title: 'Pommesbude',   owner: 'Gerda', currentPrice: 8 });
    $scope.currentOpenRestaurants.push({ id: 1, title: 'Dönermann',    owner: 'Abdul', currentPrice: 10 });
    $scope.currentOpenRestaurants.push({ id: 2, title: 'Fish & Chips', owner: 'Fishy', currentPrice: 15 });
    $scope.currentOpenRestaurants.push({ id: 3, title: 'Steakhouse',   owner: 'Fred',  currentPrice: 20 });


    connectionService.on(configData.event.in.newRestaurant, function(data) {
      $scope.currentOpenRestaurants.push(data);
    });

    connectionService.on(configData.event.in.removeRestaurant, function(data) {
      for (var indexOfRestaurant = 0; indexOfRestaurant < $scope.currentOpenRestaurants; indexOfRestaurant++)
      {
        if ($scope.currentOpenRestaurants[indexOfRestaurant].id === data.restaurantId)
        {
          $scope.currentOpenRestaurants.splice(indexOfRestaurant, 1);
        }
      }
    });

    connectionService.on(configData.event.in.newRestaurant, function() {

    });


    notificationService.openRestaurant()
      .then(function(data) {
        if (data.value === 'yes')
        {
          return notificationService.requestRestaurantName();
        }
        return false;
      })
      .then(function(data) {
        console.log(data.value);
      });
  });
