/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
//@formatter:off
import App from './App';
import Documents from './Documents';
import Resources from './Resources';
import * as Utils from './Utils';
//@formatter:on

describe( 'Resources', function () {
	beforeEach( function () {
		jasmine.Ajax.install();
	} );

	afterEach( function () {
		jasmine.Ajax.uninstall();
	} );

	it( 'is defined', function () {
		expect( Resources ).toBeDefined();
	} );

	// TODO: Fix test
	xit( 'has method get( uri, options ) which makes an AJAX GET request and returns a promise with the response', function ( done ) {
		var app = new App( null, null );

		app.addDefinition( 'http://example.org/ns#BlogPost', {
			'title': {
				uri: 'http://example.org/ns#title',
				multi: false,
				literal: true
			}
		} );

		var resources = app.Resources;

		expect( resources.get ).toBeDefined();

		var failTest = function ( error ) {
			console.log( error );
			expect( true ).toBe( false );
		};
		var testPromise = function ( promise:any ) {
			expect( promise ).toBeDefined();
			expect( promise instanceof Promise ).toBe( true );
		};

		var promises:Promise<any>[] = [], promise:Promise<any>;

		jasmine.Ajax.stubRequest( 'http://example.org/resource', null, 'GET' ).andReturn( {
			status: 200,
			responseHeaders: [],
			// resources/post.json
			responseText: '{"@context":{"acl":"http://www.w3.org/ns/auth/acl#","api":"http://purl.org/linked-data/api/vocab#","c":"http://carbonldp.com/ns/v1/platform#","cs":"http://carbonldp.com/ns/v1/security#","cp":"http://carbonldp.com/ns/v1/patch#","cc":"http://creativecommons.org/ns#","cert":"http://www.w3.org/ns/auth/cert#","dbp":"http://dbpedia.org/property/","dc":"http://purl.org/dc/terms/","dc11":"http://purl.org/dc/elements/1.1/","dcterms":"http://purl.org/dc/terms/","doap":"http://usefulinc.com/ns/doap#","example":"http://example.org/ns#","exif":"http://www.w3.org/2003/12/exif/ns#","fn":"http://www.w3.org/2005/xpath-functions#","foaf":"http://xmlns.com/foaf/0.1/","geo":"http://www.w3.org/2003/01/geo/wgs84_pos#","geonames":"http://www.geonames.org/ontology#","gr":"http://purl.org/goodrelations/v1#","http":"http://www.w3.org/2006/http#","ldp":"http://www.w3.org/ns/ldp#","log":"http://www.w3.org/2000/10/swap/log#","owl":"http://www.w3.org/2002/07/owl#","rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","rdfs":"http://www.w3.org/2000/01/rdf-schema#","rei":"http://www.w3.org/2004/06/rei#","rsa":"http://www.w3.org/ns/auth/rsa#","rss":"http://purl.org/rss/1.0/","sfn":"http://www.w3.org/ns/sparql#","sioc":"http://rdfs.org/sioc/ns#","skos":"http://www.w3.org/2004/02/skos/core#","swrc":"http://swrc.ontoware.org/ontology#","types":"http://rdfs.org/sioc/types#","vcard":"http://www.w3.org/2001/vcard-rdf/3.0#","wot":"http://xmlns.com/wot/0.1/","xhtml":"http://www.w3.org/1999/xhtml#","xsd":"http://www.w3.org/2001/XMLSchema#","BlogPost":"example:BlogPost","title":{"@id":"example:title","@type":"xsd:string"},"body":{"@id":"example:body","@type":"@id"},"PostBody":"example:PostBody","content":{"@id":"example:content","@type":"xsd:string"},"type":{"@id":"example:type","@type":"@id"},"HTMLBody":"example:HTMLBody","@base":"http://carbonldp.com/apps/my-blog/posts/post-1/"},"@graph":[{"@id":"","@type":["ldp:RDFSource","ldp:Container","ldp:BasicContainer","BlogPost"],"title":"My Awesome Blog Post","body":"#body"},{"@id":"#body","@type":["PostBody","HTMLBody"],"content":"<p>This is the body of the awesome post</p>"}]}'
		} );

		promise = resources.get( 'http://example.org/resource' );

		promises.push( promise.then( function ( processedResponse:any ) {
			expect( processedResponse ).toBeDefined();

			var resource = processedResponse.result;

			expect( resource.title ).toEqual( 'My Awesome Blog Post' );
		}, failTest ) );

		Promise.all( promises ).then( done, done );
	} );
} );