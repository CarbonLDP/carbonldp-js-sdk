/// <reference path="./../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="./../typings/es6-promise/es6-promise.d.ts" />

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

import * as Errors from "./Errors";
import * as Utils from "./Utils";

import * as ContextDecorator from "./ContextDecorator";

describe( module( "Carbon/ContextDecorator" ), ():void => {
	it( isDefined(), ():void => {
		expect( ContextDecorator ).toBeDefined();
		expect( Utils.isObject( ContextDecorator ) ).toEqual( true );
	});

	describe( clazz( "Carbon.ContextDecorator.Class", `

	`), ():void => {
		it( isDefined(), ():void => {
			expect( ContextDecorator.Class ).toBeDefined();
			expect( Utils.isFunction( ContextDecorator.Class ) ).toEqual( true );
		});

		describe( method( STATIC, "digestContext" ), ():void => {
			it( hasSignature( `
				Processes a context to standardize it before using it.
			`, [
				{ name: "context", type: "Carbon.ContextDecorator.Context" }
			], { type: "Carbon.ContextDecorator.DigestedContext" } ), ():void => {
				expect( ContextDecorator.Class.digestContext ).toBeDefined();
				expect( Utils.isFunction( ContextDecorator.Class.digestContext ) ).toBeDefined();

				let context:ContextDecorator.Context = {
					"skos": "http://www.w3.org/2004/02/skos/core#",
					"dct": "http://purl.org/dc/terms/",
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"hasTopConcept": {
						"@id": "skos:hasTopConcept",
						"@type": "@id",
						"@container": "@set",
					},
					"name": {
						"@id": "dct:name",
						"@type": "xsd:string",
					},
					"created": {
						"@id": "dct:created",
						"@type": "xsd:datetime",
					},
				};

				let digestedContext:ContextDecorator.DigestedContext = ContextDecorator.Class.digestContext( context );

				expect( digestedContext.prefixes.size ).toEqual( 3 );
				expect( digestedContext.prefixes.has( "skos" ) ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ) instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

				expect( digestedContext.properties.size ).toEqual( 3 );
				expect( digestedContext.properties.has( "hasTopConcept" ) ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ) instanceof ContextDecorator.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).literal ).toEqual( false );
				expect( digestedContext.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
				expect( digestedContext.properties.get( "hasTopConcept" ).containerType ).toEqual( ContextDecorator.ContainerType.SET );
				expect( digestedContext.properties.get( "hasTopConcept" ).language ).toEqual( null );

				expect( digestedContext.properties.has( "name" ) ).toEqual( true );
				expect( digestedContext.properties.get( "name" ) instanceof ContextDecorator.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literal ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
				expect( digestedContext.properties.get( "name" ).uri instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
				expect( digestedContext.properties.get( "name" ).containerType ).toEqual( null );
				expect( digestedContext.properties.get( "name" ).language ).toEqual( null );
			});

			it( hasSignature( `
				Processes several contexts to standardize and combine them before using them.
			`, [
				{ name: "contexts", type: "Array<Carbon.ContextDecorator.Context>" }
			], { type: "Carbon.ContextDecorator.DigestedContext" } ), ():void => {
				expect( ContextDecorator.Class.digestContext ).toBeDefined();
				expect( Utils.isFunction( ContextDecorator.Class.digestContext ) ).toBeDefined();

				let contexts:ContextDecorator.Context[] = [
					{
						"skos": "http://www.w3.org/2004/02/skos/core#",
						"dct": "http://purl.org/dc/terms/",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
					},
					{
						"hasTopConcept": {
							"@id": "skos:hasTopConcept",
							"@type": "@id",
							"@container": "@set",
						},
						"name": {
							"@id": "dct:name",
							"@type": "xsd:string",
						},
						"created": {
							"@id": "dct:created",
							"@type": "xsd:datetime",
						},
					},
				];

				let digestedContext:ContextDecorator.DigestedContext = ContextDecorator.Class.digestContext( contexts );

				expect( digestedContext.prefixes.size ).toEqual( 3 );
				expect( digestedContext.prefixes.has( "skos" ) ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ) instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

				expect( digestedContext.properties.size ).toEqual( 3 );
				expect( digestedContext.properties.has( "hasTopConcept" ) ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ) instanceof ContextDecorator.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).literal ).toEqual( false );
				expect( digestedContext.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
				expect( digestedContext.properties.get( "hasTopConcept" ).containerType ).toEqual( ContextDecorator.ContainerType.SET );
				expect( digestedContext.properties.get( "hasTopConcept" ).language ).toEqual( null );

				expect( digestedContext.properties.has( "name" ) ).toEqual( true );
				expect( digestedContext.properties.get( "name" ) instanceof ContextDecorator.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literal ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
				expect( digestedContext.properties.get( "name" ).uri instanceof ContextDecorator.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
				expect( digestedContext.properties.get( "name" ).containerType ).toEqual( null );
				expect( digestedContext.properties.get( "name" ).language ).toEqual( null );
			});
		});

		describe( method( STATIC, "compact" ), ():void => {
			// TODO: Improve signature description
			it( hasSignature( "", [
				{ name: "expandedObject", type: "any" },
				{ name: "context", type: "Carbon.ContextDecorator.Context" },
			], { type: "Object", description: "" } ), ():void => {
				expect( ContextDecorator.Class.compact ).toBeDefined();
				expect( Utils.isFunction( ContextDecorator.Class.compact ) ).toBeDefined();

				let expandedObject:any = {
					"@id": "http://example.com/resource-1/",
					"http://example.com/ns#string": [
						{ "@value": "some-string", "@type": "http://www.w3.org/2001/XMLSchema#string" },
					],
					"http://example.com/ns#date": [
						{ "@value": "2015-12-04T23:06:57.920Z", "@type": "http://www.w3.org/2001/XMLSchema#dateTime" },
					],
					"http://example.com/ns#numberList": [
						{
							"@list": [
								{ "@value": "2", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "3", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "4", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "5", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
								{ "@value": "6", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
							],
						},
					],
				};

				let context:ContextDecorator.Context = {
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
				};

				let compactedObject:any = ContextDecorator.Class.compact( expandedObject, context );

				expect( compactedObject ).toBeDefined();
				expect( Utils.isObject( compactedObject ) ).toEqual( true );

				expect( Utils.hasProperty( compactedObject, "string" ) ).toEqual( true );
				expect( compactedObject.string ).toEqual( "some-string" );

				expect( Utils.hasProperty( compactedObject, "date" ) ).toEqual( true );
				expect( Utils.isDate( compactedObject.date ) ).toEqual( true );

				expect( Utils.hasProperty( compactedObject, "numberList" ) ).toEqual( true );
				expect( Utils.isArray( compactedObject.numberList ) ).toEqual( true );
				expect( compactedObject.numberList.length ).toEqual( 5 );
				expect( compactedObject.numberList[ 0 ] ).toEqual( 2 );
				expect( compactedObject.numberList[ 1 ] ).toEqual( 3 );
				expect( compactedObject.numberList[ 2 ] ).toEqual( 4 );
				expect( compactedObject.numberList[ 3 ] ).toEqual( 5 );
				expect( compactedObject.numberList[ 4 ] ).toEqual( 6 );
			});
		});
	});
});
