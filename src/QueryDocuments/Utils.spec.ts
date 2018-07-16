import {
	GraphToken,
	IRIToken,
	OptionalToken,
	PatternToken,
	PredicateToken,
	SubjectToken,
	VariableToken
} from "sparqler/tokens";

import { createMockDigestedSchemaProperty } from "../../test/helpers/mocks";

import { PointerType } from "../ObjectSchema/PointerType";

import { hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { XSD } from "../Vocabularies/XSD";

import { QueryContext } from "./QueryContext";

import * as Utils from "./Utils";


describe( module( "carbonldp/QueryDocuments/Utils" ), ():void => {

	it( "should exists", ():void => {
		expect( Utils ).toBeDefined();
		expect( Utils ).toEqual( jasmine.any( Object ) );
	} );

	describe( method( INSTANCE, "_getLevelRegExp" ), ():void => {

		it( hasSignature(
			"Creates a regex to match child properties by name since an specific property",
			[
				{ name: "property", type: "string", description: "The name of the property to create the regex from." },
			],
			{ type: "RegExp" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils._getLevelRegExp ).toBeDefined();
			expect( Utils._getLevelRegExp ).toEqual( jasmine.any( Function ) );
		} );

		it( "should create a regex for no property level", ():void => {
			const regex:RegExp = Utils._getLevelRegExp( "" );
			expect( regex ).toEqual( /^[^.]+$/ );
		} );

		it( "should create a regex for a specific property level", ():void => {
			const documentLevel:RegExp = Utils._getLevelRegExp( "document" );
			expect( documentLevel ).toEqual( /^document\.[^.]+$/ );

			const propertyLevel:RegExp = Utils._getLevelRegExp( "property" );
			expect( propertyLevel ).toEqual( /^property\.[^.]+$/ );
		} );

		it( "should create a regex for a specific sub property level", ():void => {
			const subPropertyLevel:RegExp = Utils._getLevelRegExp( "property.sub-property" );
			expect( subPropertyLevel ).toEqual( /^property\.sub-property\.[^.]+$/ );

			const subSubPropertyLevel:RegExp = Utils._getLevelRegExp( "property.sub-property.sub-sub-property" );
			expect( subSubPropertyLevel ).toEqual( /^property\.sub-property\.sub-sub-property\.[^.]+$/ );
		} );

	} );


	describe( method( INSTANCE, "_createPropertyPatterns" ), ():void => {

		it( hasSignature(
			"Creates the base patterns for a query property.",
			[
				{ name: "context", type: "CarbonLDP.QueryDocuments.QueryContext", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource where the property belongs to." },
				{ name: "propertyPath", type: "string", description: "Path of the property to create its patterns." },
				{ name: "propertyDefinition", type: "CarbonLDP.DigestedObjectSchemaProperty", description: "Schema definition of the property." },
			],
			{ type: "SPARQLER/tokens/PatternToken[]" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils._createPropertyPatterns ).toBeDefined();
			expect( Utils._createPropertyPatterns ).toEqual( jasmine.any( Function ) );
		} );


		let context:QueryContext;
		beforeEach( ():void => {
			context = new QueryContext();
		} );

		it( "should return a subject pattern", () => {
			const patterns:PatternToken[] = Utils._createPropertyPatterns(
				context,
				"resource",
				"property",
				createMockDigestedSchemaProperty( { uri: "https://example.com/ns#property" } )
			);

			expect<any>( patterns ).toEqual( [
				jasmine.objectContaining( {
					token: "subject",
					subject: jasmine.objectContaining( {
						token: "variable",
						name: "resource",
					} ),
					predicates: [
						jasmine.objectContaining( {
							token: "predicate",
							predicate: jasmine.objectContaining( {
								token: "iri",
								value: "https://example.com/ns#property",
							} ),
							objects: [
								jasmine.objectContaining( {
									token: "variable",
									name: "property",
								} ),
							],
						} ),
					],
				} ),
			] );
		} );

		it( "should return a filter datatype when definition specified a literal type", () => {
			const patterns:PatternToken[] = Utils._createPropertyPatterns(
				context,
				"resource",
				"property",
				createMockDigestedSchemaProperty( {
					uri: "https://example.com/ns#property",
					literalType: XSD.boolean,
				} )
			);

			expect<any>( patterns ).toEqual( [
				jasmine.objectContaining( {
					token: "subject",
				} ),
				jasmine.objectContaining( {
					token: "filter",
					constraint: `datatype( ?property ) = <${ XSD.boolean }>`,
				} ),
			] );
		} );

		it( "should return a filter not literals when definition specified a pointer type", () => {
			const patterns:PatternToken[] = Utils._createPropertyPatterns(
				context,
				"resource",
				"property",
				createMockDigestedSchemaProperty( {
					uri: "https://example.com/ns#property",
					pointerType: PointerType.ID,
				} )
			);

			expect<any>( patterns ).toEqual( [
				jasmine.objectContaining( {
					token: "subject",
				} ),
				jasmine.objectContaining( {
					token: "filter",
					constraint: `! isLiteral( ?property )`,
				} ),
			] );
		} );

	} );

	describe( method( INSTANCE, "_createTypesPattern" ), ():void => {

		it( hasSignature(
			"Creates the pattern to query the types of a property/resource",
			[
				{ name: "context", type: "CarbonLDP.QueryDocuments.QueryContext", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource to query its types." },
			],
			{ type: "SPARQLER/tokens/PatternToken" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils._createTypesPattern ).toBeDefined();
			expect( Utils._createTypesPattern ).toEqual( jasmine.any( Function ) );
		} );


		let context:QueryContext;
		beforeEach( ():void => {
			context = new QueryContext();
		} );

		it( "should return a pattern token for types", () => {
			const pattern:PatternToken = Utils._createTypesPattern( context, "resource" );
			expect<any>( pattern ).toEqual( jasmine.objectContaining( {
				token: "optional" as "optional",
				patterns: [
					jasmine.objectContaining( {
						token: "subject" as "subject",
						subject: jasmine.objectContaining( {
							token: "variable" as "variable",
							name: "resource",
						} ),
						predicates: [
							jasmine.objectContaining( {
								token: "predicate" as "predicate",
								predicate: "a",
								objects: [
									jasmine.objectContaining( {
										token: "variable" as "variable",
										name: "resource__types",
									} ),
								],
							} ),
						],
					} ),
				],
			} ) );
		} );

	} );

	describe( method( INSTANCE, "_createGraphPattern" ), ():void => {

		it( hasSignature(
			"Creates the graph pattern of a complete query.",
			[
				{ name: "context", type: "CarbonLDP.QueryDocuments.QueryContext", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource to create graph pattern." },
			],
			{ type: "SPARQLER/tokens/PatternToken" }
		), ():void => {
		} );

		it( "should exists", ():void => {
			expect( Utils._createTypesPattern ).toBeDefined();
			expect( Utils._createTypesPattern ).toEqual( jasmine.any( Function ) );
		} );


		let context:QueryContext;
		beforeEach( ():void => {
			context = new QueryContext();
		} );

		it( "should return a pattern token for the resource", () => {
			const pattern:PatternToken = Utils._createGraphPattern( context, "resource" );
			expect<any>( pattern ).toEqual( jasmine.objectContaining( {
				token: "graph" as "graph",
				graph: jasmine.objectContaining( {
					token: "variable" as "variable",
					name: "resource",
				} ),
				patterns: [
					jasmine.objectContaining( {
						token: "subject" as "subject",
						subject: jasmine.objectContaining( {
							token: "variable" as "variable",
							name: "resource___subject",
						} ),
						predicates: [
							jasmine.objectContaining( {
								token: "predicate" as "predicate",
								predicate: jasmine.objectContaining( {
									token: "variable" as "variable",
									name: "resource___predicate",
								} ),
								objects: [
									jasmine.objectContaining( {
										token: "variable" as "variable",
										name: "resource___object",
									} ),
								],
							} ),
						],
					} ),
				],
			} ) );
		} );

	} );

	describe( method( INSTANCE, "_createAllPattern" ), ():void => {

		it( hasSignature(
			"Creates the pattern of return the all the properties of a resource (only the first level).",
			[
				{ name: "context", type: "CarbonLDP.QueryDocuments.QueryContext", description: "The context of the query where to obtains the information for the patterns." },
				{ name: "resourcePath", type: "string", description: "Path of the parent property/resource to create the pattern." },
			],
			{ type: "SPARQLER/tokens/PatternToken" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._createAllPattern ).toBeDefined();
			expect( Utils._createAllPattern ).toEqual( jasmine.any( Function ) );
		} );


		let context:QueryContext;
		beforeEach( ():void => {
			context = new QueryContext();
		} );

		it( "should return a pattern token for the resource", () => {
			const pattern:PatternToken = Utils._createAllPattern( context, "resource" );
			expect<any>( pattern ).toEqual( jasmine.objectContaining( {
				token: "subject" as "subject",
				subject: jasmine.objectContaining( {
					token: "variable" as "variable",
					name: "resource",
				} ),
				predicates: [
					jasmine.objectContaining( {
						token: "predicate" as "predicate",
						predicate: jasmine.objectContaining( {
							token: "variable" as "variable",
							name: "resource___predicate",
						} ),
						objects: [
							jasmine.objectContaining( {
								token: "variable" as "variable",
								name: "resource___object",
							} ),
						],
					} ),
				],
			} ), );
		} );

	} );


	describe( method( INSTANCE, "_getParentPath" ), ():void => {

		it( hasSignature(
			"Returns the path for the immediately parent for the one provided.",
			[
				{ name: "path", type: "string", description: "Path to obtains its parent path." },
			],
			{ type: "string" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._getParentPath ).toBeDefined();
			expect( Utils._getParentPath ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return empty when no parent", () => {
			const path:string = Utils._getParentPath( "resource" );
			expect( path ).toBe( "" );
		} );

		it( "should return the parent path when only one parent", () => {
			const path:string = Utils._getParentPath( "parent.resource" );
			expect( path ).toBe( "parent" );
		} );

		it( "should return the parent path when more that one parent", () => {
			const path:string = Utils._getParentPath( "parent3.parent2.parent1.resource" );
			expect( path ).toBe( "parent3.parent2.parent1" );
		} );

	} );


	describe( method( INSTANCE, "_getAllTriples" ), () => {

		it( hasSignature(
			"Search and return all the triples variables (compacted in same subject) in all the levels of the patterns provided.",
			[
				{ name: "patterns", type: "SPARQLER/tokens/PatternToken", description: "Patterns where to look for the triples." },
			],
			{ type: "SPARQLER/tokens/SubjectToken" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._getAllTriples ).toBeDefined();
			expect( Utils._getAllTriples ).toEqual( jasmine.any( Function ) );
		} );


		it( "should not return subject with no variable", () => {
			const patterns:PatternToken[] = [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new IRIToken( "https://example.com/ns#Type" ) )
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [] );
		} );

		it( "should return same subject when valid", () => {
			const patterns:PatternToken[] = [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
			] );
		} );

		it( "should return multiple valid triples", () => {
			const patterns:PatternToken[] = [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
				new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
				new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
			] );
		} );


		it( "should return subject from inside optional", () => {
			const patterns:PatternToken[] = [
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
			] );
		} );

		it( "should multiple subjects from inside optionals", () => {
			const patterns:PatternToken[] = [
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
							.addObject( new VariableToken( "property" ) )
						)
					)
					.addPattern( new SubjectToken( new VariableToken( "property" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "property_types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
				new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
				new SubjectToken( new VariableToken( "property" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "property_types" ) )
					),
			] );
		} );

		it( "should return subject from inside graph", () => {
			const patterns:PatternToken[] = [
				new GraphToken( new IRIToken( "https://example.com/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
			] );
		} );

		it( "should multiple subjects from inside graphs", () => {
			const patterns:PatternToken[] = [
				new GraphToken( new IRIToken( "https://example.com/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
				new GraphToken( new IRIToken( "https://example.com/resource/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
							.addObject( new VariableToken( "property" ) )
						)
					)
					.addPattern( new SubjectToken( new VariableToken( "property" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "property_types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
				new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
				new SubjectToken( new VariableToken( "property" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "property_types" ) )
					),
			] );
		} );

		it( "should multiple subjects from inside a optional and graphs", () => {
			const patterns:PatternToken[] = [
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
				new GraphToken( new IRIToken( "https://example.com/resource/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
							.addObject( new VariableToken( "property" ) )
						)
					)
					.addPattern( new SubjectToken( new VariableToken( "property" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "property_types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
				new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
				new SubjectToken( new VariableToken( "property" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "property_types" ) )
					),
			] );
		} );

		it( "should multiple subjects from inside a inside graphs inside optionals", () => {
			const patterns:PatternToken[] = [
				new GraphToken( new IRIToken( "https://example.com/" ) )
					.addPattern( new OptionalToken()
						.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new VariableToken( "types" ) )
							)
						)
					),
				new OptionalToken()
					.addPattern( new GraphToken( new IRIToken( "https://example.com/resource/" ) )
						.addPattern( new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
							.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
								.addObject( new VariableToken( "property" ) )
							)
						)
						.addPattern( new SubjectToken( new VariableToken( "property" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new VariableToken( "property_types" ) )
							)
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					),
				new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
				new SubjectToken( new VariableToken( "property" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "property_types" ) )
					),
			] );
		} );


		it( "should combine into same subject when in different sub-patterns", () => {
			const patterns:PatternToken[] = [
				new GraphToken( new IRIToken( "https://example.com/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
							.addObject( new VariableToken( "property" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new VariableToken( "types" ) )
					)
					.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
						.addObject( new VariableToken( "property" ) )
					),
			] );
		} );

		it( "should only return subject with predicate as variable when first subject", () => {
			const patterns:PatternToken[] = [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( new VariableToken( "predicates" ) )
						.addObject( new VariableToken( "values" ) )
					),
				new GraphToken( new IRIToken( "https://example.com/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( new VariableToken( "predicates" ) )
						.addObject( new VariableToken( "values" ) )
					),
			] );
		} );

		it( "should only return subject with predicate as variable when not first", () => {
			const patterns:PatternToken[] = [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( "a" )
						.addObject( new IRIToken( "https://example.com/ns#Type" ) )
					),
				new GraphToken( new IRIToken( "https://example.com/" ) )
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "https://example.com/ns#property" ) )
							.addObject( new VariableToken( "property" ) )
						)
					),
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( new VariableToken( "predicates" ) )
							.addObject( new VariableToken( "values" ) )
						)
					),
				new OptionalToken()
					.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new VariableToken( "types" ) )
						)
					),
			];

			const returned:PatternToken[] = Utils._getAllTriples( patterns );
			expect( returned ).toEqual( [
				new SubjectToken( new IRIToken( "https://example.com/" ) )
					.addPredicate( new PredicateToken( new VariableToken( "predicates" ) )
						.addObject( new VariableToken( "values" ) )
					),
			] );
		} );

	} );


	describe( method( INSTANCE, "_getPathProperty" ), () => {

		it( hasSignature(
			"Search and returns the property value indicated by the specified path inside the element provided.",
			[
				{ name: "element", type: "any", description: "The element where to find the desired property." },
				{ name: "path", type: "string", description: "The path in the element to the desired property." },
			],
			{ type: "any" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._getPathProperty ).toBeDefined();
			expect( Utils._getPathProperty ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return element when empty path", () => {
			const element:{} = { the: "object" };
			const returned:{} = Utils._getPathProperty( element, "" );

			expect( returned ).toBe( element );
		} );

		it( "should return undefined when undefined element", () => {
			const returned:undefined = Utils._getPathProperty( void 0, "path" );
			expect( returned ).toBeUndefined();
		} );


		it( "should return the property specified by one level path", () => {
			const returned:any = Utils._getPathProperty( { path: "value" }, "path" );
			expect( returned ).toBe( "value" );
		} );

		it( "should return undefined when no property by one level path", () => {
			const returned:any = Utils._getPathProperty( {}, "path" );
			expect( returned ).toBeUndefined();
		} );

		it( "should return the property specified by two level path", () => {
			const returned:any = Utils._getPathProperty( { path1: { path2: "value" } }, "path1.path2" );
			expect( returned ).toBe( "value" );
		} );

		it( "should return undefined when no property by two level path", () => {
			const returned:any = Utils._getPathProperty( { path1: {} }, "path1.path2" );
			expect( returned ).toBeUndefined();
		} );

	} );

	describe( method( INSTANCE, "_areDifferentType" ), () => {

		it( hasSignature(
			"Returns true if the two elements provided can be classified as different type, simulating basic comparision in the SPARQL language",
			[
				{ name: "a", type: "any", description: "The first element to check against." },
				{ name: "b", type: "any", description: "The second element to check against." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._areDifferentType ).toBeDefined();
			expect( Utils._areDifferentType ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when number and string", () => {
			expect( Utils._areDifferentType( 1, "" ) ).toBe( true );
			expect( Utils._areDifferentType( "", 2 ) ).toBe( true );
		} );

		it( "should return true when number and boolean", () => {
			expect( Utils._areDifferentType( 1, true ) ).toBe( true );
			expect( Utils._areDifferentType( true, 2.2 ) ).toBe( true );
		} );

		it( "should return true when number and object", () => {
			expect( Utils._areDifferentType( 1, {} ) ).toBe( true );
			expect( Utils._areDifferentType( {}, 2.2 ) ).toBe( true );
		} );

		it( "should return true when string and boolean", () => {
			expect( Utils._areDifferentType( "", true ) ).toBe( true );
			expect( Utils._areDifferentType( false, "" ) ).toBe( true );
		} );

		it( "should return true when string and object", () => {
			expect( Utils._areDifferentType( "", {} ) ).toBe( true );
			expect( Utils._areDifferentType( {}, "" ) ).toBe( true );
		} );

		it( "should return true when boolean and object", () => {
			expect( Utils._areDifferentType( true, {} ) ).toBe( true );
			expect( Utils._areDifferentType( {}, false ) ).toBe( true );
		} );


		it( "should return false when both number", () => {
			expect( Utils._areDifferentType( 1, 2.2 ) ).toBe( false );
		} );

		it( "should return false when both string", () => {
			expect( Utils._areDifferentType( "string1", "string2" ) ).toBe( false );
		} );

		it( "should return false when both boolean", () => {
			expect( Utils._areDifferentType( false, false ) ).toBe( false );
		} );


		it( "should return false when both object", () => {
			expect( Utils._areDifferentType( {}, {} ) ).toBe( false );
		} );

		it( "should return true when object & Date", () => {
			expect( Utils._areDifferentType( {}, new Date() ) ).toBe( true );
			expect( Utils._areDifferentType( new Date(), {} ) ).toBe( true );
		} );

		it( "should return false when both Date", () => {
			expect( Utils._areDifferentType( new Date(), new Date() ) ).toBe( false );
		} );

	} );
} );
