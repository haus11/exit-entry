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
    $scope.buyerValue               = dataService.getBuyerValue();
    $scope.currentSession           = dataService.getCurrentSession();
    $scope.currentOpenRestaurants   = dataService.getOpenRestaurants();
    $scope.restaurantButtonDisabled = dataService.hasRestaurant();


    $rootScope.$on(configData.event.bc.addedRestaurant, function () {

    });

    /*notificationService.openRestaurant()
      .then(function() {
        return notificationService.requestRestaurantName();
      })
      .then(function(data) {
        // Todo: Send restaurant name to api
        console.log(data.value);
      })
      .catch();*/
  });
