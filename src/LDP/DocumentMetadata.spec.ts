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
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { Resource } from "./../Resource";
import * as Utils from "./../Utils";

import * as DocumentMetadata from "./DocumentMetadata";
import DefaultExport from "./DocumentMetadata";

describe( module( "Carbon/LDP/DocumentMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( DocumentMetadata ).toBeDefined();
		expect( Utils.isObject( DocumentMetadata ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( DocumentMetadata.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( DocumentMetadata.RDF_CLASS ) ).toBe( true );

		expect( DocumentMetadata.RDF_CLASS ).toBe( C.DocumentMetadata );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.ObjectSchema"
	), ():void => {
		expect( DocumentMetadata.SCHEMA ).toBeDefined();
		expect( Utils.isObject( DocumentMetadata.SCHEMA ) ).toBe( true );

		expect( DocumentMetadata.SCHEMA as { [key:string]:jasmine.Any } ).toEqual( {
			relatedDocument: jasmine.any( Object ),
			eTag: jasmine.any( Object ),
			bNodesMap: jasmine.any( Object ),
		} );

		expect( DocumentMetadata.SCHEMA[ "relatedDocument" ] ).toEqual( {
			"@id": C.relatedDocument,
			"@type": "@id",
		} );

		expect( DocumentMetadata.SCHEMA[ "eTag" ] ).toEqual( {
			"@id": C.eTag,
			"@type": XSD.string,
		} );

		expect( DocumentMetadata.SCHEMA[ "bNodesMap" ] ).toEqual( {
			"@id": C.bNodesMap,
			"@type": "@id",
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.DocumentMetadata.Class",
		"Interface that represents a free node resource that contains dynamic information about an specific resource."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource.Class" ), ():void => {} );


		it( hasProperty(
			OBLIGATORY,
			"relatedDocument",
			"Carbon.Pointer.Pointer",
			"Reference to the resource the metadata information refers to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"eTag",
			"string",
			"The ETag of the resource the metadata refers to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"bNodesMap",
			"Carbon.LDP.Map.Class<Carbon.BlankNode.BlankNode, Carbon.BlankNode.BlankNode>",
			"A `c:Map` object that contains the changes of persisted BNode IDs."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.LDP.DocumentMetadata.Factory",
		"Factory class for `Carbon.LDP.DocumentMetadata.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentMetadata.Factory ).toBeDefined();
			expect( Utils.isFunction( DocumentMetadata.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties of a `Carbon.LDP.DocumentMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( DocumentMetadata.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( DocumentMetadata.Factory.hasClassProperties ) ).toBe( true );

			let object:Partial<DocumentMetadata.Class> = void 0;
			expect( DocumentMetadata.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				relatedDocument: null,
				eTag: null,
				bNodesMap: null,
			};
			expect( DocumentMetadata.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.relatedDocument;
			expect( DocumentMetadata.Factory.hasClassProperties( object ) ).toBe( false );
			object.relatedDocument = null;

			delete object.eTag;
			expect( DocumentMetadata.Factory.hasClassProperties( object ) ).toBe( true );
			object.eTag = null;

			delete object.bNodesMap;
			expect( DocumentMetadata.Factory.hasClassProperties( object ) ).toBe( true );
			object.bNodesMap = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.DocumentMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( DocumentMetadata.Factory.is ).toBeDefined();
			expect( Utils.isFunction( DocumentMetadata.Factory.is ) ).toBe( true );

			let object:DocumentMetadata.Class = void 0;
			expect( DocumentMetadata.Factory.is( object ) ).toBe( false );
			object = null;
			expect( DocumentMetadata.Factory.is( object ) ).toBe( false );

			object = Resource.decorate( {
				types: [
					C.VolatileResource,
					C.DocumentMetadata,
				],
				relatedDocument: null,
				eTag: null,
				bNodesMap: null,
			} );

			delete object.relatedDocument;
			expect( DocumentMetadata.Factory.is( object ) ).toBe( false );
			object.relatedDocument = null;

			delete object.eTag;
			expect( DocumentMetadata.Factory.is( object ) ).toBe( true );
			object.eTag = null;

			delete object.bNodesMap;
			expect( DocumentMetadata.Factory.is( object ) ).toBe( true );
			object.bNodesMap = null;

			object.removeType( C.VolatileResource );
			expect( DocumentMetadata.Factory.is( object ) ).toBe( false );
			object.hasType( C.VolatileResource );

			object.removeType( C.DocumentMetadata );
			expect( DocumentMetadata.Factory.is( object ) ).toBe( false );
			object.addType( C.DocumentMetadata );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.DocumentMetadata.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:DocumentMetadata.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
