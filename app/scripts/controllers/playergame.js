'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:PlayergameCtrl
 * @description
 * # PlayergameCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('PlayergameCtrl', function ($rootScope, $scope, dataService, configData, connectionService, notificationService) {
    $scope.buyerValue             = dataService.getBuyerValue();
    $scope.currentSession         = dataService.getCurrentSession();
    $scope.currentRound           = 1;
    $scope.currentOpenRestaurants = dataService.getOpenRestaurants();

    $scope.currentOpenRestaurants.push({ id: 0, title: 'Pommesbude',   owner: 'Gerda', currentPrice: 8 });
    $scope.currentOpenRestaurants.push({ id: 1, title: 'Dönermann',    owner: 'Abdul', currentPrice: 10 });
    $scope.currentOpenRestaurants.push({ id: 2, title: 'Fish & Chips', owner: 'Fishy', currentPrice: 15 });
    $scope.currentOpenRestaurants.push({ id: 3, title: 'Steakhouse',   owner: 'Fred',  currentPrice: 20 });

    $rootScope.$on(configData.event.bc.addedRestaurant, function () {

    });

    notificationService.openRestaurant()
      .then(function() {
        return notificationService.requestRestaurantName();
      })
      .then(function(data) {
        // Todo: Send restaurant name to api
        console.log(data.value);
      })
      .catch();
  });
