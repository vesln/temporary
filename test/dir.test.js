/**
 * Temporary - The lord of tmp.
 *
 * Author: Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License.
 */

/**
 * Dependencies.
 */
var fs = require('fs');
var path = require('path');
var existsSync = fs.existsSync || path.existsSync;

var Tempdir = require('../lib/dir');
var sinon = require('sinon');

require('chai').should();

describe('Tempdir', function() {
  it('should create file', function() {
    var tmp = new Tempdir('foo');
    existsSync(tmp.path).should.be.ok;
  });

  it('should use the directory name as the path when generator option equals false', function () {
    var tmp = new Tempdir('foo', {
      generator: false
    });

    existsSync(tmp.path).should.be.ok;

    (tmp.path).should.be.equal('foo');
    tmp.rmdirSync();
  });

  it('should use the custom generator if supplied', function() {
    var spy = sinon.spy(function(name) { return name; });

    var tmp = new Tempdir('foo', {
      generator: spy
    });

    (spy.called).should.be.ok;
    tmp.rmdirSync();
  });

  describe('rmdir', function() {
    it('should remove the directory', function() {
      var tmp = new Tempdir('foo');
      sinon.spy(fs, 'rmdir');
      tmp.rmdir(function(){});
      fs.rmdir.getCall(0).args[0].should.eql(tmp.path);
      fs.rmdir.restore();
    });
  });

  describe('rmdirSync', function() {
    it('should remove the directory', function() {
      var tmp = new Tempdir('foo');
      sinon.spy(fs, 'rmdirSync');
      tmp.rmdirSync();
      fs.rmdirSync.getCall(0).args[0].should.eql(tmp.path);
      fs.rmdirSync.restore();
    });
  });
});
