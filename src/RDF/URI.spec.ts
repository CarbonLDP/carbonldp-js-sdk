import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import {
	hasMethod,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import * as Utils from "../Utils";

import { URI } from "./URI";


describe( module( "carbonldp/RDF/URI" ), ():void => {

	describe( interfaze(
		"CarbonLDP.RDF.URIFactory",
		"Interface with the utils for URI strings."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"hasFragment",
			"Returns true if the URI provided contains a fragment.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasQuery",
			"Returns true if the URI provided contains query parameters.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasProtocol",
			"Returns true if the URI provided has a protocol.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isAbsolute",
			"Returns true if the URI provided is absolute.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isRelative",
			"Returns true if the URI provided is relative.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isBNodeID",
			"Returns true if the URI provided reference to a BlankNode.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"generateBNodeID",
			"Returns an ID for a BlankNode using an universally unique identifier (UUID)."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isPrefixed",
			"Returns true if the URI provided has a prefix.", [
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isFragmentOf",
			"Returns true if the first URI is a fragment od the second URI provided.", [
				{ name: "fragmentURI", type: "string" },
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isBaseOf",
			"Return true if the first URI is parent of the second URI provided.", [
				{ name: "baseURI", type: "string" },
				{ name: "uri", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getRelativeURI",
			"Returns the relative URI from a base URI provided.", [
				{ name: "absoluteURI", type: "string" },
				{ name: "base", type: "string" },
			],
			{ type: "string" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getDocumentURI",
			"Returns the URI that just reference to the Document of the URI provided.", [
				{ name: "uri", type: "string" },
			]
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getFragment",
			"Returns the name of the fragment in the URI provided. If no fragment exists in the URI, null will be returned.", [
				{ name: "uri", type: "string" },
			],
			{ type: "string" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getSlug",
			"Returns the slug of the URI. It takes an ending slash as part as the slug.", [
				{ name: "uri", type: "string" },
			],
			{ type: "string" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getParameters",
			"Returns the query parameters of the URI provided in form of a Map.", [
				{ name: "uri", type: "string" },
			],
			{ type: "Map<string, string | string[]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"resolve",
			"Return a URI formed from a parent URI and a relative child URI.", [
				{ name: "parentURI", type: "string" },
				{ name: "childURI", type: "string" },
			],
			{ type: "string" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeProtocol",
			"Removes the protocol of the URI provided", [
				{ name: "uri", type: "string" },
			],
			{ type: "string" }
		), ():void => {} );

		describe( method( OBLIGATORY, "prefix" ), ():void => {

			it( hasSignature(
				"Replace a base of a URI with the prefix provided. If the prefix can not be resolved, the URI provided will be returned.", [
					{ name: "uri", type: "string" },
					{ name: "prefix", type: "string" },
					{ name: "prefixURI", type: "string" },
				],
				{ type: "string" }
			), ():void => {} );

			it( hasSignature(
				"Replace the base of a URI with a prefix in accordance with the ObjectSchema provided. If the prefix can not be resolved, the URI provided will be returned.", [
					{ name: "uri", type: "string" },
					{ name: "objectSchema", type: "CarbonLDP.DigestedObjectSchema" },
				],
				{ type: "string" }
			), ():void => {} );

		} );

	} );

	describe( property(
		STATIC,
		"URI",
		"CarbonLDP.RDF.URIFactory",
		"Constant that implements the `CarbonLDP.RDF.URIFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( URI ).toBeDefined();
			expect( URI ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "URI.hasFragment", ():void => {
			expect( "hasFragment" in URI ).toBe( true );
			expect( Utils.isFunction( URI.hasFragment ) ).toBe( true );

			expect( URI.hasFragment( "http://example.com/resource/#fragment" ) ).toBe( true );
			expect( URI.hasFragment( "prefix:resource/#fragment" ) ).toBe( true );

			expect( URI.hasFragment( "http://example.com/resource/" ) ).toBe( false );
			expect( URI.hasFragment( "prefix:resource/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.hasQuery", ():void => {
			expect( "hasQuery" in URI ).toBe( true );
			expect( Utils.isFunction( URI.hasQuery ) ).toBe( true );

			expect( URI.hasQuery( "http://example.com/resource/" ) ).toBe( false );
			expect( URI.hasQuery( "http://example.com/resource/#fragment" ) ).toBe( false );

			expect( URI.hasQuery( "http://example.com/resource/?parameter=true" ) ).toBe( true );
			expect( URI.hasQuery( "http://example.com/resource/#fragment?parameter=true" ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "URI.hasProtocol", ():void => {
			expect( "hasProtocol" in URI ).toBe( true );
			expect( Utils.isFunction( URI.hasProtocol ) ).toBe( true );

			expect( URI.hasProtocol( "http://example.com/resource/" ) ).toBe( true );
			expect( URI.hasProtocol( "https://example.com/resource/" ) ).toBe( true );

			expect( URI.hasProtocol( "ftp://example.com/resource/" ) ).toBe( false );
			expect( URI.hasProtocol( "file://example.com/resource/" ) ).toBe( false );
			expect( URI.hasProtocol( "://example.com/resource/" ) ).toBe( false );
			expect( URI.hasProtocol( "/resource/" ) ).toBe( false );
			expect( URI.hasProtocol( "resource/" ) ).toBe( false );
			expect( URI.hasProtocol( "prefix:resource/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.isAbsolute", ():void => {
			expect( "isAbsolute" in URI ).toBe( true );
			expect( Utils.isFunction( URI.isAbsolute ) ).toBe( true );

			expect( URI.isAbsolute( "http://example.com/resoruce/" ) ).toBe( true );
			expect( URI.isAbsolute( "https://example.com/resource/" ) ).toBe( true );
			expect( URI.isAbsolute( "://example.com/resource/" ) ).toBe( true );

			expect( URI.isAbsolute( "/resource/" ) ).toBe( false );
			expect( URI.isAbsolute( "resource/" ) ).toBe( false );
			expect( URI.isAbsolute( "resource/#fragment" ) ).toBe( false );
			expect( URI.isAbsolute( "prefix:resource/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.isRelative", ():void => {
			expect( "isRelative" in URI ).toBe( true );
			expect( Utils.isFunction( URI.isRelative ) ).toBe( true );

			expect( URI.isRelative( "resource/" ) ).toBe( true );
			expect( URI.isRelative( "resource/#fragment" ) ).toBe( true );
			expect( URI.isRelative( "/resource/" ) ).toBe( true );
			expect( URI.isRelative( "prefix:resource/" ) ).toBe( true );

			expect( URI.isRelative( "http://example.com/resoruce/" ) ).toBe( false );
			expect( URI.isRelative( "https://example.com/resource/" ) ).toBe( false );
			expect( URI.isRelative( "://example.com/resource/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.isBNodeID", ():void => {
			expect( "isBNodeID" in URI ).toBe( true );
			expect( Utils.isFunction( URI.isBNodeID ) ).toBe( true );

			expect( URI.isBNodeID( "_:someIdNumber0123" ) ).toBe( true );

			expect( URI.isBNodeID( "resource/" ) ).toBe( false );
			expect( URI.isBNodeID( "resource/#fragment" ) ).toBe( false );
			expect( URI.isBNodeID( "http://example.com/resoruce/" ) ).toBe( false );
			expect( URI.isBNodeID( "https://example.com/resource/" ) ).toBe( false );
			expect( URI.isBNodeID( "://example.com/resource/" ) ).toBe( false );
			expect( URI.isBNodeID( "/resource/" ) ).toBe( false );
			expect( URI.isBNodeID( "prefix:resource/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.generateBNodeID", ():void => {
			let id1:string;
			let id2:string;

			id1 = URI.generateBNodeID();
			expect( URI.isBNodeID( id1 ) ).toBe( true );

			id2 = URI.generateBNodeID();
			expect( URI.isBNodeID( id2 ) ).toBe( true );

			expect( id1 ).not.toEqual( id2 );
		} );

		// TODO: Separate in different tests
		it( "URI.isPrefixed", ():void => {
			expect( "isPrefixed" in URI ).toBe( true );
			expect( Utils.isFunction( URI.isPrefixed ) ).toBe( true );

			expect( URI.isPrefixed( "prefix:resource/" ) ).toBe( true );

			expect( URI.isPrefixed( "_:someIdNumber0123" ) ).toBe( false );
			expect( URI.isPrefixed( "resource/" ) ).toBe( false );
			expect( URI.isPrefixed( "resource/#fragment" ) ).toBe( false );
			expect( URI.isPrefixed( "http://example.com/resoruce/" ) ).toBe( false );
			expect( URI.isPrefixed( "https://example.com/resource/" ) ).toBe( false );
			expect( URI.isPrefixed( "://example.com/resource/" ) ).toBe( false );
			expect( URI.isPrefixed( "/resource/" ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.isFragmentOf", ():void => {
			expect( "isFragmentOf" in URI ).toBe( true );
			expect( Utils.isFunction( URI.isFragmentOf ) ).toBe( true );

			let fragmentURI:string = "http://example.com/resource/#fragment";
			let resourceURI:string = "http://example.com/resource/";
			let prefixFragmentURI:string = "prefix:resource/#fragment";
			let prefixResourceURI:string = "prefix:resource/";

			expect( URI.isFragmentOf( fragmentURI, resourceURI ) ).toBe( true );
			expect( URI.isFragmentOf( prefixFragmentURI, prefixResourceURI ) ).toBe( true );

			expect( URI.isFragmentOf( fragmentURI, prefixResourceURI ) ).toBe( false );
			expect( URI.isFragmentOf( prefixFragmentURI, resourceURI ) ).toBe( false );
			expect( URI.isFragmentOf( resourceURI, resourceURI ) ).toBe( false );
			expect( URI.isFragmentOf( prefixResourceURI, prefixResourceURI ) ).toBe( false );
			expect( URI.isFragmentOf( resourceURI, fragmentURI ) ).toBe( false );
			expect( URI.isFragmentOf( prefixResourceURI, prefixFragmentURI ) ).toBe( false );
		} );

		// TODO: Separate in different tests
		it( "URI.isBaseOf", ():void => {
			expect( "isBaseOf" in URI ).toBe( true );
			expect( Utils.isFunction( URI.isBaseOf ) ).toBe( true );

			let namespaceURI:string = "http://example.com/resource/#";
			let fragmentURI:string = "http://example.com/resource/#fragment";
			let childURI:string = "http://example.com/resource/child/";
			let resourceURI:string = "http://example.com/resource/";
			let prefixFragmentURI:string = "prefix:resource/#fragment";
			let prefixResourceURI:string = "prefix:resource/";
			let prefixChildURI:string = "prefix:resource/child/";
			let anotherURI:string = "http://another_example.com/resource/";
			let prefixAnotherURI:string = "another_prefix:resource";

			expect( URI.isBaseOf( namespaceURI, fragmentURI ) ).toBe( true );
			expect( URI.isBaseOf( resourceURI, fragmentURI ) ).toBe( true );
			expect( URI.isBaseOf( resourceURI, childURI ) ).toBe( true );
			expect( URI.isBaseOf( prefixResourceURI, prefixFragmentURI ) ).toBe( true );
			expect( URI.isBaseOf( prefixResourceURI, prefixChildURI ) ).toBe( true );

			expect( URI.isBaseOf( anotherURI, fragmentURI ) ).toBe( false );
			expect( URI.isBaseOf( anotherURI, childURI ) ).toBe( false );
			expect( URI.isBaseOf( prefixAnotherURI, prefixFragmentURI ) ).toBe( false );
			expect( URI.isBaseOf( prefixAnotherURI, prefixChildURI ) ).toBe( false );

			expect( URI.isBaseOf( resourceURI, resourceURI ) ).toBe( true );
			expect( URI.isBaseOf( prefixResourceURI, prefixResourceURI ) ).toBe( true );

			expect( URI.isBaseOf( resourceURI, anotherURI ) ).toBe( false );
			expect( URI.isBaseOf( prefixResourceURI, prefixAnotherURI ) ).toBe( false );

			expect( URI.isBaseOf( "http://example.com/resource", "/relative" ) ).toBe( true );
			expect( URI.isBaseOf( "http://example.com/resource", "/relative/" ) ).toBe( true );
			expect( URI.isBaseOf( "http://example.com/resource", "relative/" ) ).toBe( true );
			expect( URI.isBaseOf( "http://example.com/resource", "relative" ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "URI.getRelativeURI", ():void => {
			expect( "getRelativeURI" in URI ).toBe( true );
			expect( Utils.isFunction( URI.getRelativeURI ) ).toBe( true );

			let childURI:string = "http://example.com/resource/child/";
			let resourceURI:string = "http://example.com/resource/";
			let anotherURI:string = "http://another_example.com/resource/";
			let relativeURI:string = "child/";

			expect( URI.getRelativeURI( childURI, resourceURI ) ).toBe( relativeURI );

			expect( URI.getRelativeURI( relativeURI, resourceURI ) ).toBe( relativeURI );
			expect( URI.getRelativeURI( childURI, anotherURI ) ).toBe( childURI );
		} );

		// TODO: Separate in different tests
		it( "URI.getDocumentURI", ():void => {
			expect( "getDocumentURI" in URI ).toBe( true );
			expect( Utils.isFunction( URI.getDocumentURI ) ).toBe( true );

			let documentURI:string = "http://example.com/resource/";
			let fragmentURI:string = "http://example.com/resource/#fragment";
			let relativeDocumentURI:string = "resource/";
			let relativeFragmentURI:string = "resource/#fragment";
			let prefixDocumentURI:string = "prefix:resource/";
			let prefixFragmentURI:string = "prefix:resource/#fragment";
			let errorURI:string = "http://example.com/resource/#fragment#anotherFragment";

			expect( URI.getDocumentURI( fragmentURI ) ).toEqual( documentURI );
			expect( URI.getDocumentURI( documentURI ) ).toEqual( documentURI );
			expect( URI.getDocumentURI( relativeFragmentURI ) ).toEqual( relativeDocumentURI );
			expect( URI.getDocumentURI( relativeDocumentURI ) ).toEqual( relativeDocumentURI );
			expect( URI.getDocumentURI( prefixFragmentURI ) ).toEqual( prefixDocumentURI );
			expect( URI.getDocumentURI( prefixDocumentURI ) ).toEqual( prefixDocumentURI );

			expect( URI.getDocumentURI.bind( null, errorURI ) ).toThrowError( /IllegalArgument/ );
		} );

		// TODO: Separate in different tests
		it( "URI.getFragment", ():void => {
			expect( "getFragment" in URI ).toBe( true );
			expect( Utils.isFunction( URI.getFragment ) ).toBe( true );

			let documentURI:string = "http://example.com/resource/";
			let fragmentURI:string = "http://example.com/resource/#fragment";
			let relativeDocumentURI:string = "resource/";
			let relativeFragmentURI:string = "resource/#fragment";
			let fragmentName:string = "fragment";
			let errorURI:string = "http://example.com/resource/#fragment#anotherFragment";
			let prefixDocumentURI:string = "prefix:resource/";
			let prefixFragmentURI:string = "prefix:resource/#fragment";

			expect( URI.getFragment( fragmentURI ) ).toEqual( fragmentName );
			expect( URI.getFragment( relativeFragmentURI ) ).toEqual( fragmentName );
			expect( URI.getFragment( prefixFragmentURI ) ).toEqual( fragmentName );

			expect( URI.getFragment( documentURI ) ).toBeNull();
			expect( URI.getFragment( relativeDocumentURI ) ).toBeNull();
			expect( URI.getFragment( prefixDocumentURI ) ).toBeNull();

			expect( URI.getDocumentURI.bind( null, errorURI ) ).toThrowError( /IllegalArgument/ );
		} );

		// TODO: Separate in different tests
		it( "URI.getSlug", ():void => {

			// Property integrity
			(() => {
				expect( "getSlug" in URI ).toEqual( true );
				expect( Utils.isFunction( URI.getSlug ) ).toEqual( true );
			})();

			expect( URI.getSlug( "http://example.com/resource" ) ).toEqual( "resource" );
			expect( URI.getSlug( "http://example.com/resource/" ) ).toEqual( "resource" );
			expect( URI.getSlug( "http://example.com/resource-1/resource-2/resource-3" ) ).toEqual( "resource-3" );
			expect( URI.getSlug( "http://example.com/resource-1/resource-2/resource-3/" ) ).toEqual( "resource-3" );
			expect( URI.getSlug( "resource-1/resource-2/resource-3" ) ).toEqual( "resource-3" );
			expect( URI.getSlug( "resource-1/resource-2/resource-3/" ) ).toEqual( "resource-3" );
			expect( URI.getSlug( "" ) ).toEqual( "" );
			expect( URI.getSlug( "/" ) ).toEqual( "" );
			expect( URI.getSlug( "http://example.com/resource#fragment" ) ).toEqual( "fragment" );
			expect( URI.getSlug( "http://example.com/resource#fragment/" ) ).toEqual( "fragment" );
			expect( URI.getSlug( "http://example.com/resource-1#fragment-2/fragment-3" ) ).toEqual( "fragment-3" );
			expect( URI.getSlug( "http://example.com/resource-1#fragment-2/fragment-3/" ) ).toEqual( "fragment-3" );
			expect( URI.getSlug( "resource-1#fragment-2/fragment-3" ) ).toEqual( "fragment-3" );
			expect( URI.getSlug( "resource-1#fragment-2/fragment-3/" ) ).toEqual( "fragment-3" );
			expect( URI.getSlug( "#" ) ).toEqual( "" );
			expect( URI.getSlug( "#/" ) ).toEqual( "" );
		} );

		// TODO: Separate in different tests
		it( "URI.getParameters", ():void => {
			expect( URI.getParameters ).toBeDefined();
			expect( Utils.isFunction( URI.getParameters ) ).toEqual( true );

			let parameters:Map<string, string | string[]>;

			parameters = URI.getParameters( "http://example.com/resource/" );
			expect( parameters instanceof Map ).toBe( true );
			expect( parameters.size ).toBe( 0 );

			parameters = URI.getParameters( "http://example.com/resource/#fragment" );
			expect( parameters instanceof Map ).toBe( true );
			expect( parameters.size ).toBe( 0 );

			parameters = URI.getParameters( "http://example.com/resource/?parameter=true" );
			expect( parameters instanceof Map ).toBe( true );
			expect( parameters.size ).toBe( 1 );
			expect( parameters.get( "parameter" ) ).toBe( "true" );

			parameters = URI.getParameters( "http://example.com/resource/#fragment?parameter=true" );
			expect( parameters instanceof Map ).toBe( true );
			expect( parameters.size ).toBe( 1 );
			expect( parameters.get( "parameter" ) ).toBe( "true" );

			parameters = URI.getParameters( "http://example.com/resource/?parameter=true&some=1&some=2" );
			expect( parameters instanceof Map ).toBe( true );
			expect( parameters.size ).toBe( 2 );
			expect( parameters.get( "parameter" ) ).toBe( "true" );
			expect( parameters.get( "some" ) ).toEqual( [ "1", "2" ] );

			parameters = URI.getParameters( "http://example.com/resource/#fragment?parameter=true&some=1&some=2" );
			expect( parameters instanceof Map ).toBe( true );
			expect( parameters.size ).toBe( 2 );
			expect( parameters.get( "parameter" ) ).toBe( "true" );
			expect( parameters.get( "some" ) ).toEqual( [ "1", "2" ] );
		} );

		// TODO: Separate in different tests
		it( "URI.resolve", ():void => {
			expect( "resolve" in URI ).toBe( true );
			expect( Utils.isFunction( URI.resolve ) ).toBe( true );

			expect( URI.resolve( "", "http://example.com/resource/" ) ).toEqual( "http://example.com/resource/" );
			expect( URI.resolve( "", "child/" ) ).toEqual( "child/" );

			expect( URI.resolve( "http://example.com/resource/", "/child/" ) ).toEqual( "http://example.com/resource/child/" );
			expect( URI.resolve( "http://example.com/resource", "/child/" ) ).toEqual( "http://example.com/child/" );

			expect( URI.resolve( "http://example.com/resource/", "child/" ) ).toEqual( "http://example.com/resource/child/" );
			expect( URI.resolve( "http://example.com/resource", "child/" ) ).toEqual( "http://example.com/child/" );

			expect( URI.resolve( "http://example.com/resource/", "#child" ) ).toEqual( "http://example.com/resource/#child" );
			expect( URI.resolve( "http://example.com/resource", "#child" ) ).toEqual( "http://example.com/resource#child" );


			expect( URI.resolve( "http://example.com/", "/child" ) ).toEqual( "http://example.com/child" );
			expect( URI.resolve( "http://example.com", "/child" ) ).toEqual( "http://example.com/child" );

			expect( URI.resolve( "http://example.com/", "child" ) ).toEqual( "http://example.com/child" );
			expect( URI.resolve( "http://example.com", "child" ) ).toEqual( "http://example.com/child" );

			expect( URI.resolve( "http://example.com/", "#child" ) ).toEqual( "http://example.com/#child" );
			expect( URI.resolve( "http://example.com", "#child" ) ).toEqual( "http://example.com/#child" );


			expect( URI.resolve( "http://example.com/resource#", "#child" ) ).toEqual( "http://example.com/resource#child" );
			expect( URI.resolve( "http://example.com/resource#some", "#child" ) ).toEqual( "http://example.com/resource#child" );
			expect( URI.resolve( "http://example.com/resource#some", "child#another" ) ).toEqual( "http://example.com/child#another" );

			expect( URI.resolve( "http://example.com/resource#", "?child" ) ).toEqual( "http://example.com/resource?child" );
			expect( URI.resolve( "http://example.com/resource#some", "?child" ) ).toEqual( "http://example.com/resource#some?child" );

			expect( URI.resolve( "http://example.com/resource?some", "?child" ) ).toEqual( "http://example.com/resource?child" );
			expect( URI.resolve( "http://example.com/resource?some", "#child?another" ) ).toEqual( "http://example.com/resource#child?another" );


			expect( URI.resolve( "http://example.com/resource/", "http://example.com/resource/child/" ) ).toEqual( "http://example.com/resource/child/" );
			expect( URI.resolve( "http://example.com/resource/", "prefix:resource" ) ).toEqual( "prefix:resource" );
			expect( URI.resolve( "http://example.com/resource/", "_:some-random-id" ) ).toEqual( "_:some-random-id" );
		} );

		// TODO: Separate in different tests
		it( "URI.removeProtocol", ():void => {
			expect( "removeProtocol" in URI ).toBe( true );
			expect( Utils.isFunction( URI.removeProtocol ) ).toBe( true );

			expect( URI.removeProtocol( "http://example.com/resource" ) ).toEqual( "example.com/resource" );
			expect( URI.removeProtocol( "https://example.com/resource" ) ).toEqual( "example.com/resource" );

			expect( URI.removeProtocol( "://example.com/resource" ) ).toEqual( "://example.com/resource" );
			expect( URI.removeProtocol( "example.com/resource" ) ).toEqual( "example.com/resource" );
			expect( URI.removeProtocol( "prefix:resource" ) ).toEqual( "prefix:resource" );
		} );

		describe( "URI.prefix", ():void => {

			// TODO: Separate in different tests
			it( "should test with prefix and prefixURI", ():void => {
				expect( "prefix" in URI ).toBe( true );
				expect( Utils.isFunction( URI.prefix ) ).toBe( true );

				let resourceURI:string = "http://example.com/resource/";
				let anotherResourceURI:string = "http://example.com/another_resource/";
				let prefixURI:string = "http://example.com/";
				let anotherPrefixURI:string = "http://another_example.com/";
				let prefix:string = "prefix";
				let anotherPrefix:string = "another_prefix";
				let prefixResourceURI:string = "prefix:resource/";

				expect( URI.prefix( resourceURI, prefix, prefixURI ) ).toBe( prefixResourceURI );
				expect( URI.prefix( prefixResourceURI, prefix, prefixURI ) ).toBe( prefixResourceURI );
				expect( URI.prefix( prefixResourceURI, anotherPrefix, prefix ) ).toBe( prefixResourceURI );

				expect( URI.prefix( resourceURI, prefix, anotherPrefixURI ) ).toBe( resourceURI );
				expect( URI.prefix( anotherResourceURI, prefix, anotherPrefixURI ) ).toBe( anotherResourceURI );
			} );

			// TODO: Separate in different tests
			it( "should test with object schema", ():void => {
				expect( "prefix" in URI ).toBe( true );
				expect( Utils.isFunction( URI.prefix ) ).toBe( true );


				let resourceURI:string = "http://example.com/resource/";
				let anotherResourceURI:string = "http://another_example.com/resource/";
				let prefixResourceURI:string = "prefix:resource/";

				let schema:ObjectSchema = {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"prefix": "http://example.com/",
					"some_resource": {
						"@id": "prefix:some_resource",
						"@type": "@id",
					},
				};
				let anotherSchema:ObjectSchema = {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"another_prefix": "http://another_example.com/",
					"some_resource": {
						"@id": "prefix:some_resource",
						"@type": "@id",
					},
				};
				let digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( schema );
				let anotherDigestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( anotherSchema );

				expect( URI.prefix( resourceURI, digestedSchema ) ).toBe( prefixResourceURI );
				expect( URI.prefix( resourceURI, anotherDigestedSchema ) ).toBe( resourceURI );
				expect( URI.prefix( anotherResourceURI, digestedSchema ) ).toBe( anotherResourceURI );
				expect( URI.prefix( prefixResourceURI, digestedSchema ) ).toBe( prefixResourceURI );
			} );

		} );

	} );

} );
