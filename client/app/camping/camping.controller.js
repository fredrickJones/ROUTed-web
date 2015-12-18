'use strict';

angular.module('routedApp')
  .controller('CampingCtrl', function($scope, Adventures) {
// CAMPING
		$scope.newSite = function(siteData) {
			// console.log(siteData);
			// Adventures.addSite(siteData);
			if ($scope.site_form.$valid) {
				Adventures.addSite(siteData);
			} else {
				$scope.campsite.submitted = true;
				// $scope.site = null;
			}
		};
  });
