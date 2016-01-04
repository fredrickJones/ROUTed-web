'use strict';

angular.module('routedApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [
      {
        'title': 'Home',
        'state': 'main'
      },
      {
        'title': 'Routes',
        'state': 'map'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
