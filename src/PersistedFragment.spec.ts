import {module, isDefined, clazz, hasMethod, STATIC} from "./test/JasmineExtender";
import * as Fragment from "./Fragment";
import * as PersistedResource from "./PersistedResource";
import * as Utils from "./Utils";

import * as PersistedFragment from "./PersistedFragment";

describe( module( "Carbon/PersistedFragment" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedFragment ).toBeDefined();
		expect( Utils.isObject( PersistedFragment ) ).toBe( true );
	} );

	describe( clazz( "Carbon.PersistedFragment.Factory", "Factory class for `Carbon.PersistedFragment.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedFragment.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedFragment.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedFragment.Class` object.", [
				{ name: "fragment", type: "T extends Carbon.Fragment.Class", description: "The Fragment object to convert into a persisted one." },
				{ name: "snapshot", type: "Object", optional:true, description: "An shallow copy of the fragment, which will be used to track its changes." }
			]
		), ():void => {
			expect( PersistedFragment.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedFragment.Factory.decorate ) ).toBe( true );

			let spyPersistedDecorator = spyOn( PersistedResource.Factory, "decorate" );

			let fragment:Fragment.Class = Fragment.Factory.create( "_:01", null );
			let persistedFragment:PersistedFragment.Class = PersistedFragment.Factory.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment, jasmine.any( Object ) );
		} );
		
	} );

} );