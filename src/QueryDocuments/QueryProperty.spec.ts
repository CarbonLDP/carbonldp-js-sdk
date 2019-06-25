import { LiteralToken, OptionalToken, VariableToken } from "sparqler/tokens";

import { createMockContext, createMockDigestedSchema, createMockDigestedSchemaProperty } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { IllegalActionError } from "../Errors/IllegalActionError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootPropertyType } from "./QueryRootPropertyType";


describe( "QueryProperty", () => {

	it( "should exist", () => {
		expect( QueryProperty ).toBeDefined();
		expect( QueryProperty ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	beforeEach( () => {
		context = createMockContext( { settings: { vocabulary: "https://example.com/vocab#" } } );
		context.extendObjectSchema(  "Type", {
			"property": {
				"@id": "https://example.com/ns#property",
			},
		} );

		queryContainer = new QueryContainer( context, { rootPropertyType: QueryRootPropertyType.DOCUMENT, uris: [ "root/" ] } );
	} );

	describe( "QueryProperty.constructor", () => {

		it( "should exist", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );
			expect( queryProperty ).toEqual( jasmine.any( QueryProperty ) );
		} );


		it( "should create full name with no parent", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.fullName ).toEqual( "name" );
		} );

		it( "should create full name with parent", () => {
			const parentProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "parent",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				parent: parentProperty,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.fullName ).toEqual( "parent.name" );
		} );

		it( "should create full name with parent with parent", () => {
			const grandParentProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "grandParent",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const parentProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "parent",
				parent: grandParentProperty,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				parent: parentProperty,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.fullName ).toEqual( "grandParent.parent.name" );
		} );


		it( "should create an variable token", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.variable ).toEqual( jasmine.any( VariableToken ) );
		} );

	} );


	// TODO: Test .hasProperties

	describe( "QueryProperty.addProperty", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.addProperty ).toBeDefined();
			expect( QueryProperty.prototype.addProperty ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create property with definition from context", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "parent",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			// Add type of the schema to look for
			queryProperty.addType( "Type" );

			const returned:QueryProperty = queryProperty
				.addProperty( "property", {} );

			expect( returned.definition ).toEqual( createMockDigestedSchemaProperty( {
				uri: "https://example.com/ns#property",
			} ) );
		} );

		it( "should create property with not inherited definition", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "parent",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			// Add type odf the schema where the property is in
			queryProperty.addType( "Type" );

			const returned:QueryProperty = queryProperty
				.addProperty( "property", { inherit: false } );

			expect( returned.definition ).toEqual( createMockDigestedSchemaProperty( {
				uri: "https://example.com/vocab#property",
			} ) );
		} );

		// TODO: Test more cases

	} );

	// TODO: Test ._addSubProperty

	describe( "QueryProperty.getProperty", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.getProperty ).toBeDefined();
			expect( QueryProperty.prototype.getProperty ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create ALL property when root is FULL", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
				propertyType: QueryPropertyType.FULL,
			} );

			const returned:QueryProperty = queryProperty.getProperty( "property", { create: true } )!;
			expect( returned.propertyType ).toEqual( QueryPropertyType.ALL );
		} );

		// TODO: Test more cases

	} );


	// TODO: Test .setType
	// TODO: Test .addValues
	// TODO: Test .addType
	// TODO: Test .addFilter

	describe( "QueryProperty.setObligatory", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.setObligatory ).toBeDefined();
			expect( QueryProperty.prototype.setObligatory ).toEqual( jasmine.any( Function ) );
		} );


		it( "should set obligatory to parent when child set to inherit", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
				name: "name",
			} );

			const subProperty:QueryProperty = queryProperty
				.addProperty( "property", {} );

			subProperty.setObligatory( { inheritParents: true } );

			expect( queryProperty.optional ).toEqual( false );
		} );

		// TODO: Test more cases

	} );

	// TODO: Test ._isPartial
	// TODO: Test ._isComplete


	describe( "QueryProperty.getSelfPattern", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.getSelfPattern ).toBeDefined();
			expect( QueryProperty.prototype.getSelfPattern ).toEqual( jasmine.any( Function ) );
		} );


		it( "should throw error when no parent", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
				name: "name",
			} );

			expect( () => queryProperty.getSelfPattern() )
				.toThrowError( IllegalActionError, "Cannot create pattern without a parent." );
		} );

		// TODO: Test more cases

	} );

	describe( "QueryProperty.getSearchPatterns", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.getSearchPatterns ).toBeDefined();
			expect( QueryProperty.prototype.getSearchPatterns ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return the patterns as optional", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				parent: new QueryProperty( {
					queryContainer: queryContainer,
					name: "parent",
					definition: new DigestedObjectSchemaProperty(),
					optional: true,
				} ),
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			expect( queryProperty.getSearchPatterns() ).toEqual( [
				jasmine.any( OptionalToken ) as any as OptionalToken,
			] );
		} );

		it( "should return the patterns when obligatory", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					queryContainer: queryContainer,
					name: "name",
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					definition: new DigestedObjectSchemaProperty(),
					optional: false,
				} )
			;

			expect( queryProperty.getSearchPatterns() ).not.toEqual( [
				jasmine.any( OptionalToken ) as any as OptionalToken,
			] );
		} );


		it( "should throw error when has literal values and type ALL", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					name: "property",
					optional: false,
					queryContainer: queryContainer,
					definition: createMockDigestedSchemaProperty( { uri: "http://example.com/ns#property" } ),
					values: [ new LiteralToken( "some-value" ) ],
					propertyType: QueryPropertyType.ALL,
				} )
			;

			expect( () => queryProperty.getSearchPatterns() )
				.toThrowError( IllegalActionError, `Property is not a resource.` );
		} );

		it( "should throw error when has literal values and type FULL", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					name: "property",
					optional: false,
					queryContainer: queryContainer,
					definition: createMockDigestedSchemaProperty( { uri: "http://example.com/ns#property" } ),
					values: [ new LiteralToken( "some-value" ) ],
					propertyType: QueryPropertyType.FULL,
				} )
			;

			expect( () => queryProperty.getSearchPatterns() )
				.toThrowError( IllegalActionError, `Property is not a resource.` );
		} );

		it( "should NOT throw error when has literal values and type EMPTY", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					name: "property",
					optional: false,
					queryContainer: queryContainer,
					definition: createMockDigestedSchemaProperty( { uri: "http://example.com/ns#property" } ),
					values: [ new LiteralToken( "some-value" ) ],
					propertyType: QueryPropertyType.EMPTY,
				} )
			;

			expect( () => queryProperty.getSearchPatterns() )
				.not.toThrowError( IllegalActionError, `Property is not a resource.` );
		} );

		it( "should NOT throw error when has literal values and type PARTIAL", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					name: "property",
					optional: false,
					queryContainer: queryContainer,
					definition: createMockDigestedSchemaProperty( { uri: "http://example.com/ns#property" } ),
					values: [ new LiteralToken( "some-value" ) ],
					propertyType: QueryPropertyType.PARTIAL,
				} )
			;

			expect( () => queryProperty.getSearchPatterns() )
				.not.toThrowError( IllegalActionError, `Property is not a resource.` );
		} );

		it( "should NOT throw error when has literal values and NO type", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
					parent: new QueryProperty( {
						queryContainer: queryContainer,
						name: "parent",
						definition: new DigestedObjectSchemaProperty(),
						optional: true,
					} ),
					name: "property",
					optional: false,
					queryContainer: queryContainer,
					definition: createMockDigestedSchemaProperty( { uri: "http://example.com/ns#property" } ),
					values: [ new LiteralToken( "some-value" ) ],
				} )
			;

			expect( () => queryProperty.getSearchPatterns() )
				.not.toThrowError( IllegalActionError, `Property is not a resource.` );
		} );

		// TODO: Test more cases

	} );

	// TODO: Test .getConstructPatterns


	describe( "QueryProperty.getSchemaFor", () => {

		it( "should exist", () => {
			expect( QueryProperty.prototype.getSchemaFor ).toBeDefined();
			expect( QueryProperty.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return empty schema when no properties", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
			} );

			const propertySchema:DigestedObjectSchema = queryProperty.getSchemaFor( {} );
			expect( propertySchema ).toEqual( new DigestedObjectSchema() );
		} );

		it( "should return schema from sub-properties", () => {
			const queryProperty:QueryProperty = new QueryProperty( {
				queryContainer: queryContainer,
				name: "name",
				definition: new DigestedObjectSchemaProperty(),
				optional: true,
				propertyType: QueryPropertyType.PARTIAL,
			} );

			queryProperty.addProperty( "property1", {} );
			queryProperty.addProperty( "property2", { "@id": "https://example.com/property2" } );

			const propertySchema:DigestedObjectSchema = queryProperty.getSchemaFor( {} );
			expect( propertySchema ).toEqual( createMockDigestedSchema( {
				properties: new Map<string, DigestedObjectSchemaProperty>( [
					[ "property1", createMockDigestedSchemaProperty( { uri: "https://example.com/vocab#property1" } ) ],
					[ "property2", createMockDigestedSchemaProperty( { uri: "https://example.com/property2" } ) ],
				] ),
			} ) );
		} );

	} );

} );
