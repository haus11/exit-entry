'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:RestaurantCtrl
 * @description
 * # RestaurantCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('RestaurantCtrl', function ($scope, dataService, configData) {
    $scope.servedCustomers       = dataService.getServedCustomers();
    $scope.restaurantName        = dataService.getRestaurantName();
    $scope.currentPricePerMeal   = dataService.getAdvertisedPricePerMeal();
    $scope.variableCostsPerMeal  = configData.init.variableCostsPerMeal;
    $scope.fixCostsPerRestaurant = configData.init.fixCostsPerRestaurant;
    $scope.salesTaxPerMeal       = 0;
    $scope.maxCustomers          = configData.init.maxCustomers;
    $scope.balance               = dataService.getRestaurantBalance();

    $scope.changeAdvertisedPrice = function(_value) {
      $scope.currentPricePerMeal += _value;
      dataService.setAdvertisedPricePerMeal($scope.currentPricePerMeal);
    };
  });
