'use strict';

angular.module('routedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('climbing', {
        url: '/climbing',
        templateUrl: 'app/climbing/climbing.html',
        controller: 'ClimbingCtrl'
      });
  });
