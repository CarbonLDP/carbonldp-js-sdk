/// <reference path="../../typings/jasmine/jasmine.d.ts" />
import Exception from './Exception';
import * as Utils from './../Utils';

describe( 'Exception', function () {
	it( 'is defined', function () {
		expect( Exception.Class ).toBeDefined();
		expect( Exception.Class ).not.toBeNull();
		expect( Utils.isFunction( Exception.Class ) ).toBe( true );
		expect( new Exception.Class( "" ) instanceof Error ).toBe( true );
		expect( new Exception.Class( "" ).name ).toBe( 'Exception' );
	} );
} );