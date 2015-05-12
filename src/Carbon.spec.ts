/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/jasmine-ajax/mock-ajax.d.ts" />
import Carbon from './Carbon';
describe( 'Carbon', function () {
	it( 'is defined', function () {
		expect( Carbon ).toBeDefined();
	} );
	it( 'has module Apps', function () {
		expect( Carbon.Apps ).toBeDefined();
	} );
} );