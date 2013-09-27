// Karma configuration
module.exports = function (config) {
  'use strict';

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/angular-google-staticmaps.js',
      'test/spec/**/*.coffee'
    ],
    exclude: [],
    reporters: ['dots'],
    autoWatch: false,
    browsers: ['Chrome'],
    captureTimeout: 5000,
    singleRun: true,
    reportSlowerThan: 100
  });
};
