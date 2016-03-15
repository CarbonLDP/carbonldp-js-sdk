/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as C from "./NS/C";
import * as CP from "./NS/CP";
import * as CS from "./NS/CS";
import * as LDP from "./NS/LDP";
import * as RDF from "./NS/RDF";
import * as XSD from "./NS/XSD";

import * as NS from "./NS";

describe( module( "Carbon/NS" ), ():void => {

	it( isDefined(), ():void => {
		expect( NS ).toBeDefined();
		expect( Utils.isObject( NS ) ).toBe( true );
	});

	it( reexports(
		STATIC,
		"C",
		"Carbon/NS/C"
	), ():void => {
		expect( NS.C ).toBeDefined();
		expect( NS.C ).toBe( C );
	});

	it( reexports(
		STATIC,
		"CP",
		"Carbon/NS/CP"
	), ():void => {
		expect( NS.CP ).toBeDefined();
		expect( NS.CP ).toBe( CP );
	});

	it( reexports(
		STATIC,
		"CS",
		"Carbon/NS/CS"
	), ():void => {
		expect( NS.CS ).toBeDefined();
		expect( NS.CS ).toBe( CS );
	});

	it( reexports(
		STATIC,
		"LDP",
		"Carbon/NS/LDP"
	), ():void => {
		expect( NS.LDP ).toBeDefined();
		expect( NS.LDP ).toBe( LDP );
	});

	it( reexports(
		STATIC,
		"RDF",
		"Carbon/NS/RDF"
	), ():void => {
		expect( NS.RDF ).toBeDefined();
		expect( NS.RDF ).toBe( RDF );
	});

	it( reexports(
		STATIC,
		"XSD",
		"Carbon/NS/XSD"
	), ():void => {
		expect( NS.XSD ).toBeDefined();
		expect( NS.XSD ).toBe( XSD );
	});

});