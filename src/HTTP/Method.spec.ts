import {
	INSTANCE,
	STATIC,

	module,
	enumeration,

	isDefined,
	hasEnumeral
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import Method from "./Method";

describe( module(
	"Carbon/HTTP/Method"
), ():void => {

	describe( enumeration(
		"Carbon.HTTP.Method",
		"Enum with the HTTP/1.1 methods"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Method ).toBeDefined();
			expect( Utils.isObject( Method ) ).toBe( true );
		});

		it( hasEnumeral(
			"OPTIONS",
			"Enum that identifies the OPTIONS HTTP/1.1 method, which allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

		it( hasEnumeral(
			"HEAD",
			"Enum that identifies the HEAD HTTP/1.1 method, which returns only the headers of a GET HTTP request"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

		it( hasEnumeral(
			"GET",
			"Enum that identifies the GET HTTP/1.1 method, which returns whatever information is identified by the request URI"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

		it( hasEnumeral(
			"POST",
			"Enum that identifies the POST HTTP/1.1 method, which request to the server to create a new entity"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

		it( hasEnumeral(
			"PUT",
			"Enum that identifies the PUT HTTP/1.1 method, which allows to replace an entirely entity, or to send a signal to a resource"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

		it( hasEnumeral(
			"PATCH",
			"Enum that identifies the PATCH HTTP/1.1 method, which allows to update specified fields of an entity"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

		it( hasEnumeral(
			"DELETE",
			"Enum that identifies the DELETE HTTP/1.1 method, which allows to request the deletion of a resource identified by the request URI"
		), ():void => {
			expect( Method.OPTIONS ).toBeDefined();
		});

	});

});