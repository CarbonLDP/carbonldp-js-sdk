/// <reference path="../../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	constructor,

	isDefined,
	hasConstructor,
	hasProperty,
	hasMethod,
	hasSignature,
	hasDefaultExport
} from "./../test/JasmineExtender";
import * as Utils from "../Utils";

import * as Header from "./Header";
import DefaultExport from "./Header";

describe( module(
	"Carbon/HTTP/Header"
), ():void => {

	it( isDefined(), ():void => {
		expect( Header ).toBeDefined();
		expect( Utils.isObject( Header ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.HTTP.Header.Value",
		"Class wrapper for a string value of a HTTP header"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Header.Value ).toBeDefined();
			expect( Utils.isFunction( Header.Value ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "value", type: "string" }
		]), ():void => {
			let value: Header.Value = new Header.Value( "a value" );

			expect( value ).toBeTruthy();
			expect( value instanceof Header.Value ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let value: Header.Value = new Header.Value( "a value" );

			expect( value.toString ).toBeDefined();
			expect( Utils.isFunction( value.toString ) ).toBe( true );

			expect( value.toString() ).toBe( "a value" );
		});

	});

	describe( clazz(
		"Carbon.HTTP.Header.Class",
		"Class for have better management of the values in a HTTP header"
	), ():void => {

		// Mock data
		let valuesArray:Header.Value[] = [
			new Header.Value("a_value"),
			new Header.Value("another_value"),
			new Header.Value("last_value")
		];
		let valuesString:string = "a_value, another_value, last_value";

		it( isDefined(), ():void => {
			expect( Header.Class ).toBeDefined();
			expect( Utils.isFunction( Header.Class ) ).toBe( true );
		});

		describe( constructor(), ():void => {

			it( hasSignature([
				{ name: "values", type: "Array <Carbon.HTTP.Header.Value>" }
			]), ():void => {
				let header: Header.Class = new Header.Class( valuesArray );

				expect( header ).toBeTruthy();
				expect( header instanceof Header.Class ).toBe( true );
			});

			it( hasSignature([
				{name: "value", type: "string" }
			]), ():void => {
				let header: Header.Class = new Header.Class( valuesString );

				expect( header ).toBeTruthy();
				expect( header instanceof Header.Class ).toBe( true );
			});

		});

		it( hasMethod(
			INSTANCE,
			"toString",
			"string"
		), ():void => {
			let header: Header.Class = new Header.Class( valuesArray );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( valuesString );

			header = new Header.Class( valuesString );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( valuesString );

			header = new Header.Class( "" );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( "" );

			header = new Header.Class( [] );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( "" );
		});

		it( hasProperty(
			INSTANCE,
			"values",
			"Array <Carbon.HTTP.Header.Value>",
			"Array that contains each value of the header"
		), ():void => {
			let header: Header.Class = new Header.Class( valuesArray );

			expect( header.values ).toBeDefined();
			expect( Utils.isArray( header.values ) ).toBe( true );

			expect( header.values ).toEqual( valuesArray );
		});

	});

	describe( clazz(
		"Carbon.HTTP.Header.Util",
		"Class with useful options for manage headers"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Header.Util ).toBeDefined();
			expect( Utils.isFunction( Header.Util ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"parseHeaders",
			"Returns an Map object, witch relates the all header-names with a `Carbon.HTTP.Header.Class` containing their values", [
				{ name: "headersString", type: "string" }
			],
			{ type: "Map <string, Carbon.HTTP.Header.Class>" }
		), ():void => {
			expect( Header.Util.parseHeaders ).toBeDefined();
			expect( Utils.isFunction( Header.Util.parseHeaders ) ).toBe( true );

			let headersString = `
				Host: http://example.com
				User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)
				Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
				Cache-Control: no-cache
			`;
			let headersMap: Map<string, Header.Class> =  Header.Util.parseHeaders( headersString );

			expect( Utils.isMap( headersMap ) ).toBe( true );
			expect( headersMap.size ).toBe( 4 );
			expect( headersMap.get( "Host" ).toString() ).toEqual( "http://example.com" );
			expect( headersMap.get( "User-Agent" ).toString() ).toBe( "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)" );
			expect( headersMap.get( "Cache-Control").toString() ).toBe( "no-cache" );
			expect( headersMap.get( "Accept" ) ).toEqual(  new Header.Class("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") );
		});
	});

	it( hasDefaultExport(
		"Carbon.HTTP.Header.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Header.Class );
	});

});
