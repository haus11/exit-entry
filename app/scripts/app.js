/* global io */
'use strict';

// -----------------------------------------------------------------------------
// Sails autoconnect has to be set in the first event loop tick
// -----------------------------------------------------------------------------
io.sails.autoConnect = false;

/**
 * @ngdoc overview
 * @name exitEntryApp
 * @description
 * # exitEntryApp
 *
 * Main module of the application.
 */
angular
  .module('exitEntryApp', [
    'ngAnimate',
    'ngRoute',
    'ngDialog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/playergame', {
        templateUrl: 'views/playergame.html',
        controller: 'PlayergameCtrl'
      })
      .when('/join/:gameId', {
        templateUrl: 'views/join.html',
        controller: 'JoinCtrl'
      })
      .when('/creategame', {
        templateUrl: 'views/creategame.html',
        controller: 'CreategameCtrl'
      })
      .when('/lobby', {
        templateUrl: 'views/lobby.html',
        controller: 'LobbyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


////////////////////////////////////////////////////////////////////////////////
/// Initialize the dialog module with sensible defaults
////////////////////////////////////////////////////////////////////////////////
angular.module('exitEntryApp')
  .config(['ngDialogProvider', function(ngDialogProvider) {
    ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-default',
      plain: false,
      showClose: false,
      closeByDocument: true,
      closeByEscape: true,
      appendTo: false
    });
  }]);
