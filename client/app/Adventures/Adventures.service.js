'use strict';

angular.module('routedApp')
	.service('Adventures', function($q, $http, Coordinates) {
		// AngularJS will instantiate a singleton by calling "new" on this function

// SELECTION
		var selection = '';
		this.setSelection = function(str) {
			selection = str;
			$rootScope.$broadcast('adventures');
		};
		this.getSelection = function() {
			return selection;
		};

// CLIMBING
		this.addClimb = function(rockData) {
			console.log(rockData);
			$http.post('/api/rock-climbing', rockData);
		};
		this.getClimb = function() {
			var markers = [];
			var deferred = $q.defer();
			Coordinates.getCoords().then(function(coords) {
				console.log(coords);
				$http.get('/api/rock-climbing?lat=' + coords.lat + '&lon=' + coords.lon)
				.then(function(resp) {
					console.log("Response" + resp);
					markers = [];
					var markerData = resp.data;
					function NewMarker(name, lat, lon, difficult, id, url) {
						this.name = name;
						this.id = id;
						this.coords = {
							latitude: lat,
							longitude: lon
						};
						this.difficult = difficult;
						this.url = url;
					};
					var url = '../assets/images/climb-marker.png';
					for (var i = 0; i < markerData.length; i++) {
						var climbMarker = new NewMarker(
							markerData[i].name,
							markerData[i].loc[1],
							markerData[i].loc[0],
							markerData[i].difficult,
							i,
							url
						);
						markers.push(climbMarker);
					};
					console.log("Markers" + markers);
					deferred.resolve(markers);
				}).catch(function(err) {
					deferred.reject(err);
				});
			});
			return deferred.promise;
		};

// HICKING
		this.addHike = function(hikeData) {
			// console.log(hikeData);
			$http.post('/api/hiking', hikeData);
		};
		this.getHike = function() {
			var currentMarkers = [];
			var deferred = $q.defer();
			Coordinates.getCoords().then(function(coords) {
				// console.log(coords);
				$http.get('/api/hiking?lon=' + coords.lon + '&lat=' + coords.lat).then(function(resp) {
					// console.log(resp);
					currentMarkers = [];
					var markerData = resp.data;
					function NewMarker(name, lat, lon, length, id, url) {
						this.name = name;
						this.id = id;
						this.coords = {
							latitude: lat,
							longitude: lon
						};
						this.length = length;
						this.url = url;
					};
					var url = '../assets/images/hike-marker.png';
					for (var i = 0; i < markerData.length; i++) {
						var campMarkers = new NewMarker(
							markerData[i].name,
							markerData[i].loc[1],
							markerData[i].loc[0],
							markerData[i].length,
							i,
							url
						);
						currentMarkers.push(campMarkers);
					};
					// console.log(currentMarkers);
					deferred.resolve(currentMarkers);
				}).catch(function(err) {
					deferred.reject(err);
				});
			});
			return deferred.promise;
		};

// CAMPING
		this.addSite = function(siteData) {
			// console.log(siteData);
			$http.post('/api/camping', siteData);
		};
		this.getCamp = function() {
			var currentMarkers = [];
			var deferred = $q.defer();
			Coordinates.getCoords().then(function(coords) {
				// console.log(coords);
				$http.get('/api/camping?lon=' + coords.lon + '&lat=' + coords.lat).then(function(resp) {
					// console.log(resp);
					currentMarkers = [];
					var markerData = resp.data;
					function NewMarker(name, lat, lon, price, id, url) {
						this.name = name;
						this.id = id;
						this.coords = {
							latitude: lat,
							longitude: lon
						};
						this.price = price;
						this.url = url;
					};
					var url = '../assets/images/site-marker.png';
					for (var i = 0; i < markerData.length; i++) {
						var siteMarker = new NewMarker(
							markerData[i].name,
							markerData[i].loc[1],
							markerData[i].loc[0],
							markerData[i].price,
							i,
							url
						);
						currentMarkers.push(siteMarker);
					};
					// console.log(currentMarkers);
					deferred.resolve(currentMarkers);
				}).catch(function(err) {
					deferred.reject(err);
				});
			});
			return deferred.promise;
		};
	});
