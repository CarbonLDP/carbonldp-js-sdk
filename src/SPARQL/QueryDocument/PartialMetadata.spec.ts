import { DigestedObjectSchema } from "../../ObjectSchema";
import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	module
} from "../../test/JasmineExtender";

import * as Module from "./PartialMetadata";
import DefaultExport, { PartialMetadata } from "./PartialMetadata";

describe( module( "CarbonLDP/SPARQL/QueryDocument/PartialMetadata" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "CarbonLDP.SPARQL.QueryDocument.PartialMetadata.PartialMetadata" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( PartialMetadata );
	} );

	describe( clazz( "CarbonLDP.SPARQL.QueryDocument.PartialMetadata.PartialMetadata", "Class that contains the metadata of a partial document." ), ():void => {

		it( "should exists", ():void => {
			expect( PartialMetadata ).toBeDefined();
			expect( PartialMetadata ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "schema", type: "CarbonLDP.ObjectSchema.DigestedObjectSchema", description: "The schema with the information of the partial properties of the partial resource." },
					{ name: "previousPartial", type: "CarbonLDP.SPARQL.QueryDocument.PartialMetadata.PartialMetadata", optional: true, description: "The previous partial metadata to merge with the new partial schema." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const partialMetadata:PartialMetadata = new PartialMetadata( new DigestedObjectSchema(), null );
				expect( partialMetadata ).toBeDefined();
				expect( partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
			} );

			// TODO: Test behaviour of `PartialMetadata.constructor`

		} );

	} );

} );
