import { anyThatMatches } from "../../../test/helpers/jasmine-equalities";
import { TransientFragment } from "../../Fragment";
import { Pointer } from "../../Pointer";
import { TransientResource } from "../../Resource";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../../test/JasmineExtender";
import { CS } from "../../Vocabularies";
import { BaseACE } from "./BaseACE";

import { TransientACE } from "./TransientACE";


describe( module( "carbonldp/Auth/ACE" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.TransientACE",
		"Interface that represents an Access Control Entry (ACE) of an Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {
			const target:TransientFragment = {} as TransientACE;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"permissions",
			"CarbonLDP.Pointer[]",
			"An array with all the permissions to grant or deny."
		), ():void => {
			const target:TransientACE[ "permissions" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"subject",
			"CarbonLDP.Pointer",
			"The subject to grant the specified permissions."
		), ():void => {
			const target:TransientACE[ "subject" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.TransientACEFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.Auth.TransientACE` objects."
	), ():void => {

		describe( property(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.AccessControlEntry"
		), ():void => {

			it( "should exists", ():void => {
				expect( TransientACE.TYPE ).toBeDefined();
				expect( TransientACE.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:AccessControlEntry", () => {
				expect( TransientACE.TYPE ).toBe( CS.AccessControlEntry );
			} );

		} );


		describe( method( OBLIGATORY, "create" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a `CarbonLDP.Auth.TransientACE` object with the parameters specified.", [
					{ name: "data", type: "T & CarbonLDP.Auth.BaseACE", description: "Data for creation an access control entry." },
				],
				{ type: "CarbonLDP.Auth.TransientACE" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TransientACE.create ).toBeDefined();
				expect( TransientACE.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a resource", () => {
				const returned:TransientResource = TransientACE.create( {
					subject: Pointer.create( { id: "subject/" } ),
					permissions: [ Pointer.create( { id: "Permission" } ) ],
				} );

				expect( returned ).toEqual( anyThatMatches( TransientResource.is, "isResource" ) as any );
			} );

			it( "should add cs:AccessControlEntry type", () => {
				const returned:TransientResource = TransientACE.create( {
					subject: Pointer.create( { id: "subject/" } ),
					permissions: [ Pointer.create( { id: "Permission" } ) ],
				} );

				expect( returned.types ).toContain( CS.AccessControlEntry );
			} );


			it( "should return different object reference", () => {
				const base:BaseACE = {
					subject: Pointer.create( { id: "subject/" } ),
					permissions: [ Pointer.create( { id: "Permission" } ) ],
				};

				const returned:TransientACE = TransientACE.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( method( OBLIGATORY, "createFrom" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a `CarbonLDP.Auth.TransientACE` object with the parameters specified.", [
					{ name: "object", type: "T & CarbonLDP.Auth.BaseACE", description: "The object that will be converted into a `CarbonLDP.Auth.TransientACE`" },
				],
				{ type: "T & CarbonLDP.Auth.TransientACE" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TransientACE.createFrom ).toBeDefined();
				expect( TransientACE.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a resource", () => {
				const returned:TransientResource = TransientACE.createFrom( {
					subject: Pointer.create( { id: "subject/" } ),
					permissions: [ Pointer.create( { id: "Permission" } ) ],
				} );

				expect( returned ).toEqual( anyThatMatches( TransientResource.is, "isResource" ) as any );
			} );

			it( "should add cs:AccessControlEntry type", () => {
				const returned:TransientResource = TransientACE.createFrom( {
					subject: Pointer.create( { id: "subject/" } ),
					permissions: [ Pointer.create( { id: "Permission" } ) ],
				} );

				expect( returned.types ).toContain( CS.AccessControlEntry );
			} );


			it( "should return same object reference", () => {
				const base:BaseACE = {
					subject: Pointer.create( { id: "subject/" } ),
					permissions: [ Pointer.create( { id: "Permission" } ) ],
				};

				const returned:TransientACE = TransientACE.createFrom( base );

				expect( base ).toBe( returned );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"TransientACE",
		"CarbonLDP.Auth.TransientACEFactory",
		"Constant that implements the `CarbonLDP.Auth.TransientACEFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( TransientACE ).toBeDefined();
			expect( TransientACE ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
