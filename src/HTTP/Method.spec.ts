import {
	module,
	enumeration,

	isDefined,
	hasEnumeral,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as MethodModule from "./Method";
import DefaultExport from "./Method";

describe( module(
	"Carbon/HTTP/Method"
), ():void => {

	it( isDefined(), ():void => {
		expect( MethodModule ).toBeDefined();
		expect( MethodModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( enumeration(
		"Carbon.HTTP.MethodModule.Method",
		"Enum with the HTTP/1.1 methods."
	), ():void => {

		it( isDefined(), ():void => {
			expect( MethodModule.Method ).toBeDefined();
			expect( Utils.isObject( MethodModule.Method ) ).toBe( true );
		} );

		it( hasEnumeral(
			"OPTIONS",
			"Enum that identifies the OPTIONS HTTP/1.1 method, which allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval."
		), ():void => {
			expect( MethodModule.Method.OPTIONS ).toBeDefined();
		} );

		it( hasEnumeral(
			"HEAD",
			"Enum that identifies the HEAD HTTP/1.1 method, which returns only the headers of a GET HTTP request."
		), ():void => {
			expect( MethodModule.Method.HEAD ).toBeDefined();
		} );

		it( hasEnumeral(
			"GET",
			"Enum that identifies the GET HTTP/1.1 method, which returns whatever information is identified by the request URI."
		), ():void => {
			expect( MethodModule.Method.GET ).toBeDefined();
		} );

		it( hasEnumeral(
			"POST",
			"Enum that identifies the POST HTTP/1.1 method, which requests to the server to create a new entity."
		), ():void => {
			expect( MethodModule.Method.POST ).toBeDefined();
		} );

		it( hasEnumeral(
			"PUT",
			"Enum that identifies the PUT HTTP/1.1 method, which allows you to replace an entirely entity, or to send a signal to a resource."
		), ():void => {
			expect( MethodModule.Method.PUT ).toBeDefined();
		} );

		it( hasEnumeral(
			"PATCH",
			"Enum that identifies the PATCH HTTP/1.1 method, which allows you to update specified fields of an entity."
		), ():void => {
			expect( MethodModule.Method.PATCH ).toBeDefined();
		} );

		it( hasEnumeral(
			"DELETE",
			"Enum that identifies the DELETE HTTP/1.1 method, which allows you to request the deletion of a resource identified by the request URI."
		), ():void => {
			expect( MethodModule.Method.DELETE ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.Method.Method" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( MethodModule.Method );
	} );

} );
