import {
	STATIC,

	module,

	isDefined,
	reexports,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as Literal from "./Literal";
import * as Document from "./Document";
import * as List from "./List";
import * as Node from "./Node";
import * as URI from "./URI";
import * as Value from "./Value";

import * as RDF from "./";

describe( module( "carbonldp/RDF" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDF ).toBeDefined();
		expect( Utils.isObject( RDF ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Literal",
		"carbonldp/RDF/Literal"
	), ():void => {
		expect( RDF.Literal ).toBeDefined();
		expect( RDF.Literal ).toBe( Literal );
	} );

	it( reexports(
		STATIC,
		"Document",
		"carbonldp/RDF/Document"
	), ():void => {
		expect( RDF.Document ).toBeDefined();
		expect( RDF.Document ).toBe( Document );
	} );

	it( reexports(
		STATIC,
		"List",
		"carbonldp/RDF/List"
	), ():void => {
		expect( RDF.List ).toBeDefined();
		expect( RDF.List ).toBe( List );
	} );

	it( reexports(
		STATIC,
		"Node",
		"carbonldp/RDF/Node"
	), ():void => {
		expect( RDF.Node ).toBeDefined();
		expect( RDF.Node ).toBe( Node );
	} );

	it( reexports(
		STATIC,
		"URI",
		"carbonldp/RDF/URI"
	), ():void => {
		expect( RDF.URI ).toBeDefined();
		expect( RDF.URI ).toBe( URI );
	} );

	it( reexports(
		STATIC,
		"Value",
		"carbonldp/RDF/Value"
	), ():void => {
		expect( RDF.Value ).toBeDefined();
		expect( RDF.Value ).toBe( Value );
	} );

} );
