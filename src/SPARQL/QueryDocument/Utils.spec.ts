import { INSTANCE, method, module } from "../../test/JasmineExtender";

import * as Utils from "./Utils";

describe( module( "Carbon/SPARQL/QueryDocument/Utils" ), ():void => {

	it( "should exists", ():void => {
		expect( Utils ).toBeDefined();
		expect( Utils ).toEqual( jasmine.any( Object ) );
	} );

	describe( method( INSTANCE, "getLevelRegExp" ), ():void => {

		it( "should exists", ():void => {
			expect( Utils.getLevelRegExp ).toBeDefined();
			expect( Utils.getLevelRegExp ).toEqual( jasmine.any( Function ) );
		} );

		it( "should create a regex for no property level", ():void => {
			const regex:RegExp = Utils.getLevelRegExp( "" );
			expect( regex ).toEqual( /^[^.]+$/ );
		} );

		it( "should create a regex for a specific property level", ():void => {
			const documentLevel:RegExp = Utils.getLevelRegExp( "document" );
			expect( documentLevel ).toEqual( /^document\.[^.]+$/ );

			const propertyLevel:RegExp = Utils.getLevelRegExp( "property" );
			expect( propertyLevel ).toEqual( /^property\.[^.]+$/ );
		} );

		it( "should create a regex for a specific sub property level", ():void => {
			const subPropertyLevel:RegExp = Utils.getLevelRegExp( "property.sub-property" );
			expect( subPropertyLevel ).toEqual( /^property\.sub-property\.[^.]+$/ );

			const subSubPropertyLevel:RegExp = Utils.getLevelRegExp( "property.sub-property.sub-sub-property" );
			expect( subSubPropertyLevel ).toEqual( /^property\.sub-property\.sub-sub-property\.[^.]+$/ );
		} );

	} );

} );
