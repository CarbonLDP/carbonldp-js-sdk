import { TransientDocument } from "../../Document";
import { IllegalArgumentError } from "../../Errors";
import { Pointer } from "../../Pointer";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../../test/JasmineExtender";
import { LDP } from "../../Vocabularies";
import { BaseDirectContainer } from "./BaseDirectContainer";
import { TransientDirectContainer } from "./TransientDirectContainer";


describe( module( "carbonldp/LDP/DirectContainer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.TransientDirectContainer",
		"Interface that represents an `ldp:DirectContainer`."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"membershipResource",
			"CarbonLDP.Pointer",
			"Pointer that references the document that the direct container belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMembershipRelation",
			"CarbonLDP.Pointer",
			"Pointer that reference to the property the direct container manages."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.TransientDirectContainerFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.LDP.TransientDirectContainer`"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.C.DirectContainer"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.LDP.TransientDirectContainer` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the parameters specified.", [
				{ name: "data", type: "T & carbonLDP.LDP.BaseDirectContainer", description: "Data for creating a direct container." },
			],
			{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the object provided and the parameters specified.", [
				{ name: "object", type: "T & CarbonLDP.LDP.BaseDirectContainer", description: "Object to be converted into a direct container." },
			],
			{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientDirectContainer",
		"CarbonLDP.LDP.TransientDirectContainerFactory",
		"Constant that implements the `CarbonLDP.LDP.TransientDirectContainerFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( TransientDirectContainer ).toBeDefined();
			expect( TransientDirectContainer ).toEqual( jasmine.any( Object ) );
		} );

		describe( "TransientDirectContainer.TYPE", ():void => {

			it( "should exist", ():void => {
				expect( TransientDirectContainer.TYPE ).toBeDefined();
				expect( TransientDirectContainer.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `ldp:TransientDirectContainer`", ():void => {
				expect( TransientDirectContainer.TYPE ).toBe( LDP.DirectContainer );
			} );

		} );

		// TODO: Separate in different tests
		it( "TransientDirectContainer.is", ():void => {
			expect( TransientDirectContainer.is ).toBeDefined();
			expect( TransientDirectContainer.is ).toEqual( jasmine.any( Function ) );

			let object:any;

			object = {};
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.types = [ LDP.DirectContainer ];
			expect( TransientDirectContainer.is( object ) ).toBe( false );

			object = TransientDocument.create();
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.types.push( LDP.DirectContainer );
			expect( TransientDirectContainer.is( object ) ).toBe( true );
		} );

		describe( "TransientDirectContainer.create", ():void => {

			it( "should exists", ():void => {
				expect( TransientDirectContainer.create ).toBeDefined();
				expect( TransientDirectContainer.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientDirectContainer.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientDirectContainer, "createFrom" );

				const base:BaseDirectContainer = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				TransientDirectContainer.create( base );

				expect( spy ).toHaveBeenCalledWith( base );
			} );

			it( "should return different reference", ():void => {
				const base:BaseDirectContainer = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientDirectContainer = TransientDirectContainer.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( "TransientDirectContainer.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientDirectContainer.createFrom ).toBeDefined();
				expect( TransientDirectContainer.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return same reference", ():void => {
				const base:BaseDirectContainer = {
					membershipResource: Pointer.create( { id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientDirectContainer = TransientDirectContainer.createFrom( base );

				expect( base ).toBe( returned );
			} );

			it( "should return a TransientDirectContainer", ():void => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			} );

			it( "should return maintain hasMemberRelation", ():void => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			} );

			it( "should return maintain isMemberOfRelation", ():void => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
					isMemberOfRelation: "http://example.com/myNamespace#some-inverted-relation",
				} );

				expect( directContainer.isMemberOfRelation as any as string ).toBe( "http://example.com/myNamespace#some-inverted-relation" );
			} );

			it( "should return add type ldp:DirectContainer", ():void => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( directContainer.types ).toContain( LDP.DirectContainer );
			} );

			it( "should throw error if already a direct container", ():void => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( () => TransientDirectContainer.createFrom( directContainer ) ).toThrowError( IllegalArgumentError, "The base object is already a DirectContainer." );
			} );

		} );

	} );

} );
