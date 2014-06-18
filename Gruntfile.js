/*
 * grunt-autoshot
 * https://github.com//grunt-autoshot
 *
 * Copyright (c) 2013 Ferrari Lee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    autoshot: {
      default_options: {
        options: {
          path: './test/screenshot',
          remote: {
            files: [
              { src: "http://getbootstrap.com", dest: "bootstrap.png" },
              { src: "http://www.google.com", dest: "google.jpg", delay: "3000" }
            ]
          },
          local: {
            path: './test/src',
            port: 7788,
            files: [
              { src: "index.html", dest: "screenshot.jpg" },
              { src: "ajax.html", dest: "ajax.jpg", delay: "5000" }
            ]
          },
          viewport: [
            '1920x1080',
            '1024x768',
            '640x960'
          ]
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'autoshot', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
