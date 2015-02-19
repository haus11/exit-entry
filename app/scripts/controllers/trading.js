'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:TradingCtrl
 * @description
 * # TradingCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('TradingCtrl', function ($scope, dataService, connectionService, configData) {

    $scope.offers     = dataService.getOffers();
    $scope.buyerValue = dataService.getBuyerValue();


    $scope.acceptOffer = function(offer) {
      connectionService.put(configData.event.out.tradeAccept.replace(':tradeId', offer.id));
    };

    $scope.increaseOfferedPrice = function(offer) {
      offer.price += 1;

      connectionService.put(configData.event.out.tradeUpdate.replace(':tradeId', offer.id), {price: offer.price});
    };

    $scope.decreaseOfferedPrice = function(offer) {
      offer.price -= 1;

      connectionService.put(configData.event.out.tradeUpdate.replace(':tradeId', offer.id), {price: offer.price});
    };
  });
