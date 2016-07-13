import * as RDFRepresentation from "./RDFRepresentation";
import {module, isDefined, hasProperty, STATIC, clazz, hasMethod, hasSignature, method, decoratedObject, INSTANCE} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as PersistedDocument from "./PersistedDocument";
import AbstractContext from "./AbstractContext";
import * as Resource from "./Resource";

describe( module( "Carbon/RDFRepresentation" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFRepresentation ).toBeDefined();
		expect( Utils.isObject( RDFRepresentation ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( RDFRepresentation.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( RDFRepresentation.RDF_CLASS ) ).toBe( true );

		expect( RDFRepresentation.RDF_CLASS ).toBe( NS.C.Class.RDFRepresentation );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( RDFRepresentation.SCHEMA ).toBeDefined();
		expect( Utils.isObject( RDFRepresentation.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( RDFRepresentation.SCHEMA, "mediaType" ) ).toBe( true );
		expect( RDFRepresentation.SCHEMA[ "mediaType" ] ).toEqual( {
			"@id": NS.C.Predicate.mediaType,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( RDFRepresentation.SCHEMA, "size" ) ).toBe( true );
		expect( RDFRepresentation.SCHEMA[ "size" ] ).toEqual( {
			"@id": NS.C.Predicate.size,
			"@type": NS.XSD.DataType.long,
		} );
	} );

	describe( clazz(
		"Carbon.RDFRepresentation.Factory",
		"Factory class for `Carbon.RDFRepresentation.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFRepresentation.Factory ).toBeDefined();
			expect( Utils.isFunction( RDFRepresentation.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.RDFRepresentation.Class` object.", [
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFRepresentation.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( RDFRepresentation.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				mediaType: null,
				size: null,
				download: ():void => {},
			};
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.mediaType;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );
			object.mediaType = null;

			delete object.size;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );
			object.size = null;

			delete object.download;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );
			object.download = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.RDFRepresentation.Class` object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFRepresentation.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RDFRepresentation.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.download = ():void => {};
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let context:AbstractContext = new MockedContext();

			object = PersistedDocument.Factory.create( "", context.documents );
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.download = ():void => {};
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.types.push( RDFRepresentation.RDF_CLASS );
			expect( RDFRepresentation.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate", [
				{name: "persistedDocument", type: "T extends Carbon.PersistedDocument.Class"},
			],
			{type: "T & Carbon.RDFRepresentation.Class"}
		), ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let context:AbstractContext = new MockedContext();
			let document:PersistedDocument.Class;

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			document.types.push( NS.C.Class.RDFRepresentation );
			let rdfRepresentation:RDFRepresentation.Class = RDFRepresentation.Factory.decorate( document );

			expect( RDFRepresentation.Factory.hasRDFClass( rdfRepresentation ) ).toBe( true );

			rdfRepresentation.mediaType = "text/plain";
			rdfRepresentation.size = 68;
			expect( RDFRepresentation.Factory.is( rdfRepresentation ) ).toBe( true );
		} );

		describe( method(
			STATIC,
			"hasRDFClass"
		), ():void => {

			it( hasSignature(
				"Returns true if the Resource provided is an RDFRepresentation.", [
					{name: "resource", type: "Carbon.Resource.Class"},
				],
				{type: "boolean"}
			), ():void => {
				expect( RDFRepresentation.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( RDFRepresentation.Factory.hasRDFClass ) ).toBe( true );

				let resource:Resource.Class;

				resource = Resource.Factory.create();
				expect( RDFRepresentation.Factory.hasRDFClass( resource ) ).toBe( false );

				resource = Resource.Factory.create( "http://example.com/resource/" );
				expect( RDFRepresentation.Factory.hasRDFClass( resource ) ).toBe( false );

				resource = Resource.Factory.create( "http://example.com/resource/", [ NS.LDP.Class.BasicContainer ] );
				expect( RDFRepresentation.Factory.hasRDFClass( resource ) ).toBe( false );

				resource = Resource.Factory.create( "http://example.com/resource/", [ NS.C.Class.RDFRepresentation ] );
				expect( RDFRepresentation.Factory.hasRDFClass( resource ) ).toBe( true );

				resource = Resource.Factory.create( "http://example.com/resource/", [ NS.LDP.Class.BasicContainer, NS.C.Class.RDFRepresentation ] );
				expect( RDFRepresentation.Factory.hasRDFClass( resource ) ).toBe( true );
			} );

			it( hasSignature(
				"Returns true if the Object provided is an LDP RDFRepresentation.", [
					{name: "expandedObject", type: "Object"},
				],
				{type: "boolean"}
			), ():void => {
				expect( RDFRepresentation.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( RDFRepresentation.Factory.hasRDFClass ) ).toBe( true );

				expect( RDFRepresentation.Factory.hasRDFClass( {} ) ).toBe( false );

				let object:Object;

				object = {
					"@id": "http://example.com/resource/",
					"@type": [],
					"http://example.com/ns#string": [ {
						"@value": "a string",
					} ],
					"http://example.com/ns#integer": [ {
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					} ],
				};
				expect( RDFRepresentation.Factory.hasRDFClass( object ) ).toBe( false );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#BasicContainer",
					],
					"http://example.com/ns#string": [ {
						"@value": "a string",
					} ],
					"http://example.com/ns#integer": [ {
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					} ],
				};
				expect( RDFRepresentation.Factory.hasRDFClass( object ) ).toBe( false );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						`${NS.C.Class.RDFRepresentation}`,
					],
					"http://example.com/ns#string": [ {
						"@value": "a string",
					} ],
					"http://example.com/ns#integer": [ {
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					} ],
				};
				expect( RDFRepresentation.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						`${NS.C.Class.RDFRepresentation}`,
						"http://www.w3.org/ns/ldp#BasicContainer",
					],
					"http://example.com/ns#string": [ {
						"@value": "a string",
					} ],
					"http://example.com/ns#integer": [ {
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					} ],
				};
				expect( RDFRepresentation.Factory.hasRDFClass( object ) ).toBe( true );
			} );

		} );

		describe( decoratedObject(
			"Object decorated by the Carbon.RDFRepresentation.Factory.decorate function.", [
				"Carbon.RDFRepresentation.Class",
			]
		), ():void => {

			it( hasMethod(
				INSTANCE,
				"download",
				"Returns a Blob of the file resolved from the server.",
				{type: "Promise<[ Blob, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
				let rdfRepresentation:RDFRepresentation.Class = RDFRepresentation.Factory.decorate( document );

				expect( rdfRepresentation.download ).toBeDefined();
				expect( Utils.isFunction( rdfRepresentation.download ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "download" );
				rdfRepresentation.download();

				expect( spy ).toHaveBeenCalledWith( rdfRepresentation );
			} );

		} );

	} );

} );
