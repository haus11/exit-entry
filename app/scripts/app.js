'use strict';

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
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
