/*
 * grunt-autoshot
 * https://github.com//grunt-autoshot
 *
 * Copyright (c) 2013 Ferrari Lee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var phantom = require('node-phantom-simple');
  var st = require('st');
  var http = require('http');
  var async = require('async');

  grunt.registerMultiTask('autoshot', 'Create a quick screenshot for your site which could help for document or testing.', function() {
    var done = this.async();
    var options = this.options({
      path: __dirname + '/screenshot',
      type: 'jpg',
      name: 'screenshot',
      viewport: ['1920x1080']
    });

    // Core screenshot function using phamtonJS
    var screenshot = function(opts, cb) {
      var viewport = opts.viewport;
      var url = opts.url;
      var filename = opts.filename;
      var type = opts.type;
      var path = opts.path;

      phantom.create(function(err, ph) {
        ph.createPage(function(err, page) {
          if (viewport) {
            var sets = viewport.match(/(\d+)x(\d+)/);
            if (sets[1] && sets[2]) {
              page.set('viewportSize', {
                width: sets[1],
                height: sets[2]
              });
            }
          }
          page.set('zoomFactor', 1);
          page.open(url, function(err, status) {
            var dest = filename + '.' + type;

            // Background problem under self-host server
            page.evaluate(function() {
              var style = document.createElement('style');
              var text = document.createTextNode('body { background: #fff }');
              style.setAttribute('type', 'text/css');
              style.appendChild(text);
              document.head.insertBefore(style, document.head.firstChild);
            });

            page.render(path + '/' + dest, function() {
              grunt.log.writeln('Take a screenshot to ' + dest);
              ph.exit();
              cb();
            });
          });
        });
      });
    };

    // At least local or remote url should be assigned
    if (!options.remote && !options.local) {
      grunt.fail.fatal('At least need one either remote or local url');
    }

    var hasRemote = false;
    if (options.remote) {
      hasRemote = true;
      async.eachSeries(options.viewport, function(item, cb) {
        screenshot({
          path: options.path,
          filename: 'remote-' + options.filename + '-' + item,
          type: options.type,
          url: options.remote,
          viewport: item
        }, function() {
          cb();
        });
      }, function() {
        grunt.event.emit('finish', 'remote');
      });
    }

    var hasLocal = false;
    if (options.local) {
      hasLocal = true;
      http.createServer(
        st({
          path: options.local.path,
          index: 'index.html'
        })
      ).listen(options.local.port, function() {
        async.eachSeries(options.viewport, function(item, cb) {
          screenshot({
            path: options.path,
            filename: 'local-' + options.filename + '-' + item,
            type: options.type,
            url: 'http://localhost:' + options.local.port,
            viewport: item
          }, function() {
            cb();
          });
        }, function() {
          grunt.event.emit('finish', 'local');
        });
      });
    }

    // Listen event to decide when can stop the task 
    grunt.event.on('finish', function(eventType) {
      if (eventType === 'remote') {
        hasRemote = false;
      }
      if (eventType === 'local') {
        hasLocal = false;
      }
      if (!hasRemote && !hasLocal) {
        done();
      }
    });
  });
};
