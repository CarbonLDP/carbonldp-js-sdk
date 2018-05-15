import { VolatileResource } from "../LDP";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import {
	CS,
	XSD,
} from "../Vocabularies";

import {
	TokenCredentials,
	TokenCredentialsBase,
} from "./TokenCredentials";

describe( module( "Carbon/Auth/TokenCredentials" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.TokenCredentialsBase",
		"Interface that represents the base properties for an authentication token credentials."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"expiresOn",
			"Date",
			"The time when the token will expire."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"token",
			"string",
			"The value to provide as the authentication token in the headers of a a request."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.TokenCredentialsBaseFactory",
		"Interface with the factory and utils for `CarbonLDP.Auth.TokenCredentialsBase` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.Auth.TokenCredentialsBase` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Auth.TokenCredentialsBase" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TokenCredentialsBase",
		"CarbonLDP.Auth.TokenCredentialsBaseFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( TokenCredentialsBase ).toBeDefined();
			expect( TokenCredentialsBase ).toEqual( jasmine.any( Object ) );
		} );

		describe( "TokenCredentialsBase.is", ():void => {

			it( "should exists", ():void => {
				expect( TokenCredentialsBase.is ).toBeDefined();
				expect( TokenCredentialsBase.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when void", ():void => {
				expect( TokenCredentialsBase.is( void 0 ) ).toBe( false );
			} );

			it( "should return false when null", ():void => {
				expect( TokenCredentialsBase.is( null ) ).toBe( false );
			} );

			describe( "When check properties", ():void => {

				let target:TokenCredentialsBase;
				beforeEach( ():void => {
					target = {
						token: null,
						expires: null,
					};
				} );

				it( "should return true when all properties defined", ():void => {
					const returned:boolean = TokenCredentialsBase.is( target );
					expect( returned ).toBe( true );
				} );

				it( "should fail when no token", ():void => {
					delete target.token;

					const returned:boolean = TokenCredentialsBase.is( target );
					expect( returned ).toBe( false );
				} );

				it( "should fail when no expiresOn", ():void => {
					delete target.expires;

					const returned:boolean = TokenCredentialsBase.is( target );
					expect( returned ).toBe( false );
				} );

			} );

		} );

	} );


	describe( interfaze(
		"CarbonLDP.Auth.TokenCredentials",
		"Interface that represents an authentication token for every context."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"expiresOn",
			"Date",
			"The time when the token will expire."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"token",
			"string",
			"The value to provide as the authentication token in the headers of a a request."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.TokenCredentialsFactory",
		"Interface with the factory and utils for `CarbonLDP.Auth.TokenCredentials` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.Class"
		), ():void => {} );


		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.Auth.TokenCredentials` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Auth.TokenCredentials" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends CarbonLDP.Auth.TokenCredentialsBase" ],
			"Creates a `CarbonLDP.Auth.TokenCredentials` object from the `CarbonLDP.Auth.TokenCredentialsBase` specified.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.Auth.TokenCredentials" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TokenCredentials",
		"CarbonLDP.Auth.TokenCredentialsFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( TokenCredentials ).toBeDefined();
			expect( TokenCredentials ).toEqual( jasmine.any( Object ) );
		} );

		describe( "TokenCredentials.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( TokenCredentials.TYPE ).toBeDefined();
				expect( TokenCredentials.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:TokenCredentials", ():void => {
				expect( TokenCredentials.TYPE ).toBe( CS.TokenCredentials );
			} );

		} );

		describe( "TokenCredentials.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( TokenCredentials.SCHEMA ).toBeDefined();
				expect( TokenCredentials.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have model properties", ():void => {
				expect( TokenCredentials.SCHEMA as {} ).toEqual( {
					token: jasmine.any( Object ),
					expires: jasmine.any( Object ),
				} );
			} );

			it( "should have cs:token", ():void => {
				expect( TokenCredentials.SCHEMA[ "token" ] ).toEqual( {
					"@id": CS.token,
					"@type": XSD.string,
				} );
			} );

			it( "should have cs:expiresOn", ():void => {
				expect( TokenCredentials.SCHEMA[ "expires" ] ).toEqual( {
					"@id": CS.expires,
					"@type": XSD.dateTime,
				} );
			} );

		} );

		describe( "TokenCredentials.is", ():void => {

			it( "should exists", ():void => {
				expect( TokenCredentials.is ).toBeDefined();
				expect( TokenCredentials.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when void", ():void => {
				expect( TokenCredentials.is( void 0 ) ).toBe( false );
			} );

			it( "should return false when null", ():void => {
				expect( TokenCredentials.is( null ) ).toBe( false );
			} );

			it( "should call VolatileResource.is", ():void => {
				const spy:jasmine.Spy = spyOn( VolatileResource, "is" )
					.and.returnValue( false );

				TokenCredentials.is( { the: "object" } );
				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should call self.hasType", ():void => {
				spyOn( VolatileResource, "is" ).and.returnValue( true );

				const spyObj:jasmine.SpyObj<{ hasType:Function }> = jasmine
					.createSpyObj( { hasType: true } );

				TokenCredentials.is( spyObj );
				expect( spyObj.hasType ).toHaveBeenCalledWith( TokenCredentials.TYPE );
			} );

			it( "should return true when all spies true", ():void => {
				spyOn( VolatileResource, "is" ).and.returnValue( true );

				const spyObj:jasmine.SpyObj<{ hasType:Function }> = jasmine
					.createSpyObj( { hasType: true } );

				const returned:boolean = TokenCredentials.is( spyObj );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "TokenCredentials.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TokenCredentials.createFrom ).toBeDefined();
				expect( TokenCredentials.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a volatile resource", ():void => {
				const target:VolatileResource = TokenCredentials.createFrom( {
					token: "token",
					expires: new Date(),
				} );

				expect( VolatileResource.is( target ) ).toBe( true );
			} );

			it( "should add the TokenCredentials.TYPE", ():void => {
				const target:TokenCredentials = TokenCredentials.createFrom( {
					token: "token",
					expires: new Date(),
				} );

				expect( target.types ).toContain( TokenCredentials.TYPE );
			} );

			it( "should convert string date to Date object", ():void => {
				const time:Date = new Date();

				const target:TokenCredentials = TokenCredentials.createFrom( {
					token: "token",
					expires: time.toISOString(),
				} );

				expect( target.expires ).toEqual( time );
			} );

		} );

	} );

} );
