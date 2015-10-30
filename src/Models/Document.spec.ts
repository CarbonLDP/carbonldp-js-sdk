/// <reference path="../../typings/jasmine/jasmine.d.ts" />
import * as Document from './Document';
import * as Utils from './../Utils';

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

// TODO: Change module name
describe( module( 'Carbon.Resource' ), function () {
	it( 'works', function() {
		var document:Document.Class = Document.factory.from( {
			'@graph': [
				{
					'@id': 'http://example.org/'
				},
				{
					'@id': '_:1'
				},
				{
					'@id': '_:2'
				},
				{
					'@id': 'http://example.org/#1'
				},
				{
					'@id': 'http://example.org/#2'
				}
			]
		} );

		expect( document.hasFragment( '1' ) ).toEqual( true );
		expect( document.hasFragment( '2' ) ).toEqual( true );
		expect( document.hasFragment( '3' ) ).toEqual( false );
		expect( document._fragmentsIndex.size ).toEqual( 4 );
		expect( document.getFragment( '1' ).document ).toEqual( document );
		expect( document.getFragment( '_:1' ).document ).toEqual( document );
		expect( document.createFragment().document ).toEqual( document );
		expect( document._fragmentsIndex.size ).toEqual( 5 );
	});
});