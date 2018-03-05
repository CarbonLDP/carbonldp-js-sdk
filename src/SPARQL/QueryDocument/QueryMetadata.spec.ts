import { VolatileResource } from "../../LDP/VolatileResource";
import { Pointer } from "../../Pointer";
import { Resource } from "../../Resource";
import {
	hasDefaultExport,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../../test/JasmineExtender";
import { C } from "../../Vocabularies/C";

import DefaultExport, { QueryMetadata } from "./QueryMetadata";

describe( module( "Carbon/SPARQL/QueryDocument/QueryMetadata" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryMetadata ).toBeDefined();
		expect( QueryMetadata ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryMetadata.QueryMetadata" ), ():void => {
		const target:DefaultExport = {} as QueryMetadata;
		expect( target ).toBeDefined();
	} );

	describe( interfaze( "Carbon.SPARQL.QueryDocument.QueryMetadata.QueryMetadata", "Interface of the volatile resource created by the SDK in the partial query request." ), ():void => {

		it( "should exists", ():void => {
			const target:QueryMetadata = {} as QueryMetadata;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer",
			"The pointer to one of the targeted resources requested in the partial query."
		), ():void => {
			const target:QueryMetadata[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.SPARQL.QueryDocument.QueryMetadataConstant",
		"Interface with the factory, decorate and utils methods for `Carbon.SPARQL.QueryDocument.QueryMetadata.QueryMetadata` objects."
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

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Asserts if the provided object can be defined as a QueryMetadata resource.",
				[
					{ name: "object", type: "object", description: "The object to check." },
				],
				{ type: "object is Carbon.SPARQL.QueryDocument.QueryMetadata.QueryMetadata" }
			), ():void => {} );

		} );

	} );

	describe( property(
		STATIC,
		"QueryMetadata",
		"Carbon.SPARQL.QueryDocument.QueryMetadataConstant"
	), ():void => {

		it( "should exist", ():void => {
			expect( QueryMetadata ).toBeDefined();
			expect( QueryMetadata ).toEqual( jasmine.any( Object ) );
		} );

		it( "QueryMetadata.TYPE", ():void => {
			expect( QueryMetadata.TYPE ).toBeDefined();
			expect( QueryMetadata.TYPE ).toBe( C.QueryMetadata );
		} );

		// TODO: Separate in different tests
		it( "QueryMetadata.SCHEMA", ():void => {
			expect( QueryMetadata.SCHEMA ).toBeDefined();
			expect( QueryMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( QueryMetadata.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( QueryMetadata.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

		describe( "QueryMetadata.is", ():void => {

			it( "should exists", ():void => {
				expect( QueryMetadata.is ).toBeDefined();
				expect( QueryMetadata.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to VolatileResource.is", ():void => {
				const spy:jasmine.Spy = spyOn( VolatileResource, "is" );

				const object:object = { the: "object" };
				QueryMetadata.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should verify the resource TYPE", ():void => {
				const target:QueryMetadata = Resource.createFrom( {
					types: [ C.VolatileResource, C.QueryMetadata ],
					"target": null,
				} );

				expect( QueryMetadata.is( target ) ).toBe( true );

				target.removeType( QueryMetadata.TYPE );
				expect( QueryMetadata.is( target ) ).toBe( false );
			} );

		} );

	} );

} );
