/// <reference path="../typings/jasmine/jasmine.d.ts" />
import Carbon = require('./Carbon');
describe( 'Carbon', function () {
	it( 'is defined', function () {
		expect( Carbon ).toBeDefined();
		expect( Carbon.REST ).toBeDefined();
	} );
} );