import { Resource } from "../Resource";
import {
	extendsClass,
	hasDefaultExport,
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
import * as Utils from "./../Utils";

import DefaultExport, { ResponseMetadata } from "./ResponseMetadata";

describe( module( "Carbon/LDP/ResponseMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( ResponseMetadata ).toBeDefined();
		expect( Utils.isObject( ResponseMetadata ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.LDP.ResponseMetadata.ResponseMetadata",
		"Interface that represents the main resource of a set of metadata resources, which references everyone resource related to an specific dynamic response of tha server."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource.VolatileResource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"documentsMetadata",
			"Carbon.LDP.DocumentMetadata.DocumentMetadata[]",
			"An array with all the metadata resources of the dynamic response."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.LDP.ResponseMetadata.ResponseMetadataConstant",
		"Interface with the factory, decorate and utils methods for `Carbon.LDP.ResponseMetadata.ResponseMetadata` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.ResponseMetadata.ResponseMetadata` object.", [
				{ name: "object", type: "object", description: "Object to check" },
			],
			{ type: "object is Carbon.LDP.ResponseMetadata.ResponseMetadata" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ResponseMetadata",
		"Carbon.LDP.ResponseMetadata.ResponseMetadataConstant"
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
		it( "ResponseMetadata.SCHEMA", ():void => {
			expect( ResponseMetadata.SCHEMA ).toBeDefined();
			expect( Utils.isObject( ResponseMetadata.SCHEMA ) ).toBe( true );

			expect( ResponseMetadata.SCHEMA as { [key:string]:object } ).toEqual( {
				documentsMetadata: jasmine.any( Object ),
			} );

			expect( ResponseMetadata.SCHEMA[ "documentsMetadata" ] ).toEqual( {
				"@id": C.documentMetadata,
				"@type": "@id",
				"@container": "@set",
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

			object = Resource.decorate( {
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

	it( hasDefaultExport( "Carbon.LDP.ResponseMetadata.ResponseMetadata" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:ResponseMetadata;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
