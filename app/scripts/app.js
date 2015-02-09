"use strict";

/**
 * @ngdoc overview
 * @name beerAppApp
 * @description
 * # beerAppApp
 *
 * Main module of the application.
 */

var beerApp = angular.module('beerAppApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/beermenu.html',
      controller: 'MainCtrl'
    })
    .when('/beer/:beerId', {
      templateUrl: 'views/beerinfo.html',
      controller: 'beerCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}).config(function($mdThemingProvider) {
$mdThemingProvider.theme('default')
  .primaryColor('orange')
  .accentColor('grey');
});



