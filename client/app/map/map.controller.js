'use strict';

angular.module('routedApp')
  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi, Adventures, userCenter) {
// MAP STUFF
		$scope.map = {
			center: userCenter,
			zoom: 10,
			user: {
				id: 'user',
				coords: {
					latitude: userCenter.latitude,
					longitude: userCenter.longitude
				},
				icon: {
					url: '/assets/images/user-marker.png'
				},
				title: userCenter.latitude.toFixed(6) + ', ' + userCenter.longitude.toFixed(6),
				show: false,
				closeClick: function() {
					this.show = false;
				},
				options: {} // define when map is ready
			},
			adventures: {
				markers: [],  // array of models to display
				title: userCenter.latitude.toFixed(6) + ', ' + userCenter.longitude.toFixed(6),
				show: false,
				closeClick: function() {
					this.show = false;
				},
				options: {} // define when map is ready
			},
			options: {
				draggable: true,
				scrollwheel: false,
				bounds: {},
				cluster: {
					maxZoom: 14
				},
				showWeather: true,
				weatherOptions: {
					temperatureUnits: 'TemperatureUnit.FAHRENHEIT'
				},
				disableDefaultUI: true,
				// typeId: google.maps.MapTypeId.TERRAIN,
				zoomControl: true,
				zoomControlOptions: {
					style: 'SMALL'
				}
			},
			// markersEvents: {
			// 	click: function(marker, eventName, model, arguments) {
			// 		$scope.map.window.model = model;
			// 		$scope.map.window.show = true;
			// 	}
			// },
			window: {
				marker: {},
				show: false,
				closeClick: function() {
					this.show = false;
				},
				options: {} // define when map is ready
			}
		};

// USER
		$scope.$watch(function() {
			return $scope.map.bounds;
		}, function() {
			$scope.adventures = $scope.adventures;
		}, true);

// MARKERS
		$scope.adventures = [
			{
				'title': 'Camping',
				'selected': false
			},
			{
				'title': 'Climbing',
				'selected': false
			},
			{
				'title': 'Hiking',
				'selected': false
			}
		];
		$scope.selection = [];
		$scope.selectedAdventures = function selectedAdventures() {
			return filterFilter($scope.adventures, { selected: true });
		};
		$scope.$watch('adventures|filter:{selected:true}', function (nv) {
			$scope.selection = nv.map(function (adventure) {
				console.log(adventure.title);
				return adventure.title;
				if (adventure.title === 'Camping') {
					return Adventures.getCamp();
					$scope.selection = 
					console.log(Adventures.getCamp());
				} else if (adventure.title === 'Climbing') {
					return Adventures.getClimb();
					console.log(Adventures.getClimb());
				} else if (adventure.title === 'Hiking') {
					return Adventures.getHike();
				}; 
			});
		}, true);
		
		// $scope.markerTitle = $scope.adventures.name;
		
		// $scope.$on('updateMarkers', function() {
		//   var selection = Adventures.getSelection();
		//   switch(selection) {
		// 		case 'climbing':
		// 			$scope.adventures = climb;
		// 			// $scope.title = climb.name;
		// 			console.log($scope.adventures);
		// 			break;
		//     case 'camping':
		//       $scope.adventures = sites;
		//       // $scope.title = sites.name;
		//       // console.log($scope.adventures);
		//       break;
		//     case 'hiking':
		//       $scope.adventures = trails;
		//       console.log($scope.adventures);
		//       break;
		//     default:
		//       $scope.adventures = climb;
		//       console.log($scope.adventures);
		//       break;
		//   };
		// });
	});
