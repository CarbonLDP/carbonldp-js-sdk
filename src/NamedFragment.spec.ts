import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as Document from "./Document";
import * as Fragment from "./Fragment";

import * as NamedFragment from "./NamedFragment";

describe( module( "Carbon/NamedFragment" ), ():void => {

	it( isDefined(), ():void => {
		expect( NamedFragment ).toBeDefined();
		expect( Utils.isObject( NamedFragment ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.NamedFragment.Factory",
		"Factory class for `Carbon.NamedFragment.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( NamedFragment.Factory ).toBeDefined();
			expect( Utils.isFunction( NamedFragment.Factory ) ).toBe( true );
		} );

		let document:Document.Class;

		beforeAll( ():void => {
			document = Document.Factory.create();
			document.id = "http://example.com/document/";
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and methods of a `Carbon.NamedFragment.Class` object.", [
				{name: "resource", type: "Carbon.Fragment.Class"},
			],
			{type: "boolean"}
		), ():void => {
			expect( NamedFragment.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( NamedFragment.Factory.hasClassProperties ) ).toBe( true );

			let resource:any = undefined;
			expect( NamedFragment.Factory.hasClassProperties( resource ) ).toBe( false );

			resource = {
				slug: null,
			};
			expect( NamedFragment.Factory.hasClassProperties( resource ) ).toBe( true );

			delete resource.slug;
			expect( NamedFragment.Factory.hasClassProperties( resource ) ).toBe( false );
			resource.slug = null;
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a NamedFragment with the slug provided", [
				{name: "slug", type: "string", description: "The slug that will identify the NamedFragment."},
				{name: "document", type: "Carbon.Document.Class", description: "The document that the NamedFragment will be part of."},
			],
			{type: "Carbon.NamedFragment.Class"}
		), ():void => {
			expect( NamedFragment.Factory.create ).toBeDefined();
			expect( Utils.isFunction( NamedFragment.Factory.create ) ).toBe( true );

			let fragment:NamedFragment.Class;

			fragment = NamedFragment.Factory.create( "fragment", document );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
			expect( fragment.document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

			fragment = NamedFragment.Factory.create( "another-fragment", document );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
			expect( fragment.document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a NamedFragment from an Object with the slug provided.", [
				{name: "object", type: "T", description: "Object that will be converted to a NamedFragment."},
				{name: "slug", type: "string", description: "The slug that will identify the NamedFragment."},
				{name: "document", type: "Carbon.Document.Class", description: "The document that the NamedFragment will be part of."},
			],
			{type: "T & Carbon.NamedFragment.Class"}
		), ():void => {
			expect( NamedFragment.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( NamedFragment.Factory.createFrom ) ).toBe( true );


			interface MyFragment {
				property:string;
			}
			let fragment:NamedFragment.Class & MyFragment;

			fragment = NamedFragment.Factory.createFrom<MyFragment>( {property: "my property 1"}, "fragment", document );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
			expect( fragment.document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
			expect( fragment.property ).toBe( "my property 1" );

			fragment = NamedFragment.Factory.createFrom<MyFragment>( {property: "my property 2"}, "another-fragment", document );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
			expect( fragment.document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
			expect( fragment.property ).toBe( "my property 2" );

			let anotherFragment:NamedFragment.Class = NamedFragment.Factory.createFrom<Object>( {}, "some-fragment", document );
			expect( anotherFragment ).toBeTruthy();
			expect( NamedFragment.Factory.hasClassProperties( anotherFragment ) ).toBe( true );
			expect( anotherFragment.document ).toBe( document );
			expect( anotherFragment.id ).toBe( "http://example.com/document/#some-fragment" );
			expect( anotherFragment[ "property" ] ).toBeUndefined();
		} );

	} );

} );
