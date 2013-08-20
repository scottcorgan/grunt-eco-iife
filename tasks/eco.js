/*
 * grunt-eco
 * https://github.com/gr2m/grunt-eco
 *
 * Copyright (c) 2012 Gregor Martynus
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path'),
      eco = require('eco');

  var compile = function(src, options) {
    var input = grunt.file.read(src),
        output = '',
        JSTpath = path.dirname(src) + '/' + path.basename(src, '.eco');

    if (input.length < 1) {
      if (options.emptyWarning) {
        grunt.log.warn('Template ' + src.cyan + ' not compiled because file is empty.');
      }

      return false;
    }

    try {
      output = eco.compile(grunt.file.read(src)).replace(/module\.exports/, '');
    } catch (e) {
      grunt.log.error("Error in " + src + ":\n" + e);
      return false;
    }

    output = '(function () {\n' +
    '  var template' + output + '\n' +
    '  module.exports = template;\n' +
    '}());\n';
    }

    return output;
  };


  grunt.registerMultiTask('eco', 'Compile Embedded CoffeeScript Templates', function() {
    var options = this.options({
      amd: false,
      emptyWarning: true,
      jstGlobalCheck: true
    });

    if (options.basePath) {
      grunt.fail.warn('basePath is no longer supported. please refer to README.');
    }

    this.files.forEach(function(file) {
      var destFile = path.normalize(file.dest);
      var srcFiles = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var compiled = [];
      srcFiles.forEach(function(src) {
        var res = compile(src, options);

        if (res) {
          compiled.push(res);
        }
      });

      if (compiled.length) {
        grunt.file.write(destFile, compiled.join(grunt.util.normalizelf(grunt.util.linefeed)));
        grunt.log.writeln('File ' + destFile.cyan + ' created.');
      }
    });

  });

};
