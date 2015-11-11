/// <reference path="../typings/jasmine/jasmine.d.ts" />
import * as Document from "./Document";
import * as Utils from "./Utils";

import {
	INSTANCE,
	STATIC,
	module,
	submodule,
	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty
} from "./test/JasmineExtender";

// TODO: Change module name
describe( module( "Carbon.Resource" ), function():void {
	it( "works", function():void {
		let document:Document.Class = Document.factory.from( {
			"@id": "http://example.com/",
			"@graph": [
				{
					"@id": "http://example.com/"
				},
				{
					"@id": "_:1"
				},
				{
					"@id": "_:2"
				},
				{
					"@id": "http://example.com/#1"
				},
				{
					"@id": "http://example.com/#2"
				}
			]
		} );

		expect( document.hasFragment( "1" ) ).toEqual( true );
		expect( document.hasFragment( "2" ) ).toEqual( true );
		expect( document.hasFragment( "3" ) ).toEqual( false );
		expect( document._fragmentsIndex.size ).toEqual( 4 );
		expect( document.getFragment( "1" ).document ).toEqual( document );
		expect( document.getFragment( "_:1" ).document ).toEqual( document );
		expect( document.createFragment().document ).toEqual( document );
		expect( document._fragmentsIndex.size ).toEqual( 5 );
	});
});
