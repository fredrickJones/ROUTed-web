'use strict';

angular.module('routedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('hiking', {
        url: '/hiking',
        templateUrl: 'app/hiking/hiking.html',
        controller: 'HikingCtrl'
      });
  });
