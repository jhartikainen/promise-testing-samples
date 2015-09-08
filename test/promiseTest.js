var expect = require('chai').expect;
var sinon = require('sinon');

//This polyfills the native ES6 promise, in case node is older than 0.12
var Promise = require('es6-promise').Promise;

var arnold = require('../src/arnold');

describe('Promises', function() {
	before(function() {
		//this does nothing but just an example
		return Promise.resolve('foo').then(function() {
			console.log("It's showtime");
		});
	});

	it('object comparison', function() {
		var user = { first: 'John', last: 'Matrix' };

		var p = Promise.resolve(user);

		return expect(p).to.become(user);
	});

	it('property comparison', function() {
		var name = 'Kindergarten Cop';
		var movie = { name: name, year: 1990 };

		var p = Promise.resolve(movie);

		return expect(p.then(function(o) { return o.name; })).to.become(name);
	});

	it('multiple promise assertions', function() {
		var msg1 = 'You are not you';
		var msg2 = 'You are me';

		var p1 = Promise.resolve(msg1);
		var p2 = Promise.resolve(msg2);

		return Promise.all([
			expect(p1).to.become(msg1),
			expect(p2).to.become(msg2)
		]);
	});

	it('comparing multiple promises', function() {
		var p1 = Promise.resolve('Get up');
		var p2 = Promise.resolve('Get down');

		return Promise.all([p1, p2]).then(function(values) {
			expect(values[0]).to.not.equal(values[1]);
		});
	});

	describe('rejected promises', function() {
		it('with a message', function() {
			var message = 'Rubber baby buggy bumpers';

			var p = Promise.reject(message);

			return expect(p).to.be.rejectedWith(message);
		});

		it('with a specific error type', function() {
			var p = Promise.reject(new TypeError('Hey, christmas tree!'));

			return expect(p).to.be.rejectedWith(TypeError);
		});
	});

	describe('with stubs', function() {
		it('return a resolved promise', function() {
			var message = 'Who is your daddy, and what does he do?';
			var stub = sinon.stub();
			stub.resolves(message);

			var a = arnold(stub);
			var quote = a.talkToTheHand();

			return expect(quote).to.become(message);
		});

		it('return a rejected promise', function() {
			var message = "I'm the party pooper";
			var stub = sinon.stub();
			stub.rejects(message);

			var a = arnold(stub);
			var quote = a.talkToTheHand();

			return expect(quote).to.be.rejectedWith(message);
		});
	});
});
