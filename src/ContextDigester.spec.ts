/// <reference path="./../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="./../typings/tsd.d.ts" />

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
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

import * as ContextDigester from "./ContextDigester";

describe( module( "Carbon/ContextDigester" ), ():void => {
	it( isDefined(), ():void => {
		expect( ContextDigester ).toBeDefined();
		expect( Utils.isObject( ContextDigester ) ).toEqual( true );
	});

	describe( clazz( "Carbon.ContextDigester.Class", "" ), ():void => {
		describe( method( STATIC, "digestContext" ), ():void => {
			it( hasSignature( `
					Processes a context to standardize it before using it.
				`, [
				{ name: "context", type: "Carbon.ContextDigester.Context" }
			], { type: "Carbon.ContextDigester.DigestedContext" } ), ():void => {
				expect( ContextDigester.Class.digestContext ).toBeDefined();
				expect( Utils.isFunction( ContextDigester.Class.digestContext ) ).toBeDefined();

				let context:ContextDigester.Context = {
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

				let digestedContext:ContextDigester.DigestedContext = ContextDigester.Class.digestContext( context );

				expect( digestedContext.prefixes.size ).toEqual( 3 );
				expect( digestedContext.prefixes.has( "skos" ) ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ) instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

				expect( digestedContext.properties.size ).toEqual( 3 );
				expect( digestedContext.properties.has( "hasTopConcept" ) ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ) instanceof ContextDigester.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).literal ).toEqual( false );
				expect( digestedContext.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
				expect( digestedContext.properties.get( "hasTopConcept" ).containerType ).toEqual( ContextDigester.ContainerType.SET );
				expect( digestedContext.properties.get( "hasTopConcept" ).language ).toEqual( null );

				expect( digestedContext.properties.has( "name" ) ).toEqual( true );
				expect( digestedContext.properties.get( "name" ) instanceof ContextDigester.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literal ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
				expect( digestedContext.properties.get( "name" ).uri instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
				expect( digestedContext.properties.get( "name" ).containerType ).toEqual( null );
				expect( digestedContext.properties.get( "name" ).language ).toEqual( null );
			});

			it( hasSignature( `
					Processes several contexts to standardize and combine them before using them.
				`, [
				{ name: "contexts", type: "Array<Carbon.ContextDigester.Context>" }
			], { type: "Carbon.ContextDigester.DigestedContext" } ), ():void => {
				expect( ContextDigester.Class.digestContext ).toBeDefined();
				expect( Utils.isFunction( ContextDigester.Class.digestContext ) ).toBeDefined();

				let contexts:ContextDigester.Context[] = [
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

				let digestedContext:ContextDigester.DigestedContext = ContextDigester.Class.digestContext( contexts );

				expect( digestedContext.prefixes.size ).toEqual( 3 );
				expect( digestedContext.prefixes.has( "skos" ) ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ) instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.prefixes.get( "skos" ).toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#" );

				expect( digestedContext.properties.size ).toEqual( 3 );
				expect( digestedContext.properties.has( "hasTopConcept" ) ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ) instanceof ContextDigester.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).literal ).toEqual( false );
				expect( digestedContext.properties.get( "hasTopConcept" ).literalType ).toEqual( null );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.properties.get( "hasTopConcept" ).uri.toString() ).toEqual( "http://www.w3.org/2004/02/skos/core#hasTopConcept" );
				expect( digestedContext.properties.get( "hasTopConcept" ).containerType ).toEqual( ContextDigester.ContainerType.SET );
				expect( digestedContext.properties.get( "hasTopConcept" ).language ).toEqual( null );

				expect( digestedContext.properties.has( "name" ) ).toEqual( true );
				expect( digestedContext.properties.get( "name" ) instanceof ContextDigester.DigestedDefinition ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literal ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).literalType.toString() ).toEqual( "http://www.w3.org/2001/XMLSchema#string" );
				expect( digestedContext.properties.get( "name" ).uri instanceof ContextDigester.URI ).toEqual( true );
				expect( digestedContext.properties.get( "name" ).uri.toString() ).toEqual( "http://purl.org/dc/terms/name" );
				expect( digestedContext.properties.get( "name" ).containerType ).toEqual( null );
				expect( digestedContext.properties.get( "name" ).language ).toEqual( null );
			});
		});
	});
});
