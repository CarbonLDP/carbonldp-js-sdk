import {
	module,
	clazz,

	hasDefaultExport,
	isDefined,
} from "../test/JasmineExtender";

import * as Builder from "./Builder";
import DefaultExport from "./Builder";

describe( module( "Carbon/SPARQL/Builder", "Module that reexports the customized SPARQLER class." ), ():void => {

	it( isDefined(), ():void => {
		expect( Builder ).toBeDefined();
		expect( Builder ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.SPARQL.Builder.Class", "Customized SPARQLER class to be used by the SDK" ), ():void => {
	} );

	it( hasDefaultExport( "Carbon.SPARQL.Builder.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Builder.Class );
	} );

} );
