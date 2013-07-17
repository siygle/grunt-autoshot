'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.autoshot = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/screenshot/remote-screenshot-1920x1080.jpg');
    var expected = grunt.file.read('test/expected/screenshot.jpg');
    test.equal(actual, expected, 'should generate screenshot of sample site');

    test.done();
  },
};
