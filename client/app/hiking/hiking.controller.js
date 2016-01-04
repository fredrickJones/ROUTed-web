'use strict';

angular.module('routedApp')
	.controller('HikingCtrl', function ($scope) {
		$scope.submitted = false;
		$scope.newTrail = function(trailData) {
			console.log(trailData);
			if ($scope.trail.$valid) {
				Adventures.addHike(trailData);
			} else {
				$scope.trail.submitted = true;
			}
			$scope.trail = null;
		};
		$scope.cancel = function() {
			$scope.trail = null;
		}
	});
