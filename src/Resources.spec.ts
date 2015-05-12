/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/es6-promise-polyfill/es6-promise-polyfill.d.ts" />
import Documents from './Documents';
import Resources from './Resources';
import * as Utils from './Utils';
import * as es6Promise from 'es6-promise-polyfill';

es6Promise.polyfill();

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
	it( 'has method get( uri, options ) which makes an AJAX GET request and returns a promise with the response', function ( done ) {
		expect( Resources ).toBeDefined();
		expect( Utils.isFunction( Resources ) ).toBe( true );

		// TODO: Mock Documents module
		var documents = new Documents();

		var resources = new Resources( documents );
		expect( resources.get ).toBeTruthy();

		var failTest = function ( error ) {
			console.log( error );
			expect( true ).toBe( false );
		};
		var testPromise = function ( promise:any ) {
			expect( promise ).toBeDefined();
			expect( promise instanceof Promise ).toBeTruthy();
		};

		var promises:Promise<any>[] = [], promise:Promise<any>;

		jasmine.Ajax.stubRequest( 'http://example.org/resource', null, 'GET' ).andReturn( {
			status: 200,
			responseHeaders: [],
			responseText: '[{"@graph":[{"@id":"http://local.carbonldp.com/platform/agents/19/","@type":["http://www.w3.org/ns/ldp#BasicContainer","http://carbonldp.com/ns/v1/security#Agent","http://www.w3.org/ns/ldp#RDFSource","http://www.w3.org/ns/ldp#Container"],"http://carbonldp.com/ns/v1/platform#created":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2015-05-05T17:03:37.969-05:00"}],"http://carbonldp.com/ns/v1/platform#defaultInteractionModel":[{"@id":"http://www.w3.org/ns/ldp#RDFSource"}],"http://carbonldp.com/ns/v1/platform#modified":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2015-05-05T17:03:37.969-05:00"}],"http://carbonldp.com/ns/v1/security#enabled":[{"@type":"http://www.w3.org/2001/XMLSchema#boolean","@value":"true"}],"http://carbonldp.com/ns/v1/security#password":[{"@value":"4b713318f9a646fdab74261e8142ef66715a8f8264821a3bab93090a18d77f65"}],"http://carbonldp.com/ns/v1/security#platformRole":[{"@id":"http://local.carbonldp.com/platform/roles/app-developer/"}],"http://carbonldp.com/ns/v1/security#salt":[{"@value":"fjrr237ucqfgif75l342s64425"}],"http://www.w3.org/2001/vcard-rdf/3.0#email":[{"@value":"19@carbonldp.com"}],"http://www.w3.org/ns/ldp#hasMemberRelation":[{"@id":"http://www.w3.org/ns/ldp#member"}]}],"@id":"http://local.carbonldp.com/platform/agents/19/"}]'
		} );

		promise = resources.get( 'http://example.org/resource' );

		promises.push( promise.then( function ( resource:any ) {
			expect( resource ).toBeDefined();
			// TODO: Finish
		}, failTest ) );

		Promise.all( promises ).then( done, done );
	} );
} );