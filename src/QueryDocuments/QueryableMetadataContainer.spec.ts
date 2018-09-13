import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { clazz, constructor, hasSignature, module } from "../test/JasmineExtender";

import { QueryableMetadataContainer } from "./QueryableMetadataContainer";
import { QueryableRootProperty } from "./QueryableRootProperty";
import { QueryContainerType } from "./QueryContainerType";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";


describe( module( "carbonldp/QueryDocuments/QueryableMetadataContainer" ), ():void => {

	describe( clazz( "CarbonLDP.QueryDocuments.QueryableMetadataContainer", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryableMetadataContainer ).toBeDefined();
			expect( QueryableMetadataContainer ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		beforeEach( ():void => {
			context = createMockContext();
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Class that helps the to build the statements of a query from metadata.",
				[
					{ name: "context", type: "CarbonLDP.AbstractContext<any, any, any>", description: "The carbon context from where the query belongs to." },
					{ name: "property", type: "CarbonLDP.QueryDocuments.QueryableRootProperty" },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
				const property:QueryableRootProperty = new QueryableRootProperty( { uri: "root/", propertyType: QueryPropertyType.PARTIAL } );
				const queryContainer:QueryableMetadataContainer = new QueryableMetadataContainer( context, property );

				expect( queryContainer ).toBeDefined();
				expect( queryContainer ).toEqual( jasmine.any( QueryableMetadataContainer ) );
			} );

			it( "should init property", () => {
				const property:QueryableRootProperty = new QueryableRootProperty( { uri: "root/", propertyType: QueryPropertyType.PARTIAL } );
				const queryContainer:QueryableMetadataContainer = new QueryableMetadataContainer( context, property );

				expect( queryContainer._queryProperty ).toEqual( jasmine.any( QueryProperty ) );
				expect( queryContainer._queryProperty.name ).toBe( "document" );
				expect( queryContainer._queryProperty.containerType ).toBe( QueryContainerType.DOCUMENT );
			} );

		} );

	} );

} );
