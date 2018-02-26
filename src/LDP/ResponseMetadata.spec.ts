import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { Resource } from "./../Resource";
import * as Utils from "./../Utils";
import * as ResponseMetadata from "./ResponseMetadata";
import DefaultExport from "./ResponseMetadata";

describe( module( "Carbon/LDP/ResponseMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( ResponseMetadata ).toBeDefined();
		expect( Utils.isObject( ResponseMetadata ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ResponseMetadata.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ResponseMetadata.RDF_CLASS ) ).toBe( true );

		expect( ResponseMetadata.RDF_CLASS ).toBe( C.ResponseMetadata );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.ObjectSchema"
	), ():void => {
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

	describe( interfaze(
		"Carbon.LDP.ResponseMetadata.Class",
		"Interface that represents the main resource of a set of metadata resources, which references everyone resource related to an specific dynamic response of tha server."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"documentsMetadata",
			"Carbon.LDP.DocumentMetadata.Class[]",
			"An array with all the metadata resources of the dynamic response."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.LDP.ResponseMetadata.Factory",
		"Factory class for `Carbon.LDP.ResponseMetadata.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ResponseMetadata.Factory ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.ResponseMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseMetadata.Factory.is ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.Factory.is ) ).toBe( true );

			let object:Partial<ResponseMetadata.Class> = void 0;
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );
			object = null;
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );
			object = {};
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );

			object = Resource.decorate( {
				types: [
					C.VolatileResource,
					C.ResponseMetadata,
				],
				documentsMetadata: null,
			} );
			expect( ResponseMetadata.Factory.is( object ) ).toBe( true );

			object.removeType( C.VolatileResource );
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );
			object.addType( C.VolatileResource );

			object.removeType( C.ResponseMetadata );
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );
			object.addType( C.ResponseMetadata );

			delete object.documentsMetadata;
			expect( ResponseMetadata.Factory.is( object ) ).toBe( true );
			object.documentsMetadata = null;
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.ResponseMetadata.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:ResponseMetadata.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
