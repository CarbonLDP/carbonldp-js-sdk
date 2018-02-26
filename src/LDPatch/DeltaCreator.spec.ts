import {
	BlankNodeToken,
	CollectionToken,
	IRIToken,
	LiteralToken,
	PredicateToken,
	PrefixedNameToken,
	SubjectToken,
} from "sparqler/tokens";

import { Converter } from "../JSONLD";
import { XSD } from "../Vocabularies/XSD";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester,
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../test/JasmineExtender";

import * as Module from "./DeltaCreator";
import { Class as DeltaCreator } from "./DeltaCreator";
import {
	AddToken,
	DeleteToken,
	PrefixToken,
	SliceToken,
	UpdateListToken,
} from "./Tokens";

describe( module( "Carbon/LDPatch/DeltaCreator" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.LDPatch.DeltaCreator.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( DeltaCreator );
	} );

	describe( clazz( "Carbon.LDPatch.DeltaCreator.Class", "Creator of LDPatch deltas" ), ():void => {

		it( "should exists", ():void => {
			expect( DeltaCreator ).toBeDefined();
			expect( DeltaCreator ).toEqual( jasmine.any( Function ) );
		} );

		let jsonldConverter:Converter.Class;
		beforeEach( () => {
			jsonldConverter = new Converter.Class();
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "jsonldConverter", type: "Carbon.JSONLD.Converter.Class", description: "The converted of JSON-LD to Javascript and viceversa to use." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const delta:DeltaCreator = new DeltaCreator( null );
				expect( delta ).toBeDefined();
				expect( delta ).toEqual( jasmine.any( DeltaCreator ) );
			} );

			it( "should store the JSONLDConverter", ():void => {
				const delta:DeltaCreator = new DeltaCreator( jsonldConverter );
				expect( delta[ "jsonldConverter" ] ).toBe( jsonldConverter );
			} );

			it( "should initialize the LD Patch add token", ():void => {
				const delta:DeltaCreator = new DeltaCreator( jsonldConverter );
				expect( delta[ "addToken" ] ).toEqual( new AddToken() );
			} );

			it( "should initialize the LD Patch delete token", ():void => {
				const delta:DeltaCreator = new DeltaCreator( jsonldConverter );
				expect( delta[ "deleteToken" ] ).toEqual( new DeleteToken() );
			} );

			it( "should initialize the LD Patch update lists tokens", ():void => {
				const delta:DeltaCreator = new DeltaCreator( jsonldConverter );
				expect( delta[ "updateLists" ] ).toEqual( [] );
			} );

		} );

		describe( method( INSTANCE, "addResource" ), ():void => {

			it( hasSignature(
				"Creates and adds the delta to the patch, of the provided old and new resource.",
				[
					{ name: "schema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The schema of the resource to create its delta." },
					{ name: "oldResource", type: "Carbon.Resource.Resource", description: "The old representation of the resource to create the delta." },
					{ name: "newResource", type: "Carbon.Resource.Resource", description: "The current representation of the resource to create the delta." },
				]
			), ():void => {
			} );


			it( "should exists", ():void => {
				expect( DeltaCreator.prototype.addResource ).toBeDefined();
				expect( DeltaCreator.prototype.addResource ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When property not in the schema", ():void => {

				let schema:DigestedObjectSchema;
				beforeEach( ():void => {
					schema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
					} );
				} );

				it( "should guess deleted string", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted number", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: 1,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted boolean", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted date", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: new Date( "2000-01-01" ),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted resource pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted blank node pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "_:blank-node" ),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new BlankNodeToken( "_:blank-node" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted array", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
							.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should ignore deleted functions", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"valid value",
							():void => {},
						],
						invalidFunction():void {},
					} as object );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "valid value" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should ignore deleted unsupported elements", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"valid value",
							new Map(),
							new Set(),
						],
						property1: {},
						property2: new Map(),
						property3: new Set(),
					} as object );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "valid value" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );


				it( "should guess added string", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );


					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should guess added number", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: 1,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should guess added boolean", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
						),
					] );
				} );

				it( "should guess added date", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: new Date( "2000-01-01" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
						),
					] );
				} );

				it( "should guess added resource pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
				} );

				it( "should guess added blank node pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "_:blank-node" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new BlankNodeToken( "_:blank-node" ) )
						),
					] );
				} );

				it( "should guess added array", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
							.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should ignore added functions", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"valid value",
							():void => {},
						],
						invalidFunction():void {},
					} as object );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "valid value" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should ignore added unsupported elements", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"valid value",
							{},
							new Map(),
							new Set(),
						],
						property1: {},
						property2: new Map(),
						property3: new Set(),
					} as object );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "valid value" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );


				it( "should delete new property if set to null", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: null,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should delete new property if set to undefined", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: void 0,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add old property if set to null", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: void 0,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add old property if set to undefined", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: void 0,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );


				it( "should detect added and deleted elements from an array", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						property: [
							"delete string",
							10,
							10,
							true,
							true,
							false,
							new Date( "2000-01-01" ),
							Pointer.create( "_:1" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							Pointer.create( "http://example.org/pointer/" ),
							new Date( "2000-01-01" ),
							new Date( "2010-10-10" ),
							true,
							10,
							10.01,
							"add string",
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "delete string" ) )
							.addObject( new LiteralToken( "false" ).setType( XSD.boolean ) )
							.addObject( new BlankNodeToken( "_:1" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "2010-10-10T00:00:00.000Z" ).setType( XSD.dateTime ) )
							.addObject( new LiteralToken( "10.01" ).setType( XSD.float ) )
							.addObject( new LiteralToken( "add string" ) )
						),
					] );
				} );


				it( "should detect deleted types", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						types: [ "http://example.org/vocab#Document", "Type-1", "Type-2" ],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						types: [ "Type-1" ],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( "a" )
							.addObject( new IRIToken( "http://example.org/vocab#Document" ) )
							.addObject( new IRIToken( "http://example.org/vocab#Type-2" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

			} );

			describe( "When property in the schema", ():void => {

				it( "should add deleted string", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted string with language", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
							"@language": "en",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ).setLanguage( "en" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted integer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.integer,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: 1,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.integer ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted float", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.float,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: 10.01,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "10.01" ).setType( XSD.float ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted boolean", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#the-property",
							"@type": XSD.boolean,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#the-property" ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted date", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.date,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: new Date( "2000-01-01" ),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "2000-01-01" ).setType( XSD.date ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted resource pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted blank node pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "_:blank-node" ),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new BlankNodeToken( "_:blank-node" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted first element from array without a type an container", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should guess deleted set without a type", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@container": "@set",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
							.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted string set", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@container": "@set",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string 1",
							"string 2",
							"string 3",
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string 1" ) )
							.addObject( new LiteralToken( "string 2" ) )
							.addObject( new LiteralToken( "string 3" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted language map", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
							"@container": "@language",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: {
							"en": "string",
							"en-US": "US string",
							"es": "cadena",
						},
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ).setLanguage( "en" ) )
							.addObject( new LiteralToken( "US string" ).setLanguage( "en-US" ) )
							.addObject( new LiteralToken( "cadena" ).setLanguage( "es" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted list without a type", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "updateLists" ] ).toEqual( [
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 0 ),
							new CollectionToken()
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new CollectionToken() )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add deleted string list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.string,
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string 1",
							"string 2",
							"string 3",
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "updateLists" ] ).toEqual( [
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 0 ),
							new CollectionToken()
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new CollectionToken() )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );


				it( "should add added string", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added string with language", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
							"@language": "en",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ).setLanguage( "en" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added integer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.integer,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: 1,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.integer ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added float", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.float,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: 10.01,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "10.01" ).setType( XSD.float ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added boolean", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#the-property",
							"@type": XSD.boolean,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#the-property" ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added date", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.date,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: new Date( "2000-01-01" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "2000-01-01" ).setType( XSD.date ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added resource pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added blank node pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "_:blank-node" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new BlankNodeToken( "_:blank-node" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should guess added first element from set without a type an container", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should guess added set without a type", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@container": "@set",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
							.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
							.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
							.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
							.addObject( new IRIToken( "http://example.org/pointer/" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added string set", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@container": "@set",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string 1",
							"string 2",
							"string 3",
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string 1" ) )
							.addObject( new LiteralToken( "string 2" ) )
							.addObject( new LiteralToken( "string 3" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added language map", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
							"@container": "@language",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: {
							"en": "string",
							"en-US": "US string",
							"es": "cadena",
						},
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ).setLanguage( "en" ) )
							.addObject( new LiteralToken( "US string" ).setLanguage( "en-US" ) )
							.addObject( new LiteralToken( "cadena" ).setLanguage( "es" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should guess added list without a type", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string",
							1,
							true,
							new Date( "2000-01-01" ),
							Pointer.create( "http://example.org/pointer/" ),
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new CollectionToken()
								.addObject( new LiteralToken( "string" ) )
								.addObject( new LiteralToken( "1" ).setType( XSD.float ) )
								.addObject( new LiteralToken( "true" ).setType( XSD.boolean ) )
								.addObject( new LiteralToken( "2000-01-01T00:00:00.000Z" ).setType( XSD.dateTime ) )
								.addObject( new IRIToken( "http://example.org/pointer/" ) )
							)
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add added string list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.string,
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							"string 1",
							"string 2",
							"string 3",
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new CollectionToken()
								.addObject( new LiteralToken( "string 1" ) )
								.addObject( new LiteralToken( "string 2" ) )
								.addObject( new LiteralToken( "string 3" ) )
							)
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );


				it( "should delete new property if set to null", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: null,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
				} );

				it( "should delete new property if set to undefined", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: void 0,
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
				} );

				it( "should add old property if set to null", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: void 0,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add old property if set to undefined", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: void 0,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );


				it( "should allow relative strings to be converted to pointers", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "pointer",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new IRIToken( "http://example.org/vocab#pointer" ) )
						),
					] );
				} );

				it( "should allow absolute strings to be converted to pointers", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: "http://example.org/pointer",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new IRIToken( "http://example.org/pointer" ) )
						),
					] );
				} );

				it( "should ignore non supported value to be pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property1": {
							"@type": "@id",
						},
						"property2": {
							"@type": "@id",
						},
						"property3": {
							"@type": "@id",
						},
						"property4": {
							"@type": "@id",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property1: {},
						property2: 1,
						property3: true,
						property4: new Date(),
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );


				it( "should detect added and deleted elements from an integer set", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.integer,
							"@container": "@set",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							1,
							10,
							10.01,
							12345,
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							1,
							10,
							10,
							67890,
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "12345" ).setType( XSD.integer ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "67890" ).setType( XSD.integer ) )
						),
					] );
				} );


				it( "should detect added and deleted elements from a list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							1,
							10,
							10.01,
							12345,
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							10,
							1,
							10.01,
							67890,
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "updateLists" ] ).toEqual( [
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 1, 2 ),
							new CollectionToken()
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 2, 3 ),
							new CollectionToken()
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 0, 0 ),
							new CollectionToken()
								.addObject( new LiteralToken( "10" ).setType( XSD.float ) )
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 3, 3 ),
							new CollectionToken()
								.addObject( new LiteralToken( "67890" ).setType( XSD.float ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should detect added and deleted elements from an integer list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.integer,
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							1,
							10,
							10.01,
							12345,
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [
							10,
							1,
							10.01,
							67890,
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "updateLists" ] ).toEqual( [
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 2, 4 ),
							new CollectionToken()
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 0, 0 ),
							new CollectionToken()
								.addObject( new LiteralToken( "10" ).setType( XSD.integer ) )
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 3, 3 ),
							new CollectionToken()
								.addObject( new LiteralToken( "67890" ).setType( XSD.integer ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should compact updates list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [ 1, 2, 3, 4, 5, 6 ],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: [ 4, 1, 2, "s-1", "s-2", 6, "s-3", 3 ],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "updateLists" ] ).toEqual( [
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 3, 6 ),
							new CollectionToken()
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 0, 0 ),
							new CollectionToken()
								.addObject( new LiteralToken( "4" ).setType( new IRIToken( XSD.float ) ) )
						),
						new UpdateListToken(
							new IRIToken( "http://example.org/resource/" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 3, 3 ),
							new CollectionToken()
								.addObject( new LiteralToken( "s-1" ) )
								.addObject( new LiteralToken( "s-2" ) )
								.addObject( new LiteralToken( "6" ).setType( new IRIToken( XSD.float ) ) )
								.addObject( new LiteralToken( "s-3" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

			} );

			describe( "When prefix in schema", ():void => {

				it( "should compact literal type", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"xsd": XSD.namespace,
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					const spy:jasmine.Spy = spyOn( deltaCreator, "compactIRI" as any ).and.callThrough();

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( spy ).toHaveBeenCalledWith( schema, XSD.boolean );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( true ).setType( new PrefixedNameToken( "xsd", "boolean" ) ) )
						),
					] );
				} );

				it( "should add literal type prefix in the prefix map", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"xsd": XSD.namespace,
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
						[ "xsd", new PrefixToken( "xsd", new IRIToken( XSD.namespace ) ) ],
					] ) );
				} );

				it( "should compact property URI", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"ex": "http://example.org/vocab#",
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					const spy:jasmine.Spy = spyOn( deltaCreator, "compactIRI" as any ).and.callThrough();

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( spy ).toHaveBeenCalledWith( schema, "property" );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex", "property" ) )
							.addObject( new LiteralToken( true ).setType( new IRIToken( XSD.boolean ) ) )
						),
					] );
				} );

				it( "should add property's prefix in the prefix map", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"ex": "http://example.org/vocab#",
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: true,
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
						[ "ex", new PrefixToken( "ex", new IRIToken( "http://example.org/vocab#" ) ) ],
					] ) );
				} );

				it( "should compact any pointer", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"base": "http://example.org/",
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
					} );

					const spy:jasmine.Spy = spyOn( deltaCreator, "compactIRI" as any ).and.callThrough();

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( spy ).toHaveBeenCalledWith( schema, "http://example.org/pointer/" );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new PrefixedNameToken( "base", "resource/" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "base", "vocab#property" ) )
							.addObject( new PrefixedNameToken( "base", "pointer/" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should add pointer's prefix to the prefix map", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"base": "http://example.org/",
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
						[ "base", new PrefixToken( "base", new IRIToken( "http://example.org/" ) ) ],
					] ) );
				} );


				it( "should add used prefixes", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"base": "http://example.org/",
						"xsd": XSD.namespace,
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						integers: [ 1 ],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
						integers: [ 1, 2 ],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
						[ "xsd", new PrefixToken( "xsd", new IRIToken( XSD.namespace ) ) ],
						[ "base", new PrefixToken( "base", new IRIToken( "http://example.org/" ) ) ],
					] ) );
				} );

				it( "should ignore unused prefixes", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"base": "http://example.org/",
						"xsd": XSD.namespace,
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						integers: [ 1, 2 ],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "http://example.org/resource/",
						property: Pointer.create( "http://example.org/pointer/" ),
						integers: [ 1, 2 ],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
						[ "base", new PrefixToken( "base", new IRIToken( "http://example.org/" ) ) ],
					] ) );
				} );

			} );

			describe( "When blank node resource", ():void => {

				it( "should delete simple properties", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
						property: "string",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add simple properties", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should delete simple properties", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
						property: "string",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

				it( "should delete list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.string,
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
						property: [
							"string 1",
							"string 2",
							"string 3",
						],
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "updateLists" ] ).toEqual( [
						new UpdateListToken(
							new BlankNodeToken( "_:blank-node" ),
							new IRIToken( "http://example.org/vocab#property" ),
							new SliceToken( 0 ),
							new CollectionToken()
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new CollectionToken() )
						),
					] );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
				} );

				it( "should add list", ():void => {
					const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

					const schema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
						"property": {
							"@id": "http://example.org/vocab#property",
							"@type": XSD.string,
							"@container": "@list",
						},
					} );

					const oldResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
					} );
					const newResource:Resource = Resource.createFrom( {
						id: "_:blank-node",
						property: [
							"string 1",
							"string 2",
							"string 3",
						],
					} );

					deltaCreator.addResource( schema, oldResource, newResource );
					expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new CollectionToken()
								.addObject( new LiteralToken( "string 1" ) )
								.addObject( new LiteralToken( "string 2" ) )
								.addObject( new LiteralToken( "string 3" ) )
							)
						),
					] );
					expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				} );

			} );

			it( "should append multiple resources changes", ():void => {
				const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

				deltaCreator.addResource( ObjectSchemaDigester.digestSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} ), Resource.createFrom( {
					id: "http://example.org/resource/",
					property: "string",
				} ), Resource.createFrom( {
					id: "http://example.org/resource/",
				} ) );

				deltaCreator.addResource( ObjectSchemaDigester.digestSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.integer,
					},
				} ), Resource.createFrom( {
					id: "http://example.org/resource/#fragment",
				} ), Resource.createFrom( {
					id: "http://example.org/resource/#fragment",
					property: 10.01,
				} ) );

				deltaCreator.addResource( ObjectSchemaDigester.digestSchema( {
					"@vocab": "http://example.org/vocab#",
					"property1": {
						"@type": XSD.string,
					},
					"property2": {
						"@type": XSD.string,
					},
				} ), Resource.createFrom( {
					id: "_:blank-node",
					property1: "delete string",
				} ), Resource.createFrom( {
					id: "_:blank-node",
					property2: "add string",
				} ) );

				expect( deltaCreator[ "updateLists" ] ).toEqual( [] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [
					new SubjectToken( new IRIToken( "http://example.org/resource/#fragment" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "10" ).setType( new IRIToken( XSD.integer ) ) )
						),
					new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property2" ) )
							.addObject( new LiteralToken( "add string" ) )
						),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [
					new SubjectToken( new IRIToken( "http://example.org/resource/" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property" ) )
							.addObject( new LiteralToken( "string" ) )
						),
					new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
						.addPredicate( new PredicateToken( new IRIToken( "http://example.org/vocab#property1" ) )
							.addObject( new LiteralToken( "delete string" ) )
						),
				] );
			} );

		} );

		describe( method( INSTANCE, "getPatch" ), ():void => {

			it( hasSignature(
				"Returns the LD Patch string of the resources provided in `addResource` method.",
				{ type: "string" }
			), ():void => {
			} );


			it( "should exists", ():void => {
				expect( DeltaCreator.prototype.getPatch ).toBeDefined();
				expect( DeltaCreator.prototype.getPatch ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return LD Patch string", ():void => {
				const deltaCreator:DeltaCreator = new DeltaCreator( jsonldConverter );

				deltaCreator.addResource( ObjectSchemaDigester.digestSchema( {
					"@vocab": "http://example.org/vocab#",
					"schema": "http://schema.org",
					"xsd": XSD.namespace,
					"property1": {
						"@type": XSD.string,
					},
					"property2": {
						"@container": "@list",
					},
				} ), Resource.createFrom( {
					id: "http://example.org/resource/",
					property1: "string",
					property2: [ "string", 1, new Date(), Pointer.create( "_:blank-node" ) ],
				} ), Resource.createFrom( {
					id: "http://example.org/resource/",
				} ) );

				deltaCreator.addResource( ObjectSchemaDigester.digestSchema( {
					"@vocab": "http://example.org/vocab#",
					"schema": "http://schema.org",
					"resource": "http://example.org/resource/#",
					"xsd": XSD.namespace,
					"property1": {
						"@type": XSD.integer,
					},
					"property2": {
						"@container": "@list",
					},
				} ), Resource.createFrom( {
					id: "http://example.org/resource/#fragment",
					property2: [ 1, 2, 3, 4, 5 ],
				} ), Resource.createFrom( {
					id: "http://example.org/resource/#fragment",
					property1: 10.01,
					property2: [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ],
				} ) );

				deltaCreator.addResource( ObjectSchemaDigester.digestSchema( {
					"@vocab": "http://example.org/vocab#",
					"schema": "http://schema.org",
					"xsd": XSD.namespace,
					"property1": {
						"@type": XSD.string,
					},
					"property2": {
						"@type": XSD.string,
					},
				} ), Resource.createFrom( {
					id: "_:blank-node",
					property1: "delete string",
				} ), Resource.createFrom( {
					id: "_:blank-node",
					property2: "add string",
				} ) );

				expect( deltaCreator.getPatch() ).toBe( `` +
					`@prefix xsd: <${ XSD.namespace }>. ` +
					`@prefix resource: <http://example.org/resource/#>. ` +
					`UpdateList <http://example.org/resource/> <http://example.org/vocab#property2> 0.. (). ` +
					`UpdateList resource:fragment <http://example.org/vocab#property2> 3..5 (). ` +
					`UpdateList resource:fragment <http://example.org/vocab#property2> 0..0 ( "4"^^xsd:float ). ` +
					`UpdateList resource:fragment <http://example.org/vocab#property2> 3..3 ( "s-1" "s-2" "s-3" ). ` +
					`Add { ` +
					`` + `resource:fragment <http://example.org/vocab#property1> "10"^^xsd:integer. ` +
					`` + `_:blank-node <http://example.org/vocab#property2> "add string". ` +
					`}. ` +
					`Delete { ` +
					`` + `<http://example.org/resource/> <http://example.org/vocab#property1> "string"; ` +
					`` + `` + `<http://example.org/vocab#property2> (). ` +
					`` + `_:blank-node <http://example.org/vocab#property1> "delete string". ` +
					`}.` +
					``
				);
			} );

		} );

	} );

} );
