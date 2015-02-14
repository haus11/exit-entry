'use strict';

/**
 * @ngdoc service
 * @name exitEntryApp.notificationService
 * @description
 * # notificationService
 * Service in the exitEntryApp.
 */
angular.module('exitEntryApp')
  .service('notificationService', function ( ngDialog) {
    return {
      notify: function($scope, type, message) {
        $scope.dialogModel = {};
        $scope.dialogModel.type = type;
        $scope.dialogModel.message = message;

        ngDialog.open({
          template: 'views/dialogs/default.html',
          scope: $scope
        });
      },

      openRestaurant: function($scope) {
        return ngDialog.open({
          template: 'views/dialogs/openRestaurant.html',
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false
        }).closePromise;
      },

      requestRestaurantName: function($scope) {
        return ngDialog.open({
          template: 'views/dialogs/enterRestaurantNameDialog.html',
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false
        }).closePromise;
      }
    };
  });
