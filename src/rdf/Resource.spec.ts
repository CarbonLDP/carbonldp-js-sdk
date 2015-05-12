/// <reference path="../../typings/jasmine/jasmine.d.ts" />
import * as Utils from '../Utils';
import * as XSD from '../namespaces/XSD';
import * as Resource from './Resource';
import PropertyDescription from './PropertyDescription';

describe( 'Resource.Factory', function () {

	var object;
	var descriptions:PropertyDescription[];

	beforeEach( function () {
		object = {
			'@id': 'http://example.com/posts/1/',
			'http://example.com/ns#title': [
				{
					'@value': 'Dummy Post'
				}
			],
			'http://example.com/ns#comment': [
				{
					'@id': 'http://example.com/posts/1/comments/1/'
				},
				{
					'@id': 'http://example.com/posts/1/comments/2/'
				},
				{
					'@id': 'http://example.com/posts/1/comments/3/'
				}
			]
		};
		descriptions = [
			{
				name: 'title',
				uri: 'http://example.com/ns#title',
				multi: false,
				literal: true
			},
			{
				name: 'comment',
				uri: 'http://example.com/ns#comment',
				multi: true,
				literal: false
			}
		];
	} );

	it( 'is defined', function () {
		expect( Resource.Factory ).not.toBeNull();
	} );

	it( "has static method, is( object ), which returns true if the object is an RDFResource (has an '@id')", function () {
		expect( Resource.Factory.is ).toBeDefined();
		// TODO: Test
	} );
	it( "has static method, from( object ), which injects RDFResource methods to the object and returns it", function () {
		expect( Resource.Factory.from ).toBeDefined();

		var resource:Resource.Class = Resource.Factory.from( object );
		expect( resource.uri ).toBeDefined();
		expect( Utils.isFunction( resource.addProperty ) ).toBeTruthy();
		expect( Utils.isFunction( resource.hasType ) ).toBeTruthy();
		expect( Utils.isFunction( resource.hasProperty ) ).toBeTruthy();
		expect( Utils.isFunction( resource.getProperty ) ).toBeTruthy();
		expect( Utils.isFunction( resource.getPropertyValue ) ).toBeTruthy();
		expect( Utils.isFunction( resource.getPropertyURI ) ).toBeTruthy();
		expect( Utils.isFunction( resource.getProperties ) ).toBeTruthy();
		expect( Utils.isFunction( resource.getPropertyValues ) ).toBeTruthy();
		expect( Utils.isFunction( resource.getPropertyURIs ) ).toBeTruthy();
		expect( Utils.isFunction( resource.addProperty ) ).toBeTruthy();
		expect( Utils.isFunction( resource.setProperty ) ).toBeTruthy();
		expect( Utils.isFunction( resource.removeProperty ) ).toBeTruthy();
		// TODO: Finish test
	} );
	it( "has static method, injectDescriptions( resource, descriptions ), which injects properties that get/set uri properties to the object", function () {
		expect( Resource.Factory.injectDescriptions ).toBeDefined();

		var resource:Resource.Class = Resource.Factory.from( object );
		var post:any = Resource.Factory.injectDescriptions( resource, descriptions );

		expect( post.title ).toBeDefined();
		expect( post.title ).toEqual( 'Dummy Post' );

		post.title = 'My awesome post';

		expect( post[ 'http://example.com/ns#title' ][ 0 ][ '@value' ] ).toEqual( 'My awesome post' );
		expect( post[ 'http://example.com/ns#title' ][ 0 ][ '@type' ] ).toEqual( XSD.DataType.string );

		var comments:any = post.comment;
		expect( comments ).toBeDefined();
		expect( Utils.isArray( comments ) ).toBeTruthy();
		expect( comments.length ).toEqual( 3 );

		var comment:any = {'@id': 'http://example.com/posts/1/comments/4/'};
		comments.push( comment );

		comments = post[ 'http://example.com/ns#comment' ];
		expect( Utils.isArray( comments ) ).toBeTruthy();
		expect( comments.length ).toEqual( 4 );
		expect( Utils.isObject( comments[ 3 ] ) ).toBeTruthy();
		expect( comments[ 3 ][ '@id' ] ).toEqual( 'http://example.com/posts/1/comments/4/' );
	} );

	it( "has static method, injectDescriptions( resources, descriptions ), which injects properties that get/set uri properties to the objects", function () {
		// TODO: Test
	} );
} );