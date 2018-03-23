import {
	enumeration,
	hasEnumeral,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as MethodModule from "./HTTPMethod";

describe( module(
	"carbonldp/HTTP/HTTPMethod"
), ():void => {

	it( isDefined(), ():void => {
		expect( MethodModule ).toBeDefined();
		expect( MethodModule ).toEqual( jasmine.any( Object ) );
	} );

	describe( enumeration(
		"CarbonLDP.HTTP.HTTPMethod",
		"Enum with the HTTP/1.1 methods."
	), ():void => {

		it( isDefined(), ():void => {
			expect( MethodModule.HTTPMethod ).toBeDefined();
			expect( Utils.isObject( MethodModule.HTTPMethod ) ).toBe( true );
		} );

		it( hasEnumeral(
			"OPTIONS",
			"Enum that identifies the OPTIONS HTTP/1.1 method, which allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval."
		), ():void => {
			expect( MethodModule.HTTPMethod.OPTIONS ).toBeDefined();
		} );

		it( hasEnumeral(
			"HEAD",
			"Enum that identifies the HEAD HTTP/1.1 method, which returns only the headers of a GET HTTP request."
		), ():void => {
			expect( MethodModule.HTTPMethod.HEAD ).toBeDefined();
		} );

		it( hasEnumeral(
			"GET",
			"Enum that identifies the GET HTTP/1.1 method, which returns whatever information is identified by the request URI."
		), ():void => {
			expect( MethodModule.HTTPMethod.GET ).toBeDefined();
		} );

		it( hasEnumeral(
			"POST",
			"Enum that identifies the POST HTTP/1.1 method, which requests to the server to create a new entity."
		), ():void => {
			expect( MethodModule.HTTPMethod.POST ).toBeDefined();
		} );

		it( hasEnumeral(
			"PUT",
			"Enum that identifies the PUT HTTP/1.1 method, which allows you to replace an entirely entity, or to send a signal to a resource."
		), ():void => {
			expect( MethodModule.HTTPMethod.PUT ).toBeDefined();
		} );

		it( hasEnumeral(
			"PATCH",
			"Enum that identifies the PATCH HTTP/1.1 method, which allows you to update specified fields of an entity."
		), ():void => {
			expect( MethodModule.HTTPMethod.PATCH ).toBeDefined();
		} );

		it( hasEnumeral(
			"DELETE",
			"Enum that identifies the DELETE HTTP/1.1 method, which allows you to request the deletion of a resource identified by the request URI."
		), ():void => {
			expect( MethodModule.HTTPMethod.DELETE ).toBeDefined();
		} );

	} );

} );
