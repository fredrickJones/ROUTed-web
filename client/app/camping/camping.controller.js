'use strict';

angular.module('routedApp')
	.controller('CampingCtrl', function($scope, Adventures) {
		$scope.submitted = false;
		$scope.newSite = function(siteData) {
			console.log(siteData);
			if ($scope.campsite.$valid) {
				Adventures.addSite(siteData);
			} else {
				$scope.campsite.submitted = true;
			}
			$scope.site = null;
		};
		$scope.cancel = function() {
			$scope.site = null;
		}
	});
