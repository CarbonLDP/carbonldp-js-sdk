import {
	BlankNodeToken,
	CollectionToken,
	IRIRefToken,
	LanguageToken,
	LiteralToken,
	PrefixedNameToken,
	PropertyToken,
	RDFLiteralToken,
	SubjectToken,
} from "sparqler/tokens";

import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { Pointer } from "../Pointer/Pointer";

import { XSD } from "../Vocabularies/XSD";

import { DeltaCreator } from "./DeltaCreator";

import { AddToken, DeleteToken, PrefixToken, SliceToken, UpdateListToken } from "./Tokens";


describe( "DeltaCreator", () => {

	it( "should exist", () => {
		expect( DeltaCreator ).toBeDefined();
		expect( DeltaCreator ).toEqual( jasmine.any( Function ) );
	} );

	let context:Context;
	beforeEach( () => {
		context = createMockContext();
	} );

	describe( "DeltaCreator.constructor", () => {

		it( "should exist", () => {
			const delta:DeltaCreator = new DeltaCreator( context );
			expect( delta ).toBeDefined();
			expect( delta ).toEqual( jasmine.any( DeltaCreator ) );
		} );


		it( "should initialize the LD Patch add token", () => {
			const delta:DeltaCreator = new DeltaCreator( context );
			expect( delta[ "addToken" ] ).toEqual( new AddToken() );
		} );

		it( "should initialize the LD Patch delete token", () => {
			const delta:DeltaCreator = new DeltaCreator( context );
			expect( delta[ "deleteToken" ] ).toEqual( new DeleteToken() );
		} );

		it( "should initialize the LD Patch update lists tokens", () => {
			const delta:DeltaCreator = new DeltaCreator( context );
			expect( delta[ "updateLists" ] ).toEqual( [] );
		} );

	} );

	describe( "DeltaCreator.addResource", () => {

		it( "should exist", () => {
			expect( DeltaCreator.prototype.addResource ).toBeDefined();
			expect( DeltaCreator.prototype.addResource ).toEqual( jasmine.any( Function ) );
		} );


		describe( "When property not in the schema", () => {

			let id:string;
			beforeEach( () => {
				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
				} );
				id = "http://example.org/resource/";
			} );

			it( "should guess deleted string", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: "string",
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted number", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: 1,
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted boolean", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: true,
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted date", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: new Date( "2000-01-01" ),
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted resource pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted blank node pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: Pointer.create( { $id: "_:blank-node" } ),
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new BlankNodeToken( "_:blank-node" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted array", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
						.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should ignore deleted functions", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: [
						"valid value",
						() => {},
					],
					invalidFunction():void {},
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "valid value" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should ignore deleted unsupported elements", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: [
						"valid value",
						new Map(),
						new Set(),
					],
					property1: {},
					property2: new Map(),
					property3: new Set(),
				};
				const currentResource:object = {};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "valid value" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );


			it( "should guess added string", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );


				const previousResource:object = {};
				const currentResource:object = {
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should guess added number", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: 1,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should guess added boolean", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: true,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
					),
				] );
			} );

			it( "should guess added date", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: new Date( "2000-01-01" ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
					),
				] );
			} );

			it( "should guess added resource pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
			} );

			it( "should guess added blank node pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: Pointer.create( { $id: "_:blank-node" } ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new BlankNodeToken( "_:blank-node" ) )
					),
				] );
			} );

			it( "should guess added array", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
						.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should ignore added functions", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: [
						"valid value",
						() => {},
					],
					invalidFunction():void {},
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "valid value" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should ignore added unsupported elements", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {};
				const currentResource:object = {
					property: [
						"valid value",
						{},
						new Map(),
						new Set(),
					],
					property1: {},
					property2: new Map(),
					property3: new Set(),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "valid value" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );


			it( "should delete new property if set to null", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: "string",
				};
				const currentResource:object = {
					property: null,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should delete new property if set to undefined", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: "string",
				};
				const currentResource:object = {
					property: void 0,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add old property if set to null", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: void 0,
				};
				const currentResource:object = {
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add old property if set to undefined", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: void 0,
				};
				const currentResource:object = {
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );


			it( "should detect added and deleted elements from an array", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					property: [
						"delete string",
						10,
						10,
						true,
						true,
						false,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "_:1" } ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};
				const currentResource:object = {
					property: [
						Pointer.create( { $id: "http://example.org/pointer/" } ),
						new Date( "2000-01-01" ),
						new Date( "2010-10-10" ),
						true,
						10,
						10.01,
						"add string",
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "delete string" ) )
						.addObject( new RDFLiteralToken( "false", new IRIRefToken( XSD.boolean ) ) )
						.addObject( new BlankNodeToken( "_:1" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "2010-10-10T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
						.addObject( new RDFLiteralToken( "10.01", new IRIRefToken( XSD.float ) ) )
						.addObject( new LiteralToken( "add string" ) )
					),
				] );
			} );


			it( "should detect deleted types", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				const previousResource:object = {
					types: [ "http://example.org/vocab#Document", "Type-1", "Type-2" ],
				};
				const currentResource:object = {
					types: [ "Type-1" ],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( "a" )
						.addObject( new IRIRefToken( "http://example.org/vocab#Document" ) )
						.addObject( new IRIRefToken( "http://example.org/vocab#Type-2" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

		} );

		describe( "When property in the schema", () => {

			let id:string;
			beforeEach( () => {
				id = "http://example.org/resource/";
			} );

			it( "should add deleted string", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted string with language", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
						"@language": "en",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "string", new LanguageToken( "en" ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted integer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.integer,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: 1,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.integer ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted float", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.float,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: 10.01,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "10.01", new IRIRefToken( XSD.float ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted boolean", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#the-property",
						"@type": XSD.boolean,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: true,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#the-property" ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted date", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.date,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: new Date( "2000-01-01" ),
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "2000-01-01", new IRIRefToken( XSD.date ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted resource pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": "@id",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted blank node pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": "@id",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "_:blank-node" } ),
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new BlankNodeToken( "_:blank-node" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted first element from array without a type an container", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should guess deleted set without a type", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@container": "@set",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
						.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted string set", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@container": "@set",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string 1",
						"string 2",
						"string 3",
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string 1" ) )
						.addObject( new LiteralToken( "string 2" ) )
						.addObject( new LiteralToken( "string 3" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted language map", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
						"@container": "@language",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: {
						"en": "string",
						"en-US": "US string",
						"es": "cadena",
					},
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "string", new LanguageToken( "en" ) ) )
						.addObject( new RDFLiteralToken( "US string", new LanguageToken( "en-US" ) ) )
						.addObject( new RDFLiteralToken( "cadena", new LanguageToken( "es" ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted list without a type", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "updateLists" ] ).toEqual( [
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 0 ),
						new CollectionToken()
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new CollectionToken() )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add deleted string list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.string,
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string 1",
						"string 2",
						"string 3",
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "updateLists" ] ).toEqual( [
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 0 ),
						new CollectionToken()
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new CollectionToken() )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );


			it( "should add added string", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added string with language", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
						"@language": "en",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "string", new LanguageToken( "en" ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added integer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.integer,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: 1,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.integer ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added float", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.float,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: 10.01,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "10.01", new IRIRefToken( XSD.float ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added boolean", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#the-property",
						"@type": XSD.boolean,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: true,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#the-property" ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added date", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.date,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: new Date( "2000-01-01" ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "2000-01-01", new IRIRefToken( XSD.date ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added resource pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": "@id",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added blank node pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": "@id",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "_:blank-node" } ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new BlankNodeToken( "_:blank-node" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should guess added first element from set without a type an container", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should guess added set without a type", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@container": "@set",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
						.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
						.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
						.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added string set", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@container": "@set",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string 1",
						"string 2",
						"string 3",
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string 1" ) )
						.addObject( new LiteralToken( "string 2" ) )
						.addObject( new LiteralToken( "string 3" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added language map", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
						"@container": "@language",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: {
						"en": "string",
						"en-US": "US string",
						"es": "cadena",
					},
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "string", new LanguageToken( "en" ) ) )
						.addObject( new RDFLiteralToken( "US string", new LanguageToken( "en-US" ) ) )
						.addObject( new RDFLiteralToken( "cadena", new LanguageToken( "es" ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should guess added list without a type", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string",
						1,
						true,
						new Date( "2000-01-01" ),
						Pointer.create( { $id: "http://example.org/pointer/" } ),
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new CollectionToken()
							.addObject( new LiteralToken( "string" ) )
							.addObject( new RDFLiteralToken( "1", new IRIRefToken( XSD.float ) ) )
							.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
							.addObject( new RDFLiteralToken( "2000-01-01T00:00:00.000Z", new IRIRefToken( XSD.dateTime ) ) )
							.addObject( new IRIRefToken( "http://example.org/pointer/" ) )
						)
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add added string list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.string,
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						"string 1",
						"string 2",
						"string 3",
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new CollectionToken()
							.addObject( new LiteralToken( "string 1" ) )
							.addObject( new LiteralToken( "string 2" ) )
							.addObject( new LiteralToken( "string 3" ) )
						)
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );


			it( "should delete new property if set to null", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: null,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
			} );

			it( "should delete new property if set to undefined", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: void 0,
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
			} );

			it( "should add old property if set to null", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: void 0,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add old property if set to undefined", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: void 0,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );


			it( "should allow relative strings to be converted to pointers", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": "@id",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: "pointer",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new IRIRefToken( "http://example.org/vocab#pointer" ) )
					),
				] );
			} );

			it( "should allow absolute strings to be converted to pointers", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": "@id",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: "http://example.org/pointer",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new IRIRefToken( "http://example.org/pointer" ) )
					),
				] );
			} );

			it( "should ignore non supported value to be pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
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

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property1: {},
					property2: 1,
					property3: true,
					property4: new Date(),
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );


			it( "should detect added and deleted elements from an integer set", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.integer,
						"@container": "@set",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						1,
						10,
						10.01,
						12345,
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						1,
						10,
						10,
						67890,
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "12345", new IRIRefToken( XSD.integer ) ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "67890", new IRIRefToken( XSD.integer ) ) )
					),
				] );
			} );


			it( "should detect added and deleted elements from a list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						1,
						10,
						10.01,
						12345,
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						10,
						1,
						10.01,
						67890,
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "updateLists" ] ).toEqual( [
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 1, 2 ),
						new CollectionToken()
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 2, 3 ),
						new CollectionToken()
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 0, 0 ),
						new CollectionToken()
							.addObject( new RDFLiteralToken( "10", new IRIRefToken( XSD.float ) ) )
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 3, 3 ),
						new CollectionToken()
							.addObject( new RDFLiteralToken( "67890", new IRIRefToken( XSD.float ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should detect added and deleted elements from an integer list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.integer,
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [
						1,
						10,
						10.01,
						12345,
					],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [
						10,
						1,
						10.01,
						67890,
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "updateLists" ] ).toEqual( [
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 2, 4 ),
						new CollectionToken()
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 0, 0 ),
						new CollectionToken()
							.addObject( new RDFLiteralToken( "10", new IRIRefToken( XSD.integer ) ) )
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 3, 3 ),
						new CollectionToken()
							.addObject( new RDFLiteralToken( "67890", new IRIRefToken( XSD.integer ) ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should compact updates list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: [ 1, 2, 3, 4, 5, 6 ],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: [ 4, 1, 2, "s-1", "s-2", 6, "s-3", 3 ],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "updateLists" ] ).toEqual( [
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 3, 6 ),
						new CollectionToken()
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 0, 0 ),
						new CollectionToken()
							.addObject( new RDFLiteralToken( "4", new IRIRefToken( XSD.float ) ) )
					),
					new UpdateListToken(
						new IRIRefToken( "http://example.org/resource/" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 3, 3 ),
						new CollectionToken()
							.addObject( new LiteralToken( "s-1" ) )
							.addObject( new LiteralToken( "s-2" ) )
							.addObject( new RDFLiteralToken( "6", new IRIRefToken( XSD.float ) ) )
							.addObject( new LiteralToken( "s-3" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

		} );

		describe( "When prefix in schema", () => {

			let id:string;
			beforeEach( () => {
				id = "http://example.org/resource/";
			} );

			it( "should compact literal type", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"xsd": XSD.namespace,
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: true,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "true", new PrefixedNameToken( "xsd", "boolean" ) ) )
					),
				] );
			} );

			it( "should add literal type prefix in the prefix map", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"xsd": XSD.namespace,
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: true,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
					[ "xsd", new PrefixToken( "xsd", new IRIRefToken( XSD.namespace ) ) ],
				] ) );
			} );

			it( "should compact property URI", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"ex": "http://example.org/vocab#",
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: true,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "ex", "property" ) )
						.addObject( new RDFLiteralToken( "true", new IRIRefToken( XSD.boolean ) ) )
					),
				] );
			} );

			it( "should add property's prefix in the prefix map", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"ex": "http://example.org/vocab#",
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					property: true,
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
					[ "ex", new PrefixToken( "ex", new IRIRefToken( "http://example.org/vocab#" ) ) ],
				] ) );
			} );

			it( "should compact any pointer", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"base": "http://example.org/",
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new PrefixedNameToken( "base", "resource/" ) )
					.addProperty( new PropertyToken( new PrefixedNameToken( "base", "vocab#property" ) )
						.addObject( new PrefixedNameToken( "base", "pointer/" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should add pointer's prefix to the prefix map", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"base": "http://example.org/",
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
					[ "base", new PrefixToken( "base", new IRIRefToken( "http://example.org/" ) ) ],
				] ) );
			} );


			it( "should add used prefixes", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"base": "http://example.org/",
					"xsd": XSD.namespace,
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					integers: [ 1 ],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
					integers: [ 1, 2 ],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
					[ "xsd", new PrefixToken( "xsd", new IRIRefToken( XSD.namespace ) ) ],
					[ "base", new PrefixToken( "base", new IRIRefToken( "http://example.org/" ) ) ],
				] ) );
			} );

			it( "should ignore unused prefixes", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"base": "http://example.org/",
					"xsd": XSD.namespace,
				} );

				const previousResource:object = {
					$id: "http://example.org/resource/",
					integers: [ 1, 2 ],
				};
				const currentResource:object = {
					$id: "http://example.org/resource/",
					property: Pointer.create( { $id: "http://example.org/pointer/" } ),
					integers: [ 1, 2 ],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "prefixesMap" ] ).toEqual( new Map( [
					[ "base", new PrefixToken( "base", new IRIRefToken( "http://example.org/" ) ) ],
				] ) );
			} );

		} );

		describe( "When blank node resource", () => {

			let id:string;
			beforeEach( () => {
				id = "_:blank-node";
			} );

			it( "should delete simple properties", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "_:blank-node",
					property: "string",
				};
				const currentResource:object = {
					$id: "_:blank-node",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add simple properties", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "_:blank-node",
				};
				const currentResource:object = {
					$id: "_:blank-node",
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should delete simple properties", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"@vocab": "http://example.org/vocab#",
					"property": {
						"@type": XSD.string,
					},
				} );

				const previousResource:object = {
					$id: "_:blank-node",
				};
				const currentResource:object = {
					$id: "_:blank-node",
					property: "string",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			} );

			it( "should delete list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.string,
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "_:blank-node",
					property: [
						"string 1",
						"string 2",
						"string 3",
					],
				};
				const currentResource:object = {
					$id: "_:blank-node",
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "updateLists" ] ).toEqual( [
					new UpdateListToken(
						new BlankNodeToken( "_:blank-node" ),
						new IRIRefToken( "http://example.org/vocab#property" ),
						new SliceToken( 0 ),
						new CollectionToken()
					),
				] );
				expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new CollectionToken() )
					),
				] );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
			} );

			it( "should add list", () => {
				const deltaCreator:DeltaCreator = new DeltaCreator( context );

				context.extendObjectSchema( {
					"property": {
						"@id": "http://example.org/vocab#property",
						"@type": XSD.string,
						"@container": "@list",
					},
				} );

				const previousResource:object = {
					$id: "_:blank-node",
				};
				const currentResource:object = {
					$id: "_:blank-node",
					property: [
						"string 1",
						"string 2",
						"string 3",
					],
				};

				deltaCreator.addResource( id, previousResource, currentResource );
				expect( deltaCreator[ "addToken" ].triples ).toEqual( [ new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
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

		it( "should append multiple resources changes", () => {
			const deltaCreator:DeltaCreator = new DeltaCreator( context );

			spyOnDecorated( context.registry, "getSchemaFor" ).and.callFake( object => {
				if( object.$id === "http://example.org/resource/" )
					return ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.string,
						},
					} );

				if( object.$id === "http://example.org/resource/#fragment" )
					return ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property": {
							"@type": XSD.integer,
						},
					} );

				if( object.$id === "_:blank-node" )
					return ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"property1": {
							"@type": XSD.string,
						},
						"property2": {
							"@type": XSD.string,
						},
					} );
			} );

			deltaCreator.addResource(
				"http://example.org/resource/",
				{
					id: "http://example.org/resource/",
					property: "string",
				},
				{
					id: "http://example.org/resource/",
				}
			);

			deltaCreator.addResource(
				"http://example.org/resource/#fragment",
				{},
				{ property: 10.01 }
			);

			deltaCreator.addResource(
				"_:blank-node",
				{
					property1: "delete string",
				},
				{
					$id: "_:blank-node",
					property2: "add string",
				}
			);

			expect( deltaCreator[ "updateLists" ] ).toEqual( [] );
			expect( deltaCreator[ "addToken" ].triples ).toEqual( [
				new SubjectToken( new IRIRefToken( "http://example.org/resource/#fragment" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new RDFLiteralToken( "10", new IRIRefToken( XSD.integer ) ) )
					),
				new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property2" ) )
						.addObject( new LiteralToken( "add string" ) )
					),
			] );
			expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [
				new SubjectToken( new IRIRefToken( "http://example.org/resource/" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property" ) )
						.addObject( new LiteralToken( "string" ) )
					),
				new SubjectToken( new BlankNodeToken( "_:blank-node" ) )
					.addProperty( new PropertyToken( new IRIRefToken( "http://example.org/vocab#property1" ) )
						.addObject( new LiteralToken( "delete string" ) )
					),
			] );
		} );


		it( "should ignore ID when only in current", () => {
			const deltaCreator:DeltaCreator = new DeltaCreator( context );

			const id:string = "http://example.org/resource/";

			const previousResource:object = {};
			const currentResource:object = {
				$id: "https://example.com/resource/",
			};

			deltaCreator.addResource( id, previousResource, currentResource );
			expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
		} );

		it( "should ignore ID when only in previous", () => {
			const deltaCreator:DeltaCreator = new DeltaCreator( context );

			deltaCreator.addResource(
				"http://example.org/resource/",
				{
					$id: "https://example.com/resource/",
				},
				{}
			);

			expect( deltaCreator[ "deleteToken" ].triples ).toEqual( [] );
			expect( deltaCreator[ "addToken" ].triples ).toEqual( [] );
		} );

	} );

	describe( "DeltaCreator.getPatch", () => {
		it( "should exist", () => {
			expect( DeltaCreator.prototype.getPatch ).toBeDefined();
			expect( DeltaCreator.prototype.getPatch ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return LD Patch string", () => {
			const deltaCreator:DeltaCreator = new DeltaCreator( context );

			spyOnDecorated( context.registry, "getSchemaFor" ).and.callFake( object => {
				if( object.$id === "http://example.org/resource/" )
					return ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"schema": "http://schema.org",
						"xsd": XSD.namespace,
						"property1": {
							"@type": XSD.string,
						},
						"property2": {
							"@container": "@list",
						},
					} );

				if( object.$id === "http://example.org/resource/#fragment" )
					return ObjectSchemaDigester.digestSchema( {
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
					} );

				if( object.$id === "_:blank-node" )
					return ObjectSchemaDigester.digestSchema( {
						"@vocab": "http://example.org/vocab#",
						"schema": "http://schema.org",
						"xsd": XSD.namespace,
						"property1": {
							"@type": XSD.string,
						},
						"property2": {
							"@type": XSD.string,
						},
					} );
			} );

			deltaCreator.addResource(
				"http://example.org/resource/",
				{
					property1: "string",
					property2: [ "string", 1, new Date(), Pointer.create( { $id: "_:blank-node" } ) ],
				},
				{
					$id: "http://example.org/resource/",
				}
			);

			deltaCreator.addResource(
				"http://example.org/resource/#fragment",
				{
					property2: [ 1, 2, 3, 4, 5 ],
				},
				{
					property1: 10.01,
					property2: [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ],
				}
			);

			deltaCreator.addResource(
				"_:blank-node",
				{
					property1: "delete string",
				},
				{
					property2: "add string",
				}
			);

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
