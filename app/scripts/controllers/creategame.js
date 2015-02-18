'use strict';

/**
 * @ngdoc function
 * @name exitEntryApp.controller:CreategameCtrl
 * @description
 * # CreategameCtrl
 * Controller of the exitEntryApp
 */
angular.module('exitEntryApp')
  .controller('CreategameCtrl', function ($scope, $log, $location, dataService, connectionService, notificationService) {

    $scope.inputData =
    {
      'gameName'  : '',
      'playerMax' : 2
    };

    dataService.setIsGameMaster(true);

    $scope.increasePlayerMax = function (_value) {
      $scope.inputData.playerMax += _value;
      if ($scope.inputData.playerMax < 2) {
        $scope.inputData.playerMax = 2;
      }
    };

    $scope.createGame = function () {
      var postData = {
        'secret'     : 'exitentry',
        'name'       : $scope.inputData.gameName,
        'playerMax'  : $scope.inputData.playerMax
      };

      connectionService.post('/game', postData)
        .then(function (_data) {

          dataService.setGameName(_data.name);
          dataService.setPlayerMax(_data.playerMax);
          dataService.setGameId(_data.id);

          console.log(_data);
          $location.path('/lobby');
        })
        .catch(function (_reason) {
          notificationService.notify($scope, 'Info', _reason);
        });
    };

  });
