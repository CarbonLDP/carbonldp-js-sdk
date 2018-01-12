import { hasSignature, INSTANCE, method, module } from "../../test/JasmineExtender";

import * as Utils from "./Utils";

describe( module( "Carbon/SPARQL/QueryDocument/Utils" ), ():void => {

	it( "should exists", ():void => {
		expect( Utils ).toBeDefined();
		expect( Utils ).toEqual( jasmine.any( Object ) );
	} );

	describe( method( INSTANCE, "getLevelRegExp" ), ():void => {

		it( hasSignature(
			"Creates a regex to match child properties by name since an specific property",
			[
				{ name: "property", type: "string", description: "The name of the property to create the regex from." },
			],
			{ type: "RegExp" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils.getLevelRegExp ).toBeDefined();
			expect( Utils.getLevelRegExp ).toEqual( jasmine.any( Function ) );
		} );

		it( "should create a regex for no property level", ():void => {
			const regex:RegExp = Utils.getLevelRegExp( "" );
			expect( regex ).toEqual( /^[^.]+$/ );
		} );

		it( "should create a regex for a specific property level", ():void => {
			const documentLevel:RegExp = Utils.getLevelRegExp( "document" );
			expect( documentLevel ).toEqual( /^document\.[^.]+$/ );

			const propertyLevel:RegExp = Utils.getLevelRegExp( "property" );
			expect( propertyLevel ).toEqual( /^property\.[^.]+$/ );
		} );

		it( "should create a regex for a specific sub property level", ():void => {
			const subPropertyLevel:RegExp = Utils.getLevelRegExp( "property.sub-property" );
			expect( subPropertyLevel ).toEqual( /^property\.sub-property\.[^.]+$/ );

			const subSubPropertyLevel:RegExp = Utils.getLevelRegExp( "property.sub-property.sub-sub-property" );
			expect( subSubPropertyLevel ).toEqual( /^property\.sub-property\.sub-sub-property\.[^.]+$/ );
		} );

	} );

	describe( method( INSTANCE, "createPropertyPatterns" ), ():void => {

		it( hasSignature(
			"Creates the base patterns for a query property.",
			[
				{ name: "context", type: "Carbon.SPARQL.QueryDocument.QueryContext.Class", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource where the property belongs to." },
				{ name: "propertyPath", type: "string", description: "Path of the property to create its patterns." },
				{ name: "propertyDefinition", type: "Carbon.ObjectSchema.DigestedPropertyDefinition", description: "Schema definition of the property." },
			],
			{ type: "SPARQL/tokens/PatternToken[]" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils.createPropertyPatterns ).toBeDefined();
			expect( Utils.createPropertyPatterns ).toEqual( jasmine.any( Function ) );
		} );

	} );

	describe( method( INSTANCE, "createTypesPattern" ), ():void => {

		it( hasSignature(
			"Creates the pattern to query the types of a property/resource",
			[
				{ name: "context", type: "Carbon.SPARQL.QueryDocument.QueryContext.Class", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource to query its types." },
			],
			{ type: "SPARQL/tokens/PatternToken" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils.createTypesPattern ).toBeDefined();
			expect( Utils.createTypesPattern ).toEqual( jasmine.any( Function ) );
		} );

	} );

	describe( method( INSTANCE, "createGraphPattern" ), ():void => {

		it( hasSignature(
			"Creates the graph pattern of a complete query.",
			[
				{ name: "context", type: "Carbon.SPARQL.QueryDocument.QueryContext.Class", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource to create graph pattern." },
			],
			{ type: "SPARQL/tokens/PatternToken" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils.createTypesPattern ).toBeDefined();
			expect( Utils.createTypesPattern ).toEqual( jasmine.any( Function ) );
		} );

	} );

} );
