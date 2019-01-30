import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { URI } from "./URI";


describe( "URI", () => {

	it( "should exist", () => {
		expect( URI ).toBeDefined();
		expect( URI ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "URI.hasFragment", () => {

			it( "should exist", () => {
				expect( URI.hasFragment ).toBeDefined();
				expect( URI.hasFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when has hash", () => {
				expect( URI.hasFragment( "http://example.com/resource/#fragment" ) ).toBe( true );
				expect( URI.hasFragment( "prefix:resource/#fragment" ) ).toBe( true );
			} );

			it( "should return false when no hash", () => {
				expect( URI.hasFragment( "http://example.com/resource/" ) ).toBe( false );
				expect( URI.hasFragment( "prefix:resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.hasQuery", () => {

			it( "should exist", () => {
				expect( URI.hasQuery ).toBeDefined();
				expect( URI.hasQuery ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no query params", () => {
				expect( URI.hasQuery( "http://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return true when has query params", () => {
				expect( URI.hasQuery( "http://example.com/resource/?parameter=true" ) ).toBe( true );
			} );

			it( "should return true when has hash with query params", () => {
				expect( URI.hasQuery( "http://example.com/resource/#fragment?parameter=true" ) ).toBe( true );
			} );

		} );

		describe( "URI.hasProtocol", () => {

			it( "should exist", () => {
				expect( URI.hasProtocol ).toBeDefined();
				expect( URI.hasProtocol ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when has http://", () => {
				expect( URI.hasProtocol( "http://example.com/resource/" ) ).toBe( true );
			} );

			it( "should return true when has https://", () => {
				expect( URI.hasProtocol( "https://example.com/resource/" ) ).toBe( true );
			} );

			it( "should return false when another protocol", () => {
				expect( URI.hasProtocol( "ftp://example.com/resource/" ) ).toBe( false );
				expect( URI.hasProtocol( "file://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when empty protocol", () => {
				expect( URI.hasProtocol( "://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when relative", () => {
				expect( URI.hasProtocol( "resource/" ) ).toBe( false );
			} );

			it( "should return false when prefixed name", () => {
				expect( URI.hasProtocol( "prefix:resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.isAbsolute", () => {

			it( "should exist", () => {
				expect( URI.isAbsolute ).toBeDefined();
				expect( URI.isAbsolute ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when has valid protocol", () => {
				expect( URI.isAbsolute( "http://example.com/resoruce/" ) ).toBe( true );
				expect( URI.isAbsolute( "https://example.com/resource/" ) ).toBe( true );
			} );

			it( "should return true when empty protocol", () => {
				expect( URI.isAbsolute( "://example.com/resource/" ) ).toBe( true );
			} );


			it( "should return false when relative", () => {
				expect( URI.isAbsolute( "/resource/" ) ).toBe( false );
			} );

			it( "should return false when prefixed", () => {
				expect( URI.isAbsolute( "prefix:resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.isRelative", () => {

			it( "should exist", () => {
				expect( URI.isRelative ).toBeDefined();
				expect( URI.isRelative ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when base relative", () => {
				expect( URI.isRelative( "resource/" ) ).toBe( true );
			} );

			it( "should return true when relative with hash", () => {
				expect( URI.isRelative( "resource/#fragment" ) ).toBe( true );
			} );

			it( "should return true when prefixed name", () => {
				expect( URI.isRelative( "prefix:resource/" ) ).toBe( true );
			} );


			it( "should return false when has valid protocol", () => {
				expect( URI.isRelative( "http://example.com/resoruce/" ) ).toBe( false );
				expect( URI.isRelative( "https://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when empty protocol", () => {
				expect( URI.isRelative( "://example.com/resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.isBNodeID", () => {

			it( "should exist", () => {
				expect( URI.isBNodeID ).toBeDefined();
				expect( URI.isBNodeID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when valid bNode", () => {
				expect( URI.isBNodeID( "_:someIdNumber0123" ) ).toBe( true );
			} );

			it( "should return false when relative", () => {
				expect( URI.isBNodeID( "resource/" ) ).toBe( false );
			} );

			it( "should return false when relative with fragment", () => {
				expect( URI.isBNodeID( "resource/#fragment" ) ).toBe( false );
			} );

			it( "should return false when has protocol", () => {
				expect( URI.isBNodeID( "http://example.com/resoruce/" ) ).toBe( false );
				expect( URI.isBNodeID( "https://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when empty protocol", () => {
				expect( URI.isBNodeID( "://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when prefixed name", () => {
				expect( URI.isBNodeID( "prefix:resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.generateBNodeID", () => {

			it( "should exist", () => {
				expect( URI.generateBNodeID ).toBeDefined();
				expect( URI.generateBNodeID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a bNode label", () => {
				const id:string = URI.generateBNodeID();
				expect( URI.isBNodeID( id ) ).toBe( true );
			} );

			it( "should return different label each call", () => {
				const id1:string = URI.generateBNodeID();
				const id2:string = URI.generateBNodeID();

				expect( id1 ).not.toEqual( id2 );
			} );

		} );

		describe( "URI.isPrefixed", () => {

			it( "should exist", () => {
				expect( URI.isPrefixed ).toBeDefined();
				expect( URI.isPrefixed ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when prefixed name", () => {
				expect( URI.isPrefixed( "prefix:resource/" ) ).toBe( true );
			} );


			it( "should return false when blank node label", () => {
				expect( URI.isPrefixed( "_:someIdNumber0123" ) ).toBe( false );
			} );

			it( "should return false when relative", () => {
				expect( URI.isPrefixed( "resource/" ) ).toBe( false );
			} );

			it( "should return false when relative with hash", () => {
				expect( URI.isPrefixed( "resource/#fragment" ) ).toBe( false );
			} );

			it( "should return false when has protocol", () => {
				expect( URI.isPrefixed( "http://example.com/resoruce/" ) ).toBe( false );
				expect( URI.isPrefixed( "https://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when has empty protocol", () => {
				expect( URI.isPrefixed( "://example.com/resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.isFragmentOf", () => {

			it( "should exist", () => {
				expect( URI.isFragmentOf ).toBeDefined();
				expect( URI.isFragmentOf ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when base absolute URI", () => {
				const returned:boolean = URI.isFragmentOf( "http://example.com/resource/#fragment", "http://example.com/resource/" );
				expect( returned ).toBe( true );
			} );

			it( "should return true when base prefixed URI", () => {
				const returned:boolean = URI.isFragmentOf( "prefix:resource/#fragment", "prefix:resource/" );
				expect( returned ).toBe( true );
			} );


			it( "should return false when non base prefixed URI", () => {
				expect( URI.isFragmentOf( "http://example.com/resource/#fragment", "prefix:resource/" ) ).toBe( false );
			} );

			it( "should return false when non base absolute URI", () => {
				expect( URI.isFragmentOf( "prefix:resource/#fragment", "http://example.com/resource/" ) ).toBe( false );
			} );

			it( "should return false when same URI", () => {
				expect( URI.isFragmentOf( "http://example.com/resource/", "http://example.com/resource/" ) ).toBe( false );
				expect( URI.isFragmentOf( "prefix:resource/", "prefix:resource/" ) ).toBe( false );
			} );

		} );

		describe( "URI.isBaseOf", () => {

			it( "should exist", () => {
				expect( URI.isBaseOf ).toBeDefined();
				expect( URI.isBaseOf ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when base until hash symbol", () => {
				expect( URI.isBaseOf( "http://example.com/resource/#", "http://example.com/resource/#fragment" ) ).toBe( true );
			} );

			it( "should return true when base document for named fragment", () => {
				expect( URI.isBaseOf( "http://example.com/resource/", "http://example.com/resource/#fragment" ) ).toBe( true );
			} );

			it( "should return true when base document for child", () => {
				expect( URI.isBaseOf( "http://example.com/resource/", "http://example.com/resource/child/" ) ).toBe( true );
			} );

			it( "should return true when base prefixed for named fragment", () => {
				expect( URI.isBaseOf( "prefix:resource/", "prefix:resource/#fragment" ) ).toBe( true );
			} );

			it( "should return true when base prefiex for child", () => {
				expect( URI.isBaseOf( "prefix:resource/", "prefix:resource/child/" ) ).toBe( true );
			} );


			it( "should return false when different domain for named fragment", () => {
				expect( URI.isBaseOf( "http://another_example.com/resource/", "http://example.com/resource/#fragment" ) ).toBe( false );
			} );

			it( "should return false when different domain for child", () => {
				expect( URI.isBaseOf( "http://another_example.com/resource/", "http://example.com/resource/child/" ) ).toBe( false );
			} );

			it( "should return false when different prefix for named fragment", () => {
				expect( URI.isBaseOf( "another_prefix:resource", "prefix:resource/#fragment" ) ).toBe( false );
			} );

			it( "should return false when different prefix for child", () => {
				expect( URI.isBaseOf( "another_prefix:resource", "prefix:resource/child/" ) ).toBe( false );
			} );


			it( "should return true when same absolute URI", () => {
				expect( URI.isBaseOf( "http://example.com/resource/", "http://example.com/resource/" ) ).toBe( true );
			} );

			it( "should return true when same prefixed name", () => {
				expect( URI.isBaseOf( "prefix:resource/", "prefix:resource/" ) ).toBe( true );
			} );


			it( "should return true when absolute for relative beginning with slash", () => {
				expect( URI.isBaseOf( "http://example.com/resource", "/relative" ) ).toBe( true );
			} );

			it( "should return true when absolute for relative beginning & ending with slash", () => {
				expect( URI.isBaseOf( "http://example.com/resource", "/relative/" ) ).toBe( true );
			} );

			it( "should return true when absolute for relative ending with slash", () => {
				expect( URI.isBaseOf( "http://example.com/resource", "relative/" ) ).toBe( true );
			} );

			it( "should return true when absolute for clean relative", () => {
				expect( URI.isBaseOf( "http://example.com/resource", "relative" ) ).toBe( true );
			} );

		} );

		describe( "URI.getRelativeURI", () => {

			it( "should exist", () => {
				expect( URI.getRelativeURI ).toBeDefined();
				expect( URI.getRelativeURI ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return relative from child and document", () => {
				expect( URI.getRelativeURI( "http://example.com/resource/child/", "http://example.com/resource/" ) ).toBe( "child/" );
			} );

			it( "should return relative when relative provided", () => {
				expect( URI.getRelativeURI( "child/", "http://example.com/resource/" ) ).toBe( "child/" );
			} );

			it( "should return absolute when no child of parent", () => {
				expect( URI.getRelativeURI( "http://example.com/resource/child/", "http://another_example.com/resource/" ) ).toBe( "http://example.com/resource/child/" );
			} );

		} );

		describe( "URI.getDocumentURI", () => {

			it( "should exist", () => {
				expect( URI.getDocumentURI ).toBeDefined();
				expect( URI.getDocumentURI ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return document when named fragment", () => {
				expect( URI.getDocumentURI( "http://example.com/resource/#fragment" ) ).toEqual( "http://example.com/resource/" );
			} );

			it( "should return same document when document", () => {
				expect( URI.getDocumentURI( "http://example.com/resource/" ) ).toEqual( "http://example.com/resource/" );
			} );

			it( "should return relative document when relative named fragment", () => {
				expect( URI.getDocumentURI( "resource/#fragment" ) ).toEqual( "resource/" );
			} );

			it( "should return same document when relative document", () => {
				expect( URI.getDocumentURI( "resource/" ) ).toEqual( "resource/" );
			} );

			it( "should return prefixed when prefixed named fragment", () => {
				expect( URI.getDocumentURI( "prefix:resource/#fragment" ) ).toEqual( "prefix:resource/" );
			} );

			it( "should return same prefixed when prefixed document", () => {
				expect( URI.getDocumentURI( "prefix:resource/" ) ).toEqual( "prefix:resource/" );
			} );

			it( "should throw error when multiple hash", () => {
				expect( () => URI.getDocumentURI( "http://example.com/resource/#fragment#anotherFragment" ) ).toThrowError( IllegalArgumentError );
			} );

		} );

		describe( "URI.getFragment", () => {

			it( "should exist", () => {
				expect( URI.getFragment ).toBeDefined();
				expect( URI.getFragment ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return fragment when absolute named fragment", () => {
				expect( URI.getFragment( "http://example.com/resource/#fragment" ) ).toEqual( "fragment" );
			} );

			it( "should return fragment when relative named fragment", () => {
				expect( URI.getFragment( "resource/#fragment" ) ).toEqual( "fragment" );
			} );

			it( "should return fragment when prefixed named fragment", () => {
				expect( URI.getFragment( "prefix:resource/#fragment" ) ).toEqual( "fragment" );
			} );


			it( "should return null when absolute with no named fragment", () => {
				expect( () => URI.getFragment( "http://example.com/resource/" ) ).toThrowError( IllegalArgumentError );
			} );

			it( "should return null when relative with no named fragment", () => {
				expect( () => URI.getFragment( "resource/" ) ).toThrowError( IllegalArgumentError );
			} );

			it( "should return null when prefixed named with no named fragment", () => {
				expect( () => URI.getFragment( "prefix:resource/" ) ).toThrowError( IllegalArgumentError );
			} );


			it( "should throw error when multiple hash", () => {
				expect( () => URI.getDocumentURI( "http://example.com/resource/#fragment#anotherFragment" ) ).toThrowError( IllegalArgumentError );
			} );

		} );

		describe( "URI.getSlug", () => {

			it( "should exist", () => {
				expect( URI.getSlug ).toBeDefined();
				expect( URI.getSlug ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return slug when absolute without trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource" ) ).toEqual( "resource" );
			} );

			it( "should return slug when absolute with trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource/" ) ).toEqual( "resource" );
			} );

			it( "should return slug when three level absolute without trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource-1/resource-2/resource-3" ) ).toEqual( "resource-3" );
			} );

			it( "should return slug when three level absolute with trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource-1/resource-2/resource-3/" ) ).toEqual( "resource-3" );
			} );

			it( "should return slug when three level relative without trailing slash", () => {
				expect( URI.getSlug( "resource-1/resource-2/resource-3" ) ).toEqual( "resource-3" );
			} );

			it( "should return slug when three level relative with trailing slash", () => {
				expect( URI.getSlug( "resource-1/resource-2/resource-3/" ) ).toEqual( "resource-3" );
			} );

			it( "should return empty when empty relative without trailing slash", () => {
				expect( URI.getSlug( "" ) ).toEqual( "" );
			} );

			it( "should return empty when empty relative with trailing slash", () => {
				expect( URI.getSlug( "/" ) ).toEqual( "" );
			} );

			it( "should return fragment when absolute named fragment without trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource#fragment" ) ).toEqual( "fragment" );
			} );

			it( "should return fragment when absolute named fragment with trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource#fragment/" ) ).toEqual( "fragment" );
			} );

			it( "should return slug from fragment when absolute named fragment path without trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource-1#fragment-2/fragment-3" ) ).toEqual( "fragment-3" );
			} );

			it( "should return slug from fragment when absolute named fragment path with trailing slash", () => {
				expect( URI.getSlug( "http://example.com/resource-1#fragment-2/fragment-3/" ) ).toEqual( "fragment-3" );
			} );

			it( "should return slug from fragment when relative named fragment path without trailing slash", () => {
				expect( URI.getSlug( "resource-1#fragment-2/fragment-3" ) ).toEqual( "fragment-3" );
			} );

			it( "should return slug from fragment when relative named fragment path with trailing slash", () => {
				expect( URI.getSlug( "resource-1#fragment-2/fragment-3/" ) ).toEqual( "fragment-3" );
			} );

			it( "should return slug from fragment when relative empty named fragment with trailing slash", () => {
				expect( URI.getSlug( "#" ) ).toEqual( "" );
			} );

			it( "should return slug from fragment when relative empty named fragment without trailing slash", () => {
				expect( URI.getSlug( "#/" ) ).toEqual( "" );
			} );

		} );

		describe( "URI.getParameters", () => {

			it( "should exist", () => {
				expect( URI.getParameters ).toBeDefined();
				expect( URI.getParameters ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return empty map when no parameters in document", () => {
				const parameters:Map<string, string | string[]> = URI.getParameters( "http://example.com/resource/" );
				expect( parameters ).toEqual( new Map() );
			} );

			it( "should return empty map when no parameters in named fragment", () => {
				const parameters:Map<string, string | string[]> = URI.getParameters( "http://example.com/resource/#fragment" );
				expect( parameters ).toEqual( new Map() );
			} );

			it( "should return single parameters when parameter in document", () => {
				const parameters:Map<string, string | string[]> = URI.getParameters( "http://example.com/resource/?parameter=true" );
				expect( parameters ).toEqual( new Map( [
					[ "parameter", "true" ],
				] ) );
			} );

			it( "should return single parameters when parameter in named fragment", () => {
				const parameters:Map<string, string | string[]> = URI.getParameters( "http://example.com/resource/#fragment?parameter=true" );
				expect( parameters ).toEqual( new Map( [
					[ "parameter", "true" ],
				] ) );
			} );

			it( "should return single parameters when parameter in document", () => {
				const parameters:Map<string, string | string[]> = URI.getParameters( "http://example.com/resource/?parameter=true&some=1&some=2" );
				expect( parameters ).toEqual( new Map<string, string | string[]>( [
					[ "parameter", "true" ],
					[ "some", [ "1", "2" ] ],
				] ) );
			} );

			it( "should return single parameters when parameter in named fragment", () => {
				const parameters:Map<string, string | string[]> = URI.getParameters( "http://example.com/resource/#fragment?parameter=true&some=1&some=2" );
				expect( parameters ).toEqual( new Map<string, string | string[]>( [
					[ "parameter", "true" ],
					[ "some", [ "1", "2" ] ],
				] ) );
			} );

		} );

		describe( "URI.resolve", () => {

			it( "should exist", () => {
				expect( URI.resolve ).toBeDefined();
				expect( URI.resolve ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return same absolute when empty parent", () => {
				expect( URI.resolve( "", "http://example.com/resource/" ) ).toEqual( "http://example.com/resource/" );
			} );

			it( "should return same relative when empty parent", () => {
				expect( URI.resolve( "", "child/" ) ).toEqual( "child/" );
			} );

			it( "should return child of parent when parent with trailing slash and relative child", () => {
				expect( URI.resolve( "http://example.com/resource/", "child/" ) ).toEqual( "http://example.com/resource/child/" );
			} );

			it( "should return child of parent's parent when parent without trailing slash and relative child", () => {
				expect( URI.resolve( "http://example.com/resource", "child/" ) ).toEqual( "http://example.com/child/" );
			} );

			it( "should return named fragment when parent with trailing slash and relative named fragment", () => {
				expect( URI.resolve( "http://example.com/resource/", "#child" ) ).toEqual( "http://example.com/resource/#child" );
			} );

			it( "should return named fragment when parent without trailing slash and relative named fragment", () => {
				expect( URI.resolve( "http://example.com/resource", "#child" ) ).toEqual( "http://example.com/resource#child" );
			} );


			it( "should return child when parent is host with trailing slash with relative child", () => {
				expect( URI.resolve( "http://example.com/", "child/" ) ).toEqual( "http://example.com/child/" );
			} );

			it( "should return child when parent is host without trailing slash with relative child", () => {
				expect( URI.resolve( "http://example.com", "child/" ) ).toEqual( "http://example.com/child/" );
			} );

			it( "should return named fragment when parent is host with trailing slash with relative named fragment", () => {
				expect( URI.resolve( "http://example.com/", "#child" ) ).toEqual( "http://example.com/#child" );
			} );

			it( "should return named fragment when parent is host without trailing slash with relative named fragment", () => {
				expect( URI.resolve( "http://example.com", "#child" ) ).toEqual( "http://example.com/#child" );
			} );


			it( "should return named fragment when parent is empty named fragment and relative named fragment", () => {
				expect( URI.resolve( "http://example.com/resource#", "#child" ) ).toEqual( "http://example.com/resource#child" );
			} );

			it( "should return replaced named fragment when parent is named fragment and relative named fragment", () => {
				expect( URI.resolve( "http://example.com/resource#some", "#child" ) ).toEqual( "http://example.com/resource#child" );
			} );

			it( "should return replaced resource with hash when parent is named fragment and relative resource with hash", () => {
				expect( URI.resolve( "http://example.com/resource#some", "child#another" ) ).toEqual( "http://example.com/child#another" );
			} );

			it( "should return resource with query params when parent is empty named fragment and relative query params", () => {
				expect( URI.resolve( "http://example.com/resource#", "?child" ) ).toEqual( "http://example.com/resource?child" );
			} );

			it( "should return named fragment with query params when parent is named fragment and relative query params", () => {
				expect( URI.resolve( "http://example.com/resource#some", "?child" ) ).toEqual( "http://example.com/resource#some?child" );
			} );

			it( "should replace query params when parent has query params and relative query params", () => {
				expect( URI.resolve( "http://example.com/resource?some", "?child" ) ).toEqual( "http://example.com/resource?child" );
			} );

			it( "should replace query params when parent has query params and relative fragment with query params", () => {
				expect( URI.resolve( "http://example.com/resource?some", "#child?another" ) ).toEqual( "http://example.com/resource#child?another" );
			} );


			it( "should return same child when child is absolute", () => {
				expect( URI.resolve( "http://example.com/resource/", "http://example.com/resource/child/" ) ).toEqual( "http://example.com/resource/child/" );
			} );

			it( "should return same prefixed named when child is prefixed name", () => {
				expect( URI.resolve( "http://example.com/resource/", "prefix:resource" ) ).toEqual( "prefix:resource" );
			} );

			it( "should return same blank node when child is blank node", () => {
				expect( URI.resolve( "http://example.com/resource/", "_:some-random-id" ) ).toEqual( "_:some-random-id" );
			} );

		} );

		describe( "URI.removeProtocol", () => {

			it( "should exist", () => {
				expect( URI.removeProtocol ).toBeDefined();
				expect( URI.removeProtocol ).toEqual( jasmine.any( Function ) );
			} );

			it( "should remove protocol when protocol is http", () => {
				expect( URI.removeProtocol( "http://example.com/resource" ) ).toEqual( "example.com/resource" );
			} );

			it( "should remove protocol when protocol is https", () => {
				expect( URI.removeProtocol( "https://example.com/resource" ) ).toEqual( "example.com/resource" );
			} );


			it( "should return same when empty protocol", () => {
				expect( URI.removeProtocol( "://example.com/resource" ) ).toEqual( "://example.com/resource" );
			} );

			it( "should return same when has not protocol", () => {
				expect( URI.removeProtocol( "example.com/resource" ) ).toEqual( "example.com/resource" );
			} );

			it( "should return same when prefixed name", () => {
				expect( URI.removeProtocol( "prefix:resource" ) ).toEqual( "prefix:resource" );
			} );

		} );

		describe( "URI.prefix", () => {

			it( "should exist", () => {
				expect( URI.prefix ).toBeDefined();
				expect( URI.prefix ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return prefixed when prefixURI exists in the URI", () => {
				expect( URI.prefix( "http://example.com/resource/", "prefix", "http://example.com/" ) ).toBe( "prefix:resource/" );
			} );

			it( "should return prefixed when URI already prefixed", () => {
				expect( URI.prefix( "prefix:resource/", "prefix", "http://example.com/" ) ).toBe( "prefix:resource/" );
			} );

			it( "should return maintain prefixed even prefixURI match", () => {
				expect( URI.prefix( "prefix:resource/", "another_prefix", "prefix" ) ).toBe( "prefix:resource/" );
			} );

			it( "should return absolute when no match prefixURI", () => {
				expect( URI.prefix( "http://example.com/resource/", "prefix", "http://another_example.com/" ) ).toBe( "http://example.com/resource/" );
			} );


			it( "should return prefixed when match in the schema", () => {
				const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"prefix": "http://example.com/",
					"some_resource": {
						"@id": "prefix:some_resource",
						"@type": "@id",
					},
				} );

				expect( URI.prefix( "http://example.com/resource/", digestedSchema ) ).toBe( "prefix:resource/" );
			} );

			it( "should return absolute when no match in the schema", () => {
				const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"another_prefix": "http://another_example.com/",
					"some_resource": {
						"@id": "prefix:some_resource",
						"@type": "@id",
					},
				} );

				expect( URI.prefix( "http://example.com/resource/", digestedSchema ) ).toBe( "http://example.com/resource/" );
			} );

			it( "should return same prefixed when already prefixed", () => {
				const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( {
					"xsd": "http://www.w3.org/2001/XMLSchema#",
					"prefix": "http://example.com/",
					"some_resource": {
						"@id": "prefix:some_resource",
						"@type": "@id",
					},
				} );

				expect( URI.prefix( "prefix:resource/", digestedSchema ) ).toBe( "prefix:resource/" );
			} );

		} );

	} );

} );
