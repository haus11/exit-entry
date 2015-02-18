'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('MainCtrl', function ($scope, $location, dataService, configData) {

    dataService.setIsGameMaster(true);
    $location.path(configData.routes.createGame);
  });
