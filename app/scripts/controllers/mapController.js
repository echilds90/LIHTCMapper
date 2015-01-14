'use strict';

angular.module('lihtcmapperApp')
  .controller('MapCtrl', ['$scope', 'MapService', function ($scope, mapService) {

    this.address = '';
    $scope.geocodeError = false;

    var DEFAULT_CANVAS = document.getElementById('map-canvas');
    var OAK_CITY_HALL_LAT = 37.8052754;
    var OAK_CITY_HALL_LNG = -122.2725614;
    var DEFAULT_ZOOM = 15;

    this.codeAddress = function (address) {
      mapService.geocode(address, function (status) {
        $scope.geocodeError = !status;
        $scope.$digest();
      });
    };

    this.initialize = function (canvas, lat, lng, zoom) {
      var defaultCenter = { lat: lat, lng: lng };
      mapService.initializeMap(canvas, { center: defaultCenter, zoom: zoom });
    };

    this.initialize(DEFAULT_CANVAS, OAK_CITY_HALL_LAT, OAK_CITY_HALL_LNG, DEFAULT_ZOOM);
  }]);
