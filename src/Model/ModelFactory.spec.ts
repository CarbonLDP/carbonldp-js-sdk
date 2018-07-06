import {
	extendsClass,
	hasMethod,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

import { ModelFactory } from "./ModelFactory";
import { ModelTypeGuard } from "./ModelTypeGuard";

describe( module( "carbonldp/ModelFactory" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ModelFactory",
		[ "M extends object", "B extends object = object" ],
		"Interface with the standard methods for the models factories."
	), ():void => {

		it( extendsClass( "CarbonLDP.ModelTypeGuard<M>" ), () => {
			const target:ModelTypeGuard<{}> = {} as ModelFactory<{}>;
			expect( target ).toBeDefined();
		} );


		it( hasMethod( OBLIGATORY, "create", [ "W extends object" ], [ { name: "data", type: "W & B" } ], { type: "W & M" } ), ():void => {
			const target:ModelFactory<any>[ "create" ] = () => {};
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OBLIGATORY, "createFrom", [ "W extends object" ], [ { name: "object", type: "W & B" } ], { type: "W & M" } ), ():void => {
			const target:ModelFactory<any>[ "createFrom" ] = ( object ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
