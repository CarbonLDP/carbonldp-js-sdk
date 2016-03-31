import * as NonRDFSource from "./RDFRepresentation";
import {module, isDefined, hasProperty, STATIC, clazz, hasMethod, hasSignature, method, decoratedObject, INSTANCE} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as PersistedDocument from "./PersistedDocument";
import AbstractContext from "./AbstractContext";
import * as Resource from "./Resource";

describe( module( "Carbon/NonRDFSource" ), ():void => {

	it( isDefined(), ():void => {
		expect( NonRDFSource ).toBeDefined();
		expect( Utils.isObject( NonRDFSource ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( NonRDFSource.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( NonRDFSource.RDF_CLASS ) ).toBe( true );

		expect( NonRDFSource.RDF_CLASS ).toBe( NS.C.Class.RDFRepresentation );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( NonRDFSource.SCHEMA ).toBeDefined();
		expect( Utils.isObject( NonRDFSource.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( NonRDFSource.SCHEMA, "fileIdentifier" ) ).toBe( true );
		expect( NonRDFSource.SCHEMA[ "fileIdentifier" ] ).toEqual({
			"@id": NS.C.Predicate.fileIdentifier,
			"@type": NS.XSD.DataType.string
		});

		expect( Utils.hasProperty( NonRDFSource.SCHEMA, "mediaType" ) ).toBe( true );
		expect( NonRDFSource.SCHEMA[ "mediaType" ] ).toEqual({
			"@id": NS.C.Predicate.mediaType,
			"@type": NS.XSD.DataType.string
		});

		expect( Utils.hasProperty( NonRDFSource.SCHEMA, "size" ) ).toBe( true );
		expect( NonRDFSource.SCHEMA[ "size" ] ).toEqual({
			"@id": NS.C.Predicate.size,
			"@type": NS.XSD.DataType.long
		});
	});

	describe( clazz(
		"Carbon.NonRDFSource.Factory",
		"Factory class for `Carbon.NonRDFSource.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( NonRDFSource.Factory ).toBeDefined();
			expect( Utils.isFunction( NonRDFSource.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.NonRDFSource.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( NonRDFSource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( NonRDFSource.Factory.hasClassProperties ) ).toBe( true );

			let object:any = {};
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );

			object.fileIdentifier = "Identifier-of-the-file";
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.size = 1000;
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );

			object.getFile = ():void => {};
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.NonRDFSource.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( NonRDFSource.Factory.is ).toBeDefined();
			expect( Utils.isFunction( NonRDFSource.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.fileIdentifier = "Identifier-of-the-file";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.getFile = ():void => {};
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let context:AbstractContext = new MockedContext();

			object = PersistedDocument.Factory.create( "", context.documents );
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.fileIdentifier = "Identifier-of-the-file";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.getFile = ():void => {};
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.types.push( NonRDFSource.RDF_CLASS );
			expect( NonRDFSource.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"decorate", [
				{ name: "persistedDocument", type: "T extends Carbon.PersistedDocument.Class" }
			],
			{ type: "T & Carbon.NonRDFSource.Class" }
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
			let nonRDFSource:NonRDFSource.Class = NonRDFSource.Factory.decorate( document );

			expect( NonRDFSource.Factory.hasRDFClass( nonRDFSource ) ).toBe( true );

			nonRDFSource.mediaType = "text/plain";
			nonRDFSource.fileIdentifier = "00-01";
			nonRDFSource.size = 68;
			expect( NonRDFSource.Factory.is( nonRDFSource ) ).toBe( true );
		});

		describe( method(
			STATIC,
			"hasRDFClass"
		), ():void => {

			it( hasSignature(
				"Returns true if the Resource provided is an NonRDFSource.", [
					{ name: "resource", type: "Carbon.Resource.Class" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( NonRDFSource.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( NonRDFSource.Factory.hasRDFClass ) ).toBe( true );

				let resource:Resource.Class;

				resource = Resource.Factory.create();
				expect( NonRDFSource.Factory.hasRDFClass( resource ) ).toBe( false );

				resource = Resource.Factory.create( "http://example.com/resource/" );
				expect( NonRDFSource.Factory.hasRDFClass( resource ) ).toBe( false );

				resource = Resource.Factory.create( "http://example.com/resource/", [ NS.LDP.Class.BasicContainer ]);
				expect( NonRDFSource.Factory.hasRDFClass( resource ) ).toBe( false );

				resource = Resource.Factory.create( "http://example.com/resource/", [ NS.C.Class.RDFRepresentation ] );
				expect( NonRDFSource.Factory.hasRDFClass( resource ) ).toBe( true );

				resource = Resource.Factory.create( "http://example.com/resource/", [ NS.LDP.Class.BasicContainer, NS.C.Class.RDFRepresentation ] );
				expect( NonRDFSource.Factory.hasRDFClass( resource ) ).toBe( true );
			});

			it( hasSignature(
				"Returns true if the Object provided is an LDP NonRDFSource.", [
					{ name: "expandedObject", type: "Object" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( NonRDFSource.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( NonRDFSource.Factory.hasRDFClass ) ).toBe( true );

				expect( NonRDFSource.Factory.hasRDFClass( {} ) ).toBe( false );

				let object:Object;

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( NonRDFSource.Factory.hasRDFClass( object ) ).toBe( false );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#BasicContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( NonRDFSource.Factory.hasRDFClass( object ) ).toBe( false );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						`${NS.C.Class.RDFRepresentation}`
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( NonRDFSource.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						`${NS.C.Class.RDFRepresentation}`,
						"http://www.w3.org/ns/ldp#BasicContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( NonRDFSource.Factory.hasRDFClass( object ) ).toBe( true );
			});

		});

		describe( decoratedObject(
			"Object decorated by the Carbon.NonRDFSource.Factory.decorate function.", [
				"Carbon.NonRDFSource.Class"
			]
		), ():void => {

			it( hasMethod(
				INSTANCE,
				"getFile",
				"Returns a Blob of the file resolved from the server.",
				{ type: "Promise<[ Blob, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				let context:AbstractContext = new MockedContext();
				let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
				let nonRDFSource:NonRDFSource.Class = NonRDFSource.Factory.decorate( document );

				expect( nonRDFSource.getFile ).toBeDefined();
				expect( Utils.isFunction( nonRDFSource.getFile ) ).toBe( true );

				let spy = spyOn( context.documents, "getFile" );
				nonRDFSource.getFile();

				expect( spy ).toHaveBeenCalledWith( nonRDFSource );
			});

		});

	});

});
