'use strict';

angular.module('routedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl',
    		resolve: {
					userCenter: function(Coordinates, $q){
						var deferred = $q.defer()
						Coordinates.getCoords().then(function(coords){
							coords.latitude = coords.lat;
							coords.longitude = coords.lon;
							deferred.resolve(coords);
						})
						return deferred.promise;
					}//,
					// climbing: function(Adventures) {  //<--this will load points on load
					// 	return Adventures.getClimb();
					// },
					// camping: function(Adventures) {  //<--this will load points on load
					// 	return Adventures.getCamp();
					// },
					// hiking: function(Adventures) {  //<--this will load points on load
					// 	return Adventures.getHike();
					// }
				}
      });
  });
