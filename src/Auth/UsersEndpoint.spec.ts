import { ProtectedDocument } from "../ProtectedDocument";
import {
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { UsersEndpoint } from "./UsersEndpoint";


describe( module( "carbonldp/Auth/UsersEndpoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.UsersEndpoint",
		"Endpoint for manage the users of a Carbon LDP instance."
	), ():void => {
	} );

	describe( interfaze(
		"CarbonLDP.Auth.UsersEndpointFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Auth.UsersEndpoint` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object is a `CarbonLDP.Auth.UsersEndpoint` object.",
			[
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Auth.UsersEndpoint" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Auth.UsersEndpoint` object.",
			[
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & CarbonLDP.Auth.UsersEndpoint" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"UsersEndpoint",
		"CarbonLDP.AuthUsersEndpointFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsersEndpoint ).toBeDefined();
			expect( UsersEndpoint ).toEqual( jasmine.any( Object ) );
		} );

		describe( "UsersEndpoint.is", ():void => {

			it( "should exists", ():void => {
				expect( UsersEndpoint.is ).toBeDefined();
				expect( UsersEndpoint.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call ProtectedDocument.is", ():void => {
				const spy:jasmine.Spy = spyOn( ProtectedDocument, "is" )
					.and.returnValue( false );

				const value:any = { the: "object" };
				UsersEndpoint.is( value );

				expect( spy ).toHaveBeenCalledWith( value );
			} );

			it( "should return true if all dependencies are true", ():void => {
				spyOn( ProtectedDocument, "is" )
					.and.returnValue( true );

				const returned:boolean = UsersEndpoint.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "UsersEndpoint.decorate", ():void => {

			it( "should exists", ():void => {
				expect( UsersEndpoint.decorate ).toBeDefined();
				expect( UsersEndpoint.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call ProtectedDocument.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( ProtectedDocument, "decorate" )
					.and.callThrough();

				const object:{} = { the: "object" };
				UsersEndpoint.decorate( object, null );

				expect( spy ).toHaveBeenCalledWith( object, null );
			} );

			it( "should return object provided", ():void => {
				const object:{} = { the: "object" };

				const returned:{} = UsersEndpoint.decorate( object, null );

				expect( returned ).toBe( object );
			} );

		} );

	} );

} );
