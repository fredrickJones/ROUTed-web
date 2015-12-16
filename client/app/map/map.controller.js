'use strict';

angular.module('routedApp')
  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi, /*Adventures, Selection,*/ userCenter) {
// MAP-MARKER STUFF
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
        // mapTypeControlOptions: {
        //   mapTypeIds: [google.maps.MapTypeId.TERRAIN]
        // },
        disableDefaultUI: true,
        // typeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: true,
        zoomControlOptions: {
          style: 'SMALL'
        }
      },
      // markersEvents: {
      //     click: function(marker, eventName, model, arguments) {
      //         $scope.map.window.model = model;
      //         $scope.map.window.show = true;
      //     }
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

    // $scope.markerTitle = $scope.adventures.name;
    // $scope.$on('updateSelection', function() {
    //   var selection = Selection.getSelection();
    //   switch(selection) {
    //     case 'camping':
    //       $scope.adventures = sites;
    //       // $scope.title = sites.name;
    //       // console.log($scope.adventures);
    //       break;
    //     case 'rockClimbing':
    //       $scope.adventures = crags;
    //       // $scope.title = crags.name;
    //       // console.log($scope.adventures);
    //       break;
    //     case 'hiking':
    //       $scope.adventures = trails;
    //       // console.log($scope.adventures);
    //       break;
    //     default:
    //       $scope.adventures = sites;
    //       // console.log($scope.adventures);
    //       break;
    //   };
    // });


// USER STUFF
    // $scope.$watch(function() {
    //   return $scope.map.bounds;
    // }, function() {
    //   $scope.adventures = $scope.adventures;
    // }, true);
    // $scope.cluster = {
    //   maxZoom: 14
    // };
    // $scope.showWeather = true;
    // $scope.weatherOptions = {
    //   temperatureUnits: 'TemperatureUnit.FAHRENHEIT'
    // };

  });
