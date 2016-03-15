/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as Literal from "./RDF/Literal";
import * as Document from "./RDF/Document";
import * as List from "./RDF/List";
import * as Node from "./RDF/RDFNode";
import * as URI from "./RDF/URI";
import * as Value from "./RDF/Value";

import * as RDF from "./RDF";

describe( module( "Carbon/RDF" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDF ).toBeDefined();
		expect( Utils.isObject( RDF ) ).toBe( true );
	});

	it( reexports(
		STATIC,
		"Literal",
		"Carbon/RDF/Literal"
	), ():void => {
		expect( RDF.Literal ).toBeDefined();
		expect( RDF.Literal ).toBe( Literal );
	});

	it( reexports(
		STATIC,
		"Document",
		"Carbon/RDF/Document"
	), ():void => {
		expect( RDF.Document ).toBeDefined();
		expect( RDF.Document ).toBe( Document );
	});

	it( reexports(
		STATIC,
		"List",
		"Carbon/RDF/List"
	), ():void => {
		expect( RDF.List ).toBeDefined();
		expect( RDF.List ).toBe( List );
	});

	it( reexports(
		STATIC,
		"Node",
		"Carbon/RDF/Node"
	), ():void => {
		expect( RDF.Node ).toBeDefined();
		expect( RDF.Node ).toBe( Node );
	});

	it( reexports(
		STATIC,
		"URI",
		"Carbon/RDF/URI"
	), ():void => {
		expect( RDF.URI ).toBeDefined();
		expect( RDF.URI ).toBe( URI );
	});

	it( reexports(
		STATIC,
		"Value",
		"Carbon/RDF/Value"
	), ():void => {
		expect( RDF.Value ).toBeDefined();
		expect( RDF.Value ).toBe( Value );
	});

});