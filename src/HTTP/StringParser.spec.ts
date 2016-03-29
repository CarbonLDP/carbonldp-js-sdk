import {
	INSTANCE,
	STATIC,

	module,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasDefaultExport,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

	MethodArgument,
} from "./../test/JasmineExtender";

import * as Errors from "./../Errors";
import * as Utils from "./../Utils";

import * as StringParser from "./StringParser";
import DefaultExport from "./StringParser";

describe( module( "Carbon/HTTP/StringParser" ), ():void => {
	it( isDefined(), ():void => {
		expect( StringParser ).toBeDefined();
		expect( Utils.isObject( StringParser ) ).toEqual( true );
	});

	describe( clazz( "Carbon.HTTP.StringParser.Class", "Parses a Carbon.HTTP.Response.Class and returns a String" ), ():void => {
		it( hasMethod( INSTANCE, "parse", "Gets a string and returns a promise with the same string", [
			{ name: "body", type: "Carbon.HTTP.Response.Class" }
		], { type: "Promise<string>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			let stringParser:StringParser.Class = new StringParser.Class();

			// Property Integrity
			(() => {
				expect( "parse" in stringParser ).toEqual( true );
				expect( Utils.isFunction( stringParser.parse ) ).toEqual( true );
			})();

			let promises:Promise<any>[] = [];

			// Execution
			(() => {
				let body:string = "This is the body";
				let promise:Promise<string> = stringParser.parse( body );

				expect( promise ).toBeDefined();
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ( parsedBody ):void => {
					expect( parsedBody ).toEqual( body );
				}) );
			})();

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});
	});

	it( hasDefaultExport( "Carbon.HTTP.StringParser.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toEqual( StringParser.Class );
	});
});
