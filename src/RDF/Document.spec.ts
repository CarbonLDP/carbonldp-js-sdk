/// <reference path="./../../typings/typings.d.ts" />
/// <reference path="./../../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../../typings/jasmine-ajax/mock-ajax.d.ts" />

import {
		INSTANCE,
		STATIC,

		module,
		submodule,

		isDefined,

		interfaze,
		clazz,
		method,

		hasConstructor,
		hasMethod,
		hasSignature,
		hasProperty,
		hasInterface,
		extendsClass,

		MethodArgument,
} from "./../test/JasmineExtender";

import * as RDFNode from "./RDFNode";
import * as RDFDocument from "./Document";
import * as Utils from "../Utils";

describe( module( "Carbon/RDF/Document" ), ():void => {
	it( isDefined(), ():void => {
		expect( RDFDocument ).toBeDefined();
	} );

	describe( clazz( "Carbon.RDF.Document.Util", "" ), ():void => {
		let document:RDFDocument.Class;

		beforeEach( ():void => {
			document = {
				"@id": "",
				"@graph": [
					{ "@id": "http://example.org/resource/1" },
					{ "@id": "http://example.org/resource/1#fragment-1" },
					{ "@id": "http://example.org/resource/1#fragment-2" },
					{ "@id": "http://example.org/resource/1#fragment-3" },
					{ "@id": "http://example.org/resource/1/child/" },
					{ "@id": "http://example.org/resource/1/child/#fragment-1" },
					{ "@id": "http://example.org/resource/1/child/#fragment-2" },
					{ "@id": "http://example.org/resource/1/child/#fragment-3" },
					{ "@id": "http://example.org/resource/2" },
					{ "@id": "http://example.org/resource/2#fragment-1" },
					{ "@id": "http://example.org/resource/2#fragment-2" },
					{ "@id": "http://example.org/resource/2#fragment-3" },
				],
			};
		} );

		it( isDefined(), ():void => {
			expect( RDFDocument.Util ).toBeDefined();
		} );
		it( hasMethod( STATIC, "getDocumentResources", "Returns all the document resources from a document.", [
			{ name: "document", type: "Carbon.RDF.Node.Class[]" }
		], { type: "Carbon.RDF.Node.Class[]" } ), ():void => {
			expect( RDFDocument.Util.getDocumentResources ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Util.getDocumentResources ) ).toBeTruthy();

			let documentResources:RDFNode.Class[];

			documentResources = RDFDocument.Util.getDocumentResources( document );
			expect( documentResources ).not.toBeNull();
			expect( Utils.isArray( documentResources ) ).toBeTruthy();
			expect( documentResources.length ).toBe( 3 );

			documentResources = RDFDocument.Util.getDocumentResources( document[ "@graph" ] );
			expect( documentResources ).not.toBeNull();
			expect( Utils.isArray( documentResources ) ).toBeTruthy();
			expect( documentResources.length ).toBe( 3 );
		} );
		it( hasMethod( STATIC, "getFragmentResources", "that returns all the fragments of the document.", [
			{ name: "document", type: "Carbon.RDF.Node.Class[]" },
			{ name: "documentResource", type: "Carbon.RDF.Node.Class" },
		], { type: "Carbon.RDF.Node.Class[]" } ), ():void => {
			expect( RDFDocument.Util.getFragmentResources ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Util.getFragmentResources ) ).toBeTruthy();

			let fragments:RDFNode.Class[];

			fragments = RDFDocument.Util.getFragmentResources( document );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 9 );

			fragments = RDFDocument.Util.getFragmentResources( document[ "@graph" ] );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 9 );

			let documentResource:RDFNode.Class = {
				"@id": "http://example.org/resource/1"
			};

			fragments = RDFDocument.Util.getFragmentResources( document, documentResource );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 3 );

			fragments = RDFDocument.Util.getFragmentResources( document, "http://example.org/resource/1/child/" );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 3 );
		} );
	} );
} );
