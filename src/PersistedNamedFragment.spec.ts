import { NamedFragment } from "./NamedFragment";
import { PersistedFragment } from "./PersistedFragment";

import * as PersistedNamedFragment from "./PersistedNamedFragment";
import DefaultExport from "./PersistedNamedFragment";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/PersistedNamedFragment" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedNamedFragment ).toBeDefined();
		expect( Utils.isObject( PersistedNamedFragment ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedNamedFragment.Class",
		"Interface that represents a persisted named fragment of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.PersistedFragment.PersistedFragment" ), ():void => {} );
		it( extendsClass( "Carbon.NamedFragment.NamedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"Carbon.PersistedDocument.Class",
			"A reference to the persisted document the current named fragment belongs to."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedNamedFragment.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedNamedFragment.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );


	describe( clazz( "Carbon.PersistedNamedFragment.Factory", "Factory class for `Carbon.PersistedNamedFragment.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedNamedFragment.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedNamedFragment.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedNamedFragment.Class` object.", [
				{ name: "fragment", type: "T extends Carbon.NamedFragment.NamedFragment", description: "The NamedFragment object to convert into a persisted one." },
			]
		), ():void => {
			expect( PersistedNamedFragment.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedNamedFragment.Factory.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( PersistedFragment, "decorate" );

			let fragment:NamedFragment = NamedFragment.create( <any> { id: "http://example.com/resoruce/" }, "fragment-slug" );
			let persistedFragment:PersistedNamedFragment.Class = PersistedNamedFragment.Factory.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );

	} );

} );
