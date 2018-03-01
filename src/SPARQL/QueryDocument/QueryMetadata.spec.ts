import { VolatileResource } from "../../LDP/VolatileResource";
import { Pointer } from "../../Pointer";
import { Resource } from "../../Resource";
import {
	clazz,
	hasDefaultExport,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	STATIC
} from "../../test/JasmineExtender";
import { C } from "../../Vocabularies/C";

import * as QueryMetadata from "./QueryMetadata";

describe( module( "Carbon/SPARQL/QueryDocument/QueryMetadata" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryMetadata ).toBeDefined();
		expect( QueryMetadata ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryMetadata.Class" ), ():void => {
		const target:QueryMetadata.Class = {} as QueryMetadata.default;
		expect( target ).toBeDefined();
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( QueryMetadata.RDF_CLASS ).toBeDefined();
		expect( QueryMetadata.RDF_CLASS ).toBe( C.QueryMetadata );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.ObjectSchema"
	), ():void => {
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

	describe( interfaze( "Carbon.SPARQL.QueryDocument.QueryMetadata.Class", "Interface of the volatile resource created by the SDK in the partial query request." ), ():void => {

		it( "should exists", ():void => {
			const target:QueryMetadata.Class = {} as QueryMetadata.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer",
			"The pointer to one of the targeted resources requested in the partial query."
		), ():void => {
			const target:QueryMetadata.Class[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryMetadata.Factory", "Util function for `Carbon.SPARQL.QueryDocument.QueryMetadata.Class` objects" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryMetadata.Factory ).toBeDefined();
			expect( QueryMetadata.Factory ).toEqual( jasmine.any( Function ) );
		} );

		describe( method( STATIC, "is" ), ():void => {

			it( hasSignature(
				"Asserts if the provided object can be defined as a QueryMetadata resource.",
				[
					{ name: "object", type: "object", description: "The object to check." },
				],
				{ type: "object is Carbon.SPARQL.QueryDocument.QueryMetadata.Class" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryMetadata.Factory.is ).toBeDefined();
				expect( QueryMetadata.Factory.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to VolatileResource.Factory.is", ():void => {
				const spy:jasmine.Spy = spyOn( VolatileResource, "is" );

				const object:object = { the: "object" };
				QueryMetadata.Factory.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should verify the resource RDF_CLASS", ():void => {
				const target:QueryMetadata.Class = Resource.createFrom( {
					types: [ C.VolatileResource, C.QueryMetadata ],
					"target": null,
				} );

				expect( QueryMetadata.Factory.is( target ) ).toBe( true );

				target.removeType( QueryMetadata.RDF_CLASS );
				expect( QueryMetadata.Factory.is( target ) ).toBe( false );
			} );

		} );

	} );

} );
