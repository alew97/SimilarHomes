var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var HomeModel = require('../server/models/home');

describe('Schema Validation Testing', function() {
    describe('Required fields must be present', function() {
        it('targetLatitude must be present', function(done) {
            var H = new HomeModel({targetLongitude: -113.203495});
            H.validate(function(err) {
                expect(err.errors.targetLatitude).to.exist;
                done();
            });
        });

        it('targetLongitude must be present', function(done) {
            var H = new HomeModel({targetLatitude: 12.203948});
            H.validate(function(err) {
                expect(err.errors.targetLongitude).to.exist;
                done();
            });
        });

        it('targetLongitude and targetLatitude must be present', function(done) {
            var H = new HomeModel();
            H.validate(function(err) {
                expect(err.errors.targetLongitude).to.exist;
                expect(err.errors.targetLatitude).to.exist;
                done();
            });
        });

        it('success if targetLongitude and targetLatitude are both present', function(done) {
            var H = new HomeModel({targetLongitude: 123, targetLatitude: 123});
            H.validate(function(err) {
                expect(err.errors.targetLongitude).to.not.exist;
                expect(err.errors.targetLongitude).to.not.exist;
                done();
            });
        });
    })
})