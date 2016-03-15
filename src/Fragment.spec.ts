/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Document from "./Document";
import * as URI from "./RDF/URI";

import * as Fragment from "./Fragment";

describe( module( "Carbon/Fragment" ), ():void => {

	it( isDefined(), ():void => {
		expect( Fragment ).toBeDefined();
		expect( Utils.isObject( Fragment ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Fragment.Factory",
		"Factory class for Fragment objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Fragment.Factory ).toBeDefined();
			expect( Utils.isFunction( Fragment.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and functions of a Fragment object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Fragment.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Fragment.Factory.hasClassProperties ) ).toBe( true );

			let resource:Object = undefined;
			expect( Fragment.Factory.hasClassProperties( resource ) ).toBe( false );
			resource = {};
			expect( Fragment.Factory.hasClassProperties( resource ) ).toBe( false );

			resource["document"] = null;
			expect( Fragment.Factory.hasClassProperties( resource ) ).toBe( true );
		});

		let document:Document.Class;

		beforeAll( ():void => {
			document = Document.Factory.create( "http://example.com/document/" );
		});

		describe( method(
			STATIC,
			"create"
		), ():void => {

			it( hasSignature(
				"Creates a Fragment with the ID provided for the document specified.", [
					{ name: "id", type: "string" },
					{ name: "document", type: "Carbon.Document.Class" }
				],
				{ type: "Carbon.Fragment.Class" }
			), ():void => {
				expect( Fragment.Factory.create ).toBeDefined();
				expect( Utils.isFunction( Fragment.Factory.create ) ).toBe( true );

				let fragment:Fragment.Class;

				fragment = Fragment.Factory.create( "#fragment", document );
				expect( fragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.document ).toBe( document );
				expect( fragment.id ).toBe( "#fragment" );

				fragment = Fragment.Factory.create( "http://example.com/document/#fragment", document );
				expect( fragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.document ).toBe( document );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

				fragment = Fragment.Factory.create( "_:BlankNode", document );
				expect( fragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.document ).toBe( document );
				expect( fragment.id ).toBe( "_:BlankNode" );
			});

			it( hasSignature(
				"Create a Blank Node Fragment since no ID is provided for the specified document.", [
					{ name: "document", type: "Carbon.Document.Class" }
				],
				{ type: "Carbon.Fragment.Class" }
			), ():void => {
				expect( Fragment.Factory.create ).toBeDefined();
				expect( Utils.isFunction( Fragment.Factory.create ) ).toBe( true );

				let fragment1:Fragment.Class;
				let fragment2:Fragment.Class;

				fragment1 = Fragment.Factory.create( document );
				expect( fragment1 ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment1 ) ).toBe( true );
				expect( fragment1.document ).toBe( document );
				expect( URI.Util.isBNodeID( fragment1.id ) ).toBe( true );


				fragment2 = Fragment.Factory.create( document );
				expect( fragment2 ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment2 ) ).toBe( true );
				expect( fragment2.document ).toBe( document );
				expect( URI.Util.isBNodeID( fragment2.id ) ).toBe( true );

				expect( fragment1.id ).not.toEqual( fragment2.id );
			});

		});


		describe( method(
			STATIC,
			"createFrom"
		), ():void => {

			interface MyFragment {
				property:string;
			}

			it( hasSignature(
				"Creates a Fragment from an Object with the ID provided for the document specified.", [
					{ name: "object", type: "T extends Object" },
					{ name: "id", type: "string" },
					{ name: "document", type: "Carbon.Document.Class" }
				],
				{ type: "T & Carbon.Fragment.Class" }
			), ():void => {
				expect( Fragment.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( Fragment.Factory.createFrom ) ).toBe( true );

				let fragment:Fragment.Class & MyFragment;

				fragment = Fragment.Factory.createFrom<MyFragment>( { property: "my property 1" }, "#fragment", document );
				expect( fragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.document ).toBe( document );
				expect( fragment.id ).toBe( "#fragment" );
				expect( fragment.property ).toBe( "my property 1" );

				fragment = Fragment.Factory.createFrom<MyFragment>( { property: "my property 2" }, "http://example.com/document/#fragment", document );
				expect( fragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.document ).toBe( document );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				expect( fragment.property ).toBe( "my property 2" );

				fragment = Fragment.Factory.createFrom<MyFragment>( { property: "my property 3" }, "_:BlankNode", document );
				expect( fragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
				expect( fragment.document ).toBe( document );
				expect( fragment.id ).toBe( "_:BlankNode" );
				expect( fragment.property ).toBe( "my property 3" );

				let anotherFragment = Fragment.Factory.createFrom<Object>( {}, "_:AnotherBlankNode", document );
				expect( anotherFragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( anotherFragment ) ).toBe( true );
				expect( anotherFragment.document ).toBe( document );
				expect( anotherFragment.id ).toBe( "_:AnotherBlankNode" );
				expect( anotherFragment[ "property" ] ).toBeUndefined();
			});

			it( hasSignature(
				"Create a Blank Node Fragment since no ID is provided for the specified document.", [
					{ name: "object", type: "T extends Object" },
					{ name: "document", type: "Carbon.Document.Class" }
				],
				{ type: "Carbon.Fragment.Class" }
			), ():void => {
				expect( Fragment.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( Fragment.Factory.createFrom ) ).toBe( true );

				let fragment1:Fragment.Class & MyFragment;
				let fragment2:Fragment.Class & MyFragment;

				fragment1 = Fragment.Factory.createFrom<MyFragment>( { property: "my property 1" }, document );
				expect( fragment1 ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment1 ) ).toBe( true );
				expect( fragment1.document ).toBe( document );
				expect( URI.Util.isBNodeID( fragment1.id ) ).toBe( true );
				expect( fragment1.property ).toBe( "my property 1" );


				fragment2 = Fragment.Factory.createFrom<MyFragment>( { property: "my property 2" }, document );
				expect( fragment2 ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( fragment2 ) ).toBe( true );
				expect( fragment2.document ).toBe( document );
				expect( URI.Util.isBNodeID( fragment2.id ) ).toBe( true );
				expect( fragment2.property ).toBe( "my property 2" );

				expect( fragment1.id ).not.toEqual( fragment2.id );

				let anotherFragment = Fragment.Factory.createFrom<Object>( {}, document );
				expect( anotherFragment ).toBeTruthy();
				expect( Fragment.Factory.hasClassProperties( anotherFragment ) ).toBe( true );
				expect( anotherFragment.document ).toBe( document );
				expect( URI.Util.isBNodeID( anotherFragment.id ) ).toBe( true );
				expect( anotherFragment[ "property" ] ).toBeUndefined();
			});

		});

	});

	describe( clazz(
		"Carbon.Fragment.Util",
		"Class with useful options for Fragment objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Fragment.Util ).toBeDefined();
			expect( Utils.isFunction( Fragment.Util ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"generateID",
			"Returns an ID for a BlankNode using an universally unique identifier (UUID)."
		), ():void => {
			let id1:string;
			let id2:string;

			id1 = Fragment.Util.generateID();
			expect( URI.Util.isBNodeID( id1 ) ).toBe( true );

			id2 = Fragment.Util.generateID();
			expect( URI.Util.isBNodeID( id2 ) ).toBe( true );

			expect( id1 ).not.toEqual( id2 );
		});

	});

});
