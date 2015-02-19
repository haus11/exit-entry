'use strict';

/**
 * @ngdoc service
 * @name exitEntryApp.notificationService
 * @description
 * # notificationService
 * Service in the exitEntryApp.
 */
angular.module('exitEntryApp')
  .service('notificationService', function ($q, ngDialog, connectionService, configData) {
    return {
      notify: function($scope, type, message) {
        $scope.dialogModel = {};
        $scope.dialogModel.type = type;
        $scope.dialogModel.message = message;

        return ngDialog.open({
          template: 'views/dialogs/default.html',
          scope: $scope
        }).closePromise;
      },

      closeAllDialogs: function() {
        ngDialog.closeAll();
      },

      openRestaurant: function($scope) {
        return $q(function(resolve, reject) {
          ngDialog.open({
            template: 'views/dialogs/openRestaurant.html',
            scope: $scope,
            closeByEscape: false,
            closeByDocument: false,
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
              $scope.timeToTimeout = 30;

              $rootScope.$on('timeout:tick', function(event, data) {
                $scope.timeToTimeout = data;
              });
            }]
          }).closePromise.then(function(data) {
              if (data.value === 'yes')
              {
                connectionService.post(configData.event.out.surveyVote, { restaurant: true })
                  .then(function() {
                    resolve();
                  });
              }
              else
              {
                connectionService.post(configData.event.out.surveyVote, { restaurant: false })
                  .then(function() {
                    reject('User does not want to open a restaurant.');
                  });
              }
            });
        });
      },

      requestRestaurantName: function($scope) {
        return ngDialog.open({
          template: 'views/dialogs/enterRestaurantNameDialog.html',
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false
        }).closePromise;
      },

      showTradeOffer: function($scope, trade) {
        return ngDialog.open({
          template: 'views/dialogs/showTradeOffer.html',
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false,
          controller: ['$scope', function($scope) {
            $scope.tradeData = trade;
          }]
        }).closePromise;
      }
    };
  });
