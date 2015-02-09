'use strict';
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
    'ngMaterial'
  ]).config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/beermenu.html',
        controller: 'MainCtrl'
      }).when('/beer/:beerId', {
        templateUrl: 'views/beerinfo.html',
        controller: 'beerCtrl'
      }).when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).otherwise({ redirectTo: '/' });
    }
  ]).config([
    '$mdThemingProvider',
    function ($mdThemingProvider) {
      $mdThemingProvider.theme('default').primaryColor('orange').accentColor('grey');
    }
  ]);
'use strict';
/**
 * @ngdoc function
 * @name beerAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beerAppApp
 */
angular.module('beerAppApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var selectedIndex = 0;
    $scope.data = { selectedIndex: 0 };
    $scope.next = function () {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function () {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
  }
]).controller('sort2', [
  '$scope',
  '$filter',
  '$http',
  function ($scope, $filter, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.beers = [];
    $scope.favorites = [];
    $scope.arrUnique = [];
    function unique(origArr) {
      var newArr = [], origLen = origArr.length, found, x, y;
      for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
          if (origArr[x] === newArr[y]) {
            found = true;
            break;
          }
        }
        if (!found) {
          newArr.push(origArr[x]);
        }
      }
      return newArr;
    }
    $scope.addItem = function (b) {
      $scope.favorites.push($scope.beers[b]);
      //$scope.beers.splice(index,1);
      $scope.arrUnique = unique($scope.favorites);
      $scope.favorites = $scope.arrUnique;
    };
    $scope.removeItem = function (index) {
      $scope.favorites.splice(index, 1);
    };
    $scope.query = {};
    $scope.queryBy = '$';
    $http.get('json/beers.json').success(function (data) {
      $scope.beers = data;
      $scope.predicate = '-status';
    });
    $scope.predicate = '-status';
    var orderBy = $filter('orderBy');
    $scope.order = function (predicate, reverse) {
      $scope.beers = orderBy($scope.beers, predicate, reverse);
    };
    $scope.order('-status', false);
    $scope.filter = {};
    $scope.getType = function () {
      return ($scope.beers || []).map(function (b) {
        return b.type;
      }).filter(function (b, idx, arr) {
        return arr.indexOf(b) === idx;
      });
    };
    $scope.filterByType = function (beer) {
      return $scope.filter[beer.type] || noFilter($scope.filter);
    };
    function noFilter(filterObj) {
      for (var key in filterObj) {
        if (filterObj[key]) {
          return false;
        }
      }
      return true;
    }
  }
]).controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  $scope.close = function () {
    $mdSidenav('right').close().then(function () {
      $log.debug('close RIGHT is done');
    });
  };
}).controller('beerCtrl', [
  '$scope',
  '$routeParams',
  function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.beerId = $routeParams.beerId;
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name beerAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beerAppApp
 */
angular.module('beerAppApp').controller('AboutCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.logo = { 'img': 'images/logoSemiTrans.png' };
  }
]);
'use strict';
angular.module('beerAppApp').controller('AppCtrl', [
  '$scope',
  '$timeout',
  '$mdSidenav',
  '$log',
  function ($scope, $timeout, $mdSidenav, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.toggleLeft = function () {
      $mdSidenav('left').toggle().then(function () {
        $log.debug('toggle left is done');
      });
    };
    $scope.toggleRight = function () {
      $mdSidenav('right').toggle().then(function () {
        $log.debug('toggle RIGHT is done');
      });
    };
  }
]).controller('LeftCtrl', [
  '$scope',
  '$timeout',
  '$mdSidenav',
  '$log',
  function ($scope, $timeout, $mdSidenav, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.close = function () {
      $mdSidenav('left').close().then(function () {
        $log.debug('close LEFT is done');
      });
    };
  }
]).controller('RightCtrl', [
  '$scope',
  '$timeout',
  '$mdSidenav',
  '$log',
  function ($scope, $timeout, $mdSidenav, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.close = function () {
      $mdSidenav('right').close().then(function () {
        $log.debug('close RIGHT is done');
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name beerAppApp.controller:beerCtrl
 * @description
 * # beerCtrl
 * Controller of the beerAppApp
 */
angular.module('beerAppApp').controller('beerCtrl', [
  '$scope',
  '$routeParams',
  '$http',
  function ($scope, $routeParams, $http) {
    $http.get('json/beers.json').success(function (data) {
      angular.forEach(data, function (b) {
        if (b.id === $routeParams.beerId) {
          $scope.beer = b;
        }
      });
    });
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);