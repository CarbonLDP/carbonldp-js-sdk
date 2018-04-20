import {
	hasMethod,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

import { ModelFactory } from "./ModelFactory";

describe( module( "carbonldp/ModelFactory" ), ():void => {

	describe( interfaze( "CarbonLDP.ModelFactory", [ "T extends object" ], "Interface with the standard methods for the models factories." ), ():void => {

		it( hasMethod( OBLIGATORY, "is", [ { name: "object", type: "object" } ], { type: "object is T" } ), ():void => {
			const target:ModelFactory<any>[ "is" ] = ( object ):object is any => false;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OBLIGATORY, "create", [ { name: "...params", type: "any[]" } ], { type: "T" } ), ():void => {
			const target:ModelFactory<any>[ "create" ] = () => {};
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OBLIGATORY, "createFrom", [ "W extends object" ], [ { name: "object", type: "W" }, { name: "...params", type: "any[]" } ], { type: "W & T" } ), ():void => {
			const target:ModelFactory<any>[ "createFrom" ] = ( object ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
