/*!
 * angular-google-staticmaps 0.0.1
 * Pascal Hartig, weluse GmbH, http://weluse.de/
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('wu.staticGmap', [])
    .controller('StaticGmapCtrl', function () {
      var BASE_URL = '//maps.googleapis.com/maps/api/staticmap?';
      var STYLE_ATTRIBUTES = ['color', 'label', 'size'];

      this.makeMarkerStrings = function makeMarkerStrings(markers) {
        return markers.map(function (marker) {
          var str = Object.keys(marker).map(function (key) {
            if (STYLE_ATTRIBUTES.indexOf(key) > -1) {
              return key + ':' + marker[key] + '|';
            }
          }).join('');

          return str + marker.coords.join(',');
        });
      };

      this.buildSourceString = function buildSourceString(attrs, markers) {
        var markerStrings;

        if (markers) {
          if (!angular.isArray(markers)) {
            markers = [markers];
          }
          markerStrings = this.makeMarkerStrings(markers);
        }

        var params = Object.keys(attrs).map(function (attr) {
          if (attr === 'markers' && markerStrings) {
            return Object.keys(markerStrings).map(function (key) {
              return 'markers=' + encodeURIComponent(markerStrings[key]);
            }).join('&');
          }

          if (attr[0] !== '$' && attr !== 'alt') {
            return encodeURIComponent(attr) + '=' + encodeURIComponent(attrs[attr]);
          }
        });

        return BASE_URL + params.reduce(function (a, b) {
          if (!a) {
            return b;
          }

          if (b !== undefined) {
            return a + '&' + b;
          }

          return a;
        }, '');
      };
    })
    .directive('staticGmap', function ($parse) {
      return {
        template: '<img alt="Google Map">',
        replace: true,
        restrict: 'E',
        controller: 'StaticGmapCtrl',
        scope: true,

        link: function postLink(scope, element, attrs, ctrl) {
          var el = element[0];
          var markers = $parse(attrs.markers)(scope);

          if (!attrs.sensor) {
            throw new Error('The `sensor` attribute is required.');
          }

          if (!attrs.size) {
            throw new Error('The `size` attribute is required.');
          }

          var sizeBits = attrs.size.split('x');
          if (sizeBits.length !== 2) {
            throw new Error('Size must be specified as `wxh`.');
          }

          el.width = parseInt(sizeBits[0], 10);
          el.height = parseInt(sizeBits[1], 10);
          el.src = ctrl.buildSourceString(attrs, markers);
        }
      };
    });
}());
