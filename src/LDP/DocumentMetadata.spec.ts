import { Resource } from "../Resource";
import {
	extendsClass,
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

import { DocumentMetadata } from "./DocumentMetadata";

describe( module( "carbonldp/LDP/DocumentMetadata" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.DocumentMetadata",
		"Interface that represents a free node resource that contains dynamic information about an specific resource."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.VolatileResource" ), ():void => {} );


		it( hasProperty(
			OBLIGATORY,
			"relatedDocument",
			"CarbonLDP.Pointer",
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
			"CarbonLDP.LDP.Map<CarbonLDP.Pointer, CarbonLDP.Pointer>",
			"A `c:Map` object that contains the changes of persisted BNode IDs."
		), ():void => {} );

	} );


	describe( interfaze(
		"CarbonLDP.LDP.DocumentMetadataFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.DocumentMetadata` objects."
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

	} );

	describe( property(
		STATIC,
		"DocumentMetadata",
		"CarbonLDP.LDP.DocumentMetadataFactory"
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

	} );

} );
