'use strict';

angular.module('routedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('camping', {
        url: '/camping',
        templateUrl: 'app/camping/camping.html',
        controller: 'CampingCtrl'
      });
  });
