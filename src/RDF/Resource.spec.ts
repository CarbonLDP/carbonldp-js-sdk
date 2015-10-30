/// <reference path="../../typings/jasmine/jasmine.d.ts" />
import * as Utils from '../Utils';
import * as XSD from '../namespaces/XSD';
import * as Resource from './Resource';
import PropertyDescription from './PropertyDescription';

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
} from './../test/JasmineExtender';
//@formatter:on

describe( module( 'Carbon.Resource' ), function () {

	describe( submodule( STATIC, 'Factory' ), function () {

		var factory:Resource.Factory;
		var object:Object;
		var descriptions:Object;

		beforeEach( function () {
			factory = new Resource.Factory();

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
			descriptions = {
				'title': {
					uri: 'http://example.com/ns#title',
					multi: false,
					literal: true
				},
				'comment': {
					uri: 'http://example.com/ns#comment',
					multi: true,
					literal: false
				}
			};
		} );

		it( isDefined(), function () {
			expect( Resource.Factory ).toBeDefined();
		} );

		it( hasConstructor(), function () {
			var instance = new Resource.Factory();
			expect( instance instanceof Resource.Factory ).toBe( true );
		} );

		it( hasMethod( STATIC, 'injectDefinitions', '', [
			{name: 'resource', type: 'Object'},
			{name: 'definitions', type: 'Map<string, Map<string, Carbon.RDF.PropertyDescription>>'}
		], {type: 'Object'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'injectDefinitions', '', [
			{name: 'resources', type: 'Array<Object>'},
			{name: 'definitions', type: 'Map<string, Map<string, Carbon.RDF.PropertyDescription>>'}
		], {type: 'Array<Object>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'injectDescriptions', '', [
			{name: 'resource', type: 'Object'},
			{name: 'descriptions', type: 'Map<string, Carbon.RDF.PropertyDescription>'}
		], {type: 'Object'} ), function () {
			// TODO: Test
		} );
		it( hasMethod( STATIC, 'injectDescriptions', '', [
			{name: 'resource', type: 'Object'},
			{name: 'descriptions', type: 'Object'}
		], {type: 'Object'} ), function () {
			expect( Resource.Factory.injectDescriptions ).toBeDefined();

			var resource:Resource.Class = <Resource.Class> Resource.factory.from( object );
			var post:any = Resource.Factory.injectDescriptions( resource, descriptions );

			expect( post.title ).toBeDefined();
			expect( post.title ).toEqual( 'Dummy Post' );

			post.title = 'My awesome post';

			expect( post[ 'http://example.com/ns#title' ][ 0 ][ '@value' ] ).toEqual( 'My awesome post' );
			expect( post[ 'http://example.com/ns#title' ][ 0 ][ '@type' ] ).toEqual( XSD.DataType.string );

			var comments:any = post.comment;
			expect( comments ).toBeDefined();
			expect( Utils.isArray( comments ) ).toBe( true );
			expect( comments.length ).toEqual( 3 );

			var comment:any = {'@id': 'http://example.com/posts/1/comments/4/'};
			comments.push( comment );

			comments = post[ 'http://example.com/ns#comment' ];
			expect( Utils.isArray( comments ) ).toBe( true );
			expect( comments.length ).toEqual( 4 );
			expect( Utils.isObject( comments[ 3 ] ) ).toBe( true );
			expect( comments[ 3 ][ '@id' ] ).toEqual( 'http://example.com/posts/1/comments/4/' );
		} );
		it( hasMethod( STATIC, 'injectDescriptions', '', [
			{name: 'resources', type: 'Array<Object>'},
			{name: 'descriptions', type: 'Map<string, Carbon.RDF.PropertyDescription>'}
		], {type: 'Object'} ), function () {
			// TODO: Test
		} );
		it( hasMethod( STATIC, 'injectDescriptions', '', [
			{name: 'resources', type: 'Array<Object>'},
			{name: 'descriptions', type: 'Object'}
		], {type: 'Object'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( INSTANCE, 'is', 'Checks if the value passed is a Resource (according to duck typing).', [
			{name: 'value', type: 'Object'}
		], {type: 'boolean'} ), function () {

			expect( factory.is ).toBeDefined();

			// TODO: Test
		} );
		it( hasMethod( INSTANCE, 'create', 'Creates an empty resource.', {type: 'object'} ), function () {

			expect( factory.create ).toBeDefined();

			// TODO: Test
		} );
		it( hasMethod( INSTANCE, 'from', 'Injects Resource properties and methods into the object passed.', [
			{name: 'object', type: 'Object'}
		], {type: 'Object'} ), function () {

			expect( factory.from ).toBeDefined();

			var resource:Resource.Class = <Resource.Class> Resource.factory.from( object );
			expect( resource.uri ).toBeDefined();
			expect( Utils.isFunction( resource.addProperty ) ).toBe( true );
			expect( Utils.isFunction( resource.hasProperty ) ).toBe( true );
			expect( Utils.isFunction( resource.getProperty ) ).toBe( true );
			expect( Utils.isFunction( resource.getPropertyValue ) ).toBe( true );
			expect( Utils.isFunction( resource.getPropertyURI ) ).toBe( true );
			expect( Utils.isFunction( resource.getProperties ) ).toBe( true );
			expect( Utils.isFunction( resource.getPropertyValues ) ).toBe( true );
			expect( Utils.isFunction( resource.getPropertyURIs ) ).toBe( true );
			expect( Utils.isFunction( resource.addProperty ) ).toBe( true );
			expect( Utils.isFunction( resource.setProperty ) ).toBe( true );
			expect( Utils.isFunction( resource.deleteProperty ) ).toBe( true );

			expect( Utils.hasPropertyDefined( resource, 'types' ) ).toBe( true );
		} );
		it( hasMethod( INSTANCE, 'from', 'Injects Resource properties and methods into the objects passed.', [
			{name: 'objects', type: 'Array<Object>'}
		], {type: 'Array<Object>'} ), function () {

			expect( factory.from ).toBeDefined();

			// TODO: Test
		} );

	} );

	it( hasProperty( STATIC, 'factory', 'Carbon.Resource.Factory' ), function () {
		expect( Resource.factory ).toBeDefined();
		expect( Resource.factory instanceof Resource.Factory ).toBe( true );
	} );
} );

describe( 'Resource.Factory', function () {

	var object;
	var descriptions:Object;

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
		descriptions = {
			'title': {
				uri: 'http://example.com/ns#title',
				multi: false,
				literal: true
			},
			'comment': {
				uri: 'http://example.com/ns#comment',
				multi: true,
				literal: false
			}
		};
	} );

	it( 'is defined', function () {
		expect( Resource.Factory ).not.toBeNull();
	} );

	it( "has static method, is( object ), which returns true if the object is an RDFResource (has an '@id')", function () {
		expect( Resource.factory.is ).toBeDefined();
		// TODO: Test
	} );
	it( "has static method, create(), which creates an empty Resource and returns it.", function () {
		expect( Resource.factory.create ).toBeDefined();
		// TODO: Test
	} );
	it( "has static method, from( object ), which injects RDFResource methods to the object and returns it", function () {
		expect( Resource.factory.from ).toBeDefined();

		var resource:Resource.Class = Resource.factory.from( object );
		expect( resource.uri ).toBeDefined();
		expect( Utils.isFunction( resource.addProperty ) ).toBe( true );
		expect( Utils.isFunction( resource.hasProperty ) ).toBe( true );
		expect( Utils.isFunction( resource.getProperty ) ).toBe( true );
		expect( Utils.isFunction( resource.getPropertyValue ) ).toBe( true );
		expect( Utils.isFunction( resource.getPropertyURI ) ).toBe( true );
		expect( Utils.isFunction( resource.getProperties ) ).toBe( true );
		expect( Utils.isFunction( resource.getPropertyValues ) ).toBe( true );
		expect( Utils.isFunction( resource.getPropertyURIs ) ).toBe( true );
		expect( Utils.isFunction( resource.addProperty ) ).toBe( true );
		expect( Utils.isFunction( resource.setProperty ) ).toBe( true );
		expect( Utils.isFunction( resource.deleteProperty ) ).toBe( true );

		expect( Utils.hasPropertyDefined( resource, 'types' ) ).toBe( true );
		// TODO: Finish test
	} );
	it( "has static method, injectDescriptions( resource, descriptions ), which injects properties that get/set uri properties to the object", function () {
		expect( Resource.Factory.injectDescriptions ).toBeDefined();

		var resource:Resource.Class = <Resource.Class> Resource.factory.from( object );
		var post:any = Resource.Factory.injectDescriptions( resource, descriptions );

		expect( post.title ).toBeDefined();
		expect( post.title ).toEqual( 'Dummy Post' );

		post.title = 'My awesome post';

		expect( post[ 'http://example.com/ns#title' ][ 0 ][ '@value' ] ).toEqual( 'My awesome post' );
		expect( post[ 'http://example.com/ns#title' ][ 0 ][ '@type' ] ).toEqual( XSD.DataType.string );

		var comments:any = post.comment;
		expect( comments ).toBeDefined();
		expect( Utils.isArray( comments ) ).toBe( true );
		expect( comments.length ).toEqual( 3 );

		var comment:any = {'@id': 'http://example.com/posts/1/comments/4/'};
		comments.push( comment );

		comments = post[ 'http://example.com/ns#comment' ];
		expect( Utils.isArray( comments ) ).toBe( true );
		expect( comments.length ).toEqual( 4 );
		expect( Utils.isObject( comments[ 3 ] ) ).toBe( true );
		expect( comments[ 3 ][ '@id' ] ).toEqual( 'http://example.com/posts/1/comments/4/' );
	} );

	it( "has static method, injectDescriptions( resources, descriptions ), which injects properties that get/set uri properties to the objects", function () {
		// TODO: Test
	} );
} );