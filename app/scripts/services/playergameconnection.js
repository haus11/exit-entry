'use strict';

/**
 * @ngdoc service
 * @name exitEntryApp.playergameConnection
 * @description
 * # playergameConnection
 * Service in the exitEntryApp.
 */
angular.module('exitEntryApp')
  .service('playergameConnection', function (connectionService, dataService, configData) {
    // -----------------------------------------------------------------------------
    // Setup the listener events
    // -----------------------------------------------------------------------------
    connectionService.on(configData.event.in.newRestaurant, function(data) {
      dataService.addRestaurant(data);
    });

    connectionService.on(configData.event.in.removeRestaurant, function(data) {
      dataService.removeRestaurant(data);
    });

    return {

    };
  });
