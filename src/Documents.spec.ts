/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/jasmine-ajax/mock-ajax.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	submodule,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

	MethodArgument,
} from "./test/JasmineExtender";

import Context from "./Context";
import Documents from "./Documents";
import * as PersistedDocument from "./PersistedDocument";

import * as Utils from "./Utils";

// TODO: Add description
describe( module( "Carbon/Documents", "" ), ():void => {

	beforeEach( ():void => {
		jasmine.Ajax.install();
	} );

	afterEach( ():void => {
		jasmine.Ajax.uninstall();
	} );

	it( isDefined(), ():void => {
		expect( Documents ).toBeDefined();
	});

	it( hasMethod( INSTANCE, "get", [
		{ name:"uri", type:"string" }
	], { type:"Promise<Carbon.HTTP.ProcessedResponse<Carbon.Document>>"}), ( done:(() => void) & { fail:( error?:any ) => void } ):void => {
		let promises:Promise<any>[] = [];

		class MockedContext extends Context {
			resolve( uri:string ):string {
				return uri;
			}
		}

		let context:MockedContext = new MockedContext();
		let documents:Documents = context.Documents;

		let responseBody:string = JSON.stringify({
			"@id": "http://example.com/resource/",
			"@graph": [
				{
					"@id": "http://example.com/resource/",
					"http://example.com/ns#string": [{ "@value": "Document Resource" }],
					"http://example.com/ns#pointerSet": [
						{ "@id": "_:1" },
						{ "@id": "_:2" },
						{ "@id": "http://example.com/resource/#1" },
						{ "@id": "http://example.com/external-resource/" },
					],
				},
				{
					"@id": "_:1",
					"http://example.com/ns#string": [{ "@value": "Fragment 1" }],
					"http://example.com/ns#pointerSet": [
						{ "@id": "http://example.com/resource/" },
						{ "@id": "http://example.com/resource/#1" },
					],
				},
				{
					"@id": "_:2",
					"http://example.com/ns#string": [{ "@value": "Fragment 2" }],
				},
				{
					"@id": "http://example.com/resource/#1",
					"http://example.com/ns#string": [{ "@value": "NamedFragment 1" }],
				},
				{
					"@id": "http://example.com/resource/#2",
					"http://example.com/ns#string": [{ "@value": "NamedFragment 1" }],
				},
			],
		});

		let mainContext:ContextDigester.Context = {
			"ex": "http://example.com/ns#",
			"xsd": "http://www.w3.org/2001/XMLSchema#",
			"string": {
				"@id": "ex:string",
				"@type": "xsd:string",
			},
			"date": {
				"@id": "ex:date",
				"@type": "xsd:dateTime",
			},
			"numberList": {
				"@id": "ex:numberList",
				"@type": "xsd:integer",
				"@container": "@list",
			},
			"languageMap": {
				"@id": "ex:languageMap",
				"@container": "@language",
			},
			"pointer": {
				"@id": "ex:pointer",
				"@type": "@id",
			},
			"pointerList": {
				"@id": "ex:pointerList",
				"@type": "@id",
				"@container": "@list",
			},
			"pointerSet": {
				"@id": "ex:pointerSet",
				"@type": "@id",
				"@container": "@set",
			},
		};

		context.expandMainContext( mainContext );

		jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "GET" ).andReturn( {
			status: 200,
			responseHeaders: [
				{ "name": "ETag", "value": "162458126348712643" }
			],
			responseText: responseBody,
		} );

		promises.push( documents.get( "http://example.com/resource/" ).then( ( processedResponse:any ):void => {
			expect( processedResponse ).toBeDefined();

			let document:PersistedDocument.Class = processedResponse.result;
			expect( document ).toBeDefined();
			expect( Utils.isObject( document ) ).toEqual( true );

			// TODO: Finish assertions
		}) );

		Promise.all( promises ).then( ():void => {
			done();
		}, ( error:Error ):void => {
			error = !! error ? error : new Error( "Unknown error" );
			done.fail( error );
		});
	});
});
