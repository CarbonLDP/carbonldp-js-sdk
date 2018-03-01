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
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import DefaultExport, { DocumentMetadata } from "./DocumentMetadata";

describe( module( "Carbon/LDP/DocumentMetadata" ), ():void => {

	describe( interfaze(
		"Carbon.LDP.DocumentMetadata.DocumentMetadata",
		"Interface that represents a free node resource that contains dynamic information about an specific resource."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource.VolatileResource" ), ():void => {} );


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
			"Carbon.LDP.CarbonMap.CarbonMap<Carbon.BlankNode.BlankNode, Carbon.BlankNode.BlankNode>",
			"A `c:Map` object that contains the changes of persisted BNode IDs."
		), ():void => {} );

	} );


	describe( interfaze(
		"Carbon.LDP.DocumentMetadata.DocumentMetadataFactory",
		"Interface with the factory, decorate and utils methods for `Carbon.LDP.DocumentMetadata.DocumentMetadata` objects."
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
			"isDecorated",
			"Return true if the object provided has the properties of a `Carbon.LDP.DocumentMetadata.DocumentMetadata` object.", [
				{ name: "object", type: "object", description: "Object to check." },
			],
			{ type: "object is Carbon.LDP.DocumentMetadata.DocumentMetadata" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.DocumentMetadata.DocumentMetadata` object.", [
				{ name: "object", type: "object", description: "Object to check." },
			],
			{ type: "object is Carbon.LDP.DocumentMetadata.DocumentMetadata" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentMetadata",
		"Carbon.LDP.DocumentMetadata.DocumentMetadataFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentMetadata ).toBeDefined();
			expect( DocumentMetadata ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentMetadata.TYPE", ():void => {
			expect( DocumentMetadata.TYPE ).toBeDefined();
			expect( Utils.isString( DocumentMetadata.TYPE ) ).toBe( true );

			expect( DocumentMetadata.TYPE ).toBe( C.DocumentMetadata );
		} );

		// TODO: Separate in different tests
		it( "DocumentMetadata.SCHEMA", ():void => {
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

		// TODO: Separate in different tests
		it( "DocumentMetadata.isDecorated", ():void => {
			expect( DocumentMetadata.isDecorated ).toBeDefined();
			expect( Utils.isFunction( DocumentMetadata.isDecorated ) ).toBe( true );

			let object:Partial<DocumentMetadata> = void 0;
			expect( DocumentMetadata.isDecorated( object ) ).toBe( false );

			object = {
				relatedDocument: null,
				eTag: null,
				bNodesMap: null,
			};
			expect( DocumentMetadata.isDecorated( object ) ).toBe( true );

			delete object.relatedDocument;
			expect( DocumentMetadata.isDecorated( object ) ).toBe( false );
			object.relatedDocument = null;

			delete object.eTag;
			expect( DocumentMetadata.isDecorated( object ) ).toBe( true );
			object.eTag = null;

			delete object.bNodesMap;
			expect( DocumentMetadata.isDecorated( object ) ).toBe( true );
			object.bNodesMap = null;
		} );

		// TODO: Separate in different tests
		it( "DocumentMetadata.is", ():void => {
			expect( DocumentMetadata.is ).toBeDefined();
			expect( Utils.isFunction( DocumentMetadata.is ) ).toBe( true );

			let object:DocumentMetadata = void 0;
			expect( DocumentMetadata.is( object ) ).toBe( false );
			object = null;
			expect( DocumentMetadata.is( object ) ).toBe( false );

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
			expect( DocumentMetadata.is( object ) ).toBe( false );
			object.relatedDocument = null;

			delete object.eTag;
			expect( DocumentMetadata.is( object ) ).toBe( true );
			object.eTag = null;

			delete object.bNodesMap;
			expect( DocumentMetadata.is( object ) ).toBe( true );
			object.bNodesMap = null;

			object.removeType( C.VolatileResource );
			expect( DocumentMetadata.is( object ) ).toBe( false );
			object.hasType( C.VolatileResource );

			object.removeType( C.DocumentMetadata );
			expect( DocumentMetadata.is( object ) ).toBe( false );
			object.addType( C.DocumentMetadata );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.DocumentMetadata.DocumentMetadata" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:DocumentMetadata;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
