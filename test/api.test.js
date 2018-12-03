var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var HomeModel = require('../server/models/home');

describe('testing POST method in app.js', function() {
    it('should return all entries', function(done) {
        var HomeMock = sinon.mock(HomeModel);
        var expectedResult = {status: true, data: []};
        HomeMock.expects('find').yields(null, expectedResult);
        HomeModel.find(function(err, result) {
            HomeMock.verify();
            HomeMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
})