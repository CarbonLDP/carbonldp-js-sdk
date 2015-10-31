/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/jasmine-ajax/mock-ajax.d.ts" />

import Parent from './Parent';
import * as Documents from './Documents';

import * as Utils from './Utils';

//@formatter:off
import {
	INSTANCE,
	STATIC,
	module,
	submodule,
	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty
} from './test/JasmineExtender';
//@formatter:on

// TODO: Change module name
describe( module( 'Carbon.Documents' ), function () {

	beforeEach( function () {
		jasmine.Ajax.install();
	} );

	afterEach( function () {
		jasmine.Ajax.uninstall();
	} );

	it( isDefined(), function() {
		expect( Documents ).toBeDefined();
	});

	it( hasMethod( INSTANCE, 'from', [
		{ name:'uri', type:'string' }
	], { type:'Promise<Carbon.HTTP.ProcessedResponse<Carbon.Document>>'}), function( done ) {
		let parent:Parent = new Parent();

		let responseBody:string = JSON.stringify({
			"@id": "http://example.com/resource/",
			"@graph": [
				{
					"@id": "http://example.com/resource/",
					"http://example.com/vocabulary/#name": [{ "@value": "Document Resource" }]
				},
				{
					"@id": "_:1",
					"http://example.com/vocabulary/#name": [{ "@value": "Fragment 1" }]
				},
				{
					"@id": "_:2",
					"http://example.com/vocabulary/#name": [{ "@value": "Fragment 2" }]
				},
				{
					"@id": "http://example.com/resource/#1",
					"http://example.com/vocabulary/#name": [{ "@value": "NamedFragment 1" }]
				},
				{
					"@id": "http://example.com/resource/#2",
					"http://example.com/vocabulary/#name": [{ "@value": "NamedFragment 1" }]
				}
			]
		});

		jasmine.Ajax.stubRequest( 'http://example.com/resource/', null, 'GET' ).andReturn( {
			status: 200,
			responseHeaders: [],
			responseText: responseBody
		} );

		parent.Documents.get( 'http://example.com/resource/' ).then( function ( processedResponse:any ) {
			expect( processedResponse ).toBeDefined();
		}, failTest ).then( done, done );
	});

	function failTest( error:any ):void {
		console.log( error );
		expect( true ).toBe( false );
	}
});