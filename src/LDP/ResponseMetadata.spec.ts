import { TransientResource } from "../TransientResource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import * as Utils from "./../Utils";

import { ResponseMetadata } from "./ResponseMetadata";

describe( module( "carbonldp/LDP/ResponseMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( ResponseMetadata ).toBeDefined();
		expect( Utils.isObject( ResponseMetadata ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.LDP.ResponseMetadata",
		"Interface that represents the main resource of a set of metadata resources, which references everyone resource related to an specific dynamic response of tha server."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.VolatileResource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"documentsMetadata",
			"CarbonLDP.LDP.DocumentMetadata[]",
			"An array with all the metadata resources of the dynamic response."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.ResponseMetadataFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.ResponseMetadata` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `CarbonLDP.LDP.ResponseMetadata` object.", [
				{ name: "object", type: "object", description: "Object to check" },
			],
			{ type: "object is CarbonLDP.LDP.ResponseMetadata" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ResponseMetadata",
		"CarbonLDP.LDP.ResponseMetadataFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( ResponseMetadata ).toBeDefined();
			expect( ResponseMetadata ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ResponseMetadata.TYPE", ():void => {
			expect( ResponseMetadata.TYPE ).toBeDefined();
			expect( Utils.isString( ResponseMetadata.TYPE ) ).toBe( true );

			expect( ResponseMetadata.TYPE ).toBe( C.ResponseMetadata );
		} );

		// TODO: Separate in different tests
		describe( "ResponseMetadata.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( ResponseMetadata ).toBeDefined();
				expect( ResponseMetadata ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have the model properties", ():void => {
				expect( ResponseMetadata.SCHEMA as { [ key:string ]:object } ).toEqual( {
					documentsMetadata: jasmine.any( Object ),
					authToken: jasmine.any( Object ),
				} );
			} );

			it( "should have c:documentMetadata", ():void => {
				expect( ResponseMetadata.SCHEMA[ "documentsMetadata" ] ).toEqual( {
					"@id": C.documentMetadata,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

			it( "should have cs:authToken", ():void => {
				expect( ResponseMetadata.SCHEMA[ "authToken" ] ).toEqual( {
					"@id": CS.authToken,
					"@type": "@id",
				} );
			} );

		} );

		// TODO: Separate in different tests
		it( "ResponseMetadata.is", ():void => {
			expect( ResponseMetadata.is ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.is ) ).toBe( true );

			let object:Partial<ResponseMetadata> = void 0;
			expect( ResponseMetadata.is( object ) ).toBe( false );
			object = null;
			expect( ResponseMetadata.is( object ) ).toBe( false );
			object = {};
			expect( ResponseMetadata.is( object ) ).toBe( false );

			object = TransientResource.decorate( {
				types: [
					C.VolatileResource,
					C.ResponseMetadata,
				],
				documentsMetadata: null,
			} );
			expect( ResponseMetadata.is( object ) ).toBe( true );

			object.removeType( C.VolatileResource );
			expect( ResponseMetadata.is( object ) ).toBe( false );
			object.addType( C.VolatileResource );

			object.removeType( C.ResponseMetadata );
			expect( ResponseMetadata.is( object ) ).toBe( false );
			object.addType( C.ResponseMetadata );

			delete object.documentsMetadata;
			expect( ResponseMetadata.is( object ) ).toBe( true );
			object.documentsMetadata = null;
		} );

	} );

} );
