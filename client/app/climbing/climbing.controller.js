'use strict';

angular.module('routedApp')
  .controller('ClimbingCtrl', function($scope, Adventures) {
// CLIMBING
    $scope.submitted = false;
		$scope.newClimb = function(climbData) {
			console.log(climbData);
			// Adventures.addCrag(climbData);
			if ($scope.rockclimb.$valid) {
				Adventures.addClimb(climbData);
			} else {
				$scope.rockclimb.submitted = true;
			}
			// $scope.climb = null;
		};
		$scope.cancel = function() {
			$scope.climb = null;
		}
  });
