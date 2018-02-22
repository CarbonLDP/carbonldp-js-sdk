import {
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL
} from "./test/JasmineExtender";

import { ModelDecorator } from "./ModelDecorator";

describe( module( "Carbon/ModelDecorator" ), ():void => {

	describe( interfaze( "Carbon.ModelDecorator.ModelDecorator", [ "T extends object" ], "Interface with the standard methods of a model decorator" ), ():void => {

		it( hasProperty( OBLIGATORY, "TYPE", "string", "The type the decorator interface is for." ), ():void => {
			const target:ModelDecorator<any>[ "TYPE" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OPTIONAL, "isDecorated", [ { name: "object", type: "object" } ], { type: "object is T" } ), ():void => {
			const target:ModelDecorator<any>[ "isDecorated" ] = ( object ):object is any => false;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OBLIGATORY, "decorate", [ "W extends object" ], [ { name: "object", type: "W" }, { name: "context", type: "Carbon.Context.Context", optional: true } ], { type: "W & T" } ), ():void => {
			const target:ModelDecorator<any>[ "decorate" ] = ( object, context ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
