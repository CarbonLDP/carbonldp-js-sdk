import { isDefined, module, reexports, STATIC } from "../test/JasmineExtender";

import * as Utils from "../Utils";

import * as RDF from "./";

import { RDFDocument, RDFDocumentFactory } from "./Document";
import { RDFList, RDFListFactory } from "./List";
import { RDFLiteral, RDFLiteralFactory, Serializer, Serializers } from "./Literal";
import { RDFNode, RDFNodeFactory, RDFNodePropertyValue } from "./Node";
import { URI, URIFactory } from "./URI";
import { RDFValue, RDFValueFactory } from "./Value";


describe( module( "carbonldp/RDF" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDF ).toBeDefined();
		expect( Utils.isObject( RDF ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Serializers",
		"carbonldp/RDF/Serializers"
	), ():void => {
		expect( RDF.Serializers ).toBeDefined();
		expect( RDF.Serializers ).toBe( Serializers );
	} );

	it( reexports(
		STATIC,
		"RDFLiteral",
		"carbonldp/RDF/RDFLiteral"
	), ():void => {
		expect( RDF.RDFLiteral ).toBeDefined();
		expect( RDF.RDFLiteral ).toBe( RDFLiteral );
	} );

	it( reexports(
		STATIC,
		"Serializer",
		"CarbonLDP.RDF.Literal.Serializer"
	), ():void => {
		const target:RDF.Serializer = {} as Serializer;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RDFLiteralFactory",
		"CarbonLDP.RDF.RDFLiteralFactory"
	), ():void => {
		const target:RDF.RDFLiteralFactory = {} as RDFLiteralFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RDFDocument",
		"CarbonLDP.RDF.RDFDocument"
	), ():void => {
		expect( RDF.RDFDocument ).toBeDefined();
		expect( RDF.RDFDocument ).toBe( RDFDocument );
	} );

	it( reexports(
		STATIC,
		"RDFDocumentFactory",
		"CarbonLDP.RDF.RDFDocumentFactory"
	), ():void => {
		const target:RDF.RDFDocumentFactory = {} as RDFDocumentFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RDFList",
		"CarbonLDP.RDF.RDFList"
	), ():void => {
		expect( RDF.RDFList ).toBeDefined();
		expect( RDF.RDFList ).toBe( RDFList );
	} );

	it( reexports(
		STATIC,
		"RDFListFactory",
		"CarbonLDP.RDF.RDFListFactory"
	), ():void => {
		const target:RDF.RDFListFactory = {} as RDFListFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RDFNode",
		"CarbonLDP.RDF.RDFNode"
	), ():void => {
		expect( RDF.RDFNode ).toBeDefined();
		expect( RDF.RDFNode ).toBe( RDFNode );
	} );

	it( reexports(
		STATIC,
		"RDFNodeFactory",
		"CarbonLDP.RDF.RDFNodeFactory"
	), ():void => {
		const target:RDF.RDFNodeFactory = {} as RDFNodeFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RDFNodePropertyValue",
		"CarbonLDP.RDF.RDFNodePropertyValue"
	), ():void => {
		const target:RDF.RDFNodePropertyValue = {} as RDFNodePropertyValue;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"URI",
		"CarbonLDP.RDF.URI"
	), ():void => {
		expect( RDF.URI ).toBeDefined();
		expect( RDF.URI ).toBe( URI );
	} );

	it( reexports(
		STATIC,
		"URIFactory",
		"CarbonLDP.RDF.URIFactory"
	), ():void => {
		const target:RDF.URIFactory = {} as URIFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"RDFValue",
		"CarbonLDP.RDF.RDFValue"
	), ():void => {
		expect( RDF.RDFValue ).toBeDefined();
		expect( RDF.RDFValue ).toBe( RDFValue );
	} );

	it( reexports(
		STATIC,
		"RDFValueFactory",
		"CarbonLDP.RDF.RDFValueFactory"
	), ():void => {
		const target:RDF.RDFValueFactory = {} as RDFValueFactory;
		expect( target ).toBeDefined();
	} );

} );
