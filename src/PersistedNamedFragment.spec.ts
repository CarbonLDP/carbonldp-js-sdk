import {module, isDefined, clazz, hasMethod, STATIC} from "./test/JasmineExtender";
import * as NamedFragment from "./NamedFragment";
import * as PersistedFragment from "./PersistedFragment";
import * as Utils from "./Utils";

import * as PersistedNamedFragment from "./PersistedNamedFragment";

describe( module( "Carbon/PersistedNamedFragment" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedNamedFragment ).toBeDefined();
		expect( Utils.isObject( PersistedNamedFragment ) ).toBe( true );
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
				{ name: "fragment", type: "T extends Carbon.NamedFragment.Class", description: "The NamedFragment object to convert into a persisted one." },
				{ name: "snapshot", type: "Object", optional:true, description: "An shallow copy of the fragment, which will be used to track its changes." }
			]
		), ():void => {
			expect( PersistedNamedFragment.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedNamedFragment.Factory.decorate ) ).toBe( true );

			let spyPersistedDecorator = spyOn( PersistedFragment.Factory, "decorate" );

			let fragment:NamedFragment.Class = NamedFragment.Factory.create( "fragment-slug", <any> { id: "http://example.com/resoruce/" } );
			let persistedFragment:PersistedNamedFragment.Class = PersistedNamedFragment.Factory.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment, jasmine.any( Object ) );
		} );

	} );

} );