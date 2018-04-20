import {
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

import { ModelDecorator } from "./ModelDecorator";

describe( module( "carbonldp/ModelDecorator" ), ():void => {

	describe( interfaze( "CarbonLDP.ModelDecorator", [ "T extends object" ], "Interface with the standard methods of a model decorator" ), ():void => {

		it( hasProperty( OBLIGATORY, "TYPE", "string", "The type the decorator interface is for." ), ():void => {
			const target:ModelDecorator<{}>[ "TYPE" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OBLIGATORY, "isDecorated", [ { name: "object", type: "object" } ], { type: "object is T" } ), ():void => {
			const target:ModelDecorator<any>[ "isDecorated" ] = ( object ):object is any => false;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OBLIGATORY, "decorate", [ "W extends object" ], [ { name: "object", type: "W" }, { name: "documents", type: "CarbonLDP.Documents", optional: true } ], { type: "W & T" } ), ():void => {
			const target:ModelDecorator<any>[ "decorate" ] = ( object, context ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
