import { TransientDirectContainer } from "../LDP/DirectContainer/TransientDirectContainer";

import { Pointer } from "../Pointer/Pointer";

import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { C } from "../Vocabularies/C";

import { BaseAccessPoint } from "./BaseAccessPoint";
import { TransientAccessPoint } from "./TransientAccessPoint";


describe( module( "carbonldp/AccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientAccessPoint",
		"Interface that represents the document of an in-memory access point."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.TransientDirectContainer" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"Pointer that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"Pointer that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"CarbonLDP.Pointer",
			"Pointer that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientAccessPointFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.TransientAccessPointFactory` object."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.C.AccessPoint"
		), ():void => {} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided is considered a `CarbonLDP.TransientAccessPoint` object", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.TransientAccessPoint" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TransientAccessPoint.is ).toBeDefined();
				expect( TransientAccessPoint.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDirectContainer:jasmine.Spy;
			beforeEach( ():void => {
				isTransientDirectContainer = spyOn( TransientDirectContainer, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientDirectContainer", () => {
				TransientAccessPoint.is( { the: "object" } );
				expect( isTransientDirectContainer ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = TransientAccessPoint.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a `CarbonLDP.TransientAccessPoint` object with the parameters specified.", [
				{ name: "data", type: "T & CarbonLDP.BaseAccessPoint", description: "Data necessary to create an access point." },
			],
			{ type: "CarbonLDP.TransientAccessPoint" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.TransientAccessPoint` object from the object and parameters specified.", [
				{ name: "object", type: "T & CarbonLDP.BaseAccessPoint", description: "Object that will be converted into an AccessPoint." },
			],
			{ type: "T & CarbonLDP.TransientAccessPoint" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientAccessPoint",
		"CarbonLDP.TransientAccessPointFactory",
		"Constant that implements the `CarbonLDP.TransientAccessPointFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( TransientAccessPoint ).toBeDefined();
			expect( TransientAccessPoint ).toEqual( jasmine.any( Object ) );
		} );

		describe( "TransientAccessPoint.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( TransientAccessPoint.TYPE ).toBeDefined();
				expect( TransientAccessPoint.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be c:AccessPoint", ():void => {
				expect( TransientAccessPoint.TYPE ).toBe( C.AccessPoint );
			} );

		} );

		describe( "TransientAccessPoint.create", ():void => {

			it( "should exists", ():void => {
				expect( TransientAccessPoint.create ).toBeDefined();
				expect( TransientAccessPoint.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientAccessPoint.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientAccessPoint, "createFrom" );

				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				TransientAccessPoint.create( base );

				expect( spy ).toHaveBeenCalledWith( base );
			} );

			it( "should return different reference", ():void => {
				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientAccessPoint = TransientAccessPoint.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( "TransientAccessPoint.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientAccessPoint.createFrom ).toBeDefined();
				expect( TransientAccessPoint.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientDirectContainer.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientDirectContainer, "createFrom" )
					.and.callThrough();

				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				TransientAccessPoint.createFrom( base );

				expect( spy ).toHaveBeenCalledWith( base );
			} );

			it( "should return the same reference", ():void => {
				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientAccessPoint = TransientAccessPoint.createFrom( base );

				expect( base ).toBe( returned );
			} );


			it( "should add c:AccessPoint type", () => {
				const returned:TransientAccessPoint = TransientAccessPoint.createFrom( {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( returned.types ).toContain( C.AccessPoint );
			} );

		} );

	} );

} );
