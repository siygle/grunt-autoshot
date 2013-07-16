/*
 * grunt-autoshot
 * https://github.com//grunt-autoshot
 *
 * Copyright (c) 2013 Ferrari Lee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var phantom = require('phantom');
  var st = require('st');
  var http = require('http');
  //var util = require('util');

  grunt.registerMultiTask('autoshot', 'Create a quick screenshot for your site which could help for document or testing.', function() {
    var done = this.async();
    var options = this.options({
      path: __dirname + '/screenshot',
      type: 'jpg',
      name: 'screenshot'
    });

    var screenshot = function(opts, cb) {
      var viewport = opts.viewport;
      var url = opts.url;
      var filename = opts.filename;
      var type = opts.type;
      var path = opts.path;

      phantom.create(function(ph) {
        ph.createPage(function(page) {
          if (viewport) {
            var sets = viewport.match(/(\d+)x(\d+)/g);
            if (sets[1] && sets[2]) {
              page.viewportSize = {
                width: sets[1],
                height: sets[2]
              };
            }
          }
          page.zoomFactor = 1;
          page.open(url, function() {
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
              page.close();
              ph.exit();
              cb();
            });
          });
        });
      });
    };

    if (options.remote) {
      screenshot({
        path: options.path,
        filename: options.filename,
        type: options.type,
        url: options.remote
      }, function() {
        done();
      });
    } else if (options.local) {
      http.createServer(
        st({
          path: options.local.path,
          index: 'index.html'
        })
      ).listen(options.local.port, function() {
        screenshot({
          path: options.path,
          filename: options.filename,
          type: options.type,
          url: 'http://localhost:' + options.local.port
        }, function() {
          done();
        });
      });

    } else {
      grunt.fail.fatal('At least need one either remote or local url');
    }
  });
};
