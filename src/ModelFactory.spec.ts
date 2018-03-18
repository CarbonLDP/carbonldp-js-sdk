import { ModelFactory } from "./ModelFactory";

import * as ObjectSchema from "./ObjectSchema";
import {
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OPTIONAL
} from "./test/JasmineExtender";

describe( module( "carbonldp/ModelFactory" ), ():void => {

	describe( interfaze( "CarbonLDP.ModelFactory.ModelFactory", [ "T extends object" ], "Interface with the standard methods for the models factories." ), ():void => {

		it( hasProperty( OPTIONAL, "TYPE", "string", "The type the document interface is related to." ), ():void => {
			const target:ModelFactory<any>[ "TYPE" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty( OPTIONAL, "SCHEMA", "CarbonLDP.ObjectSchema.ObjectSchema", "The schema the document interface is related to." ), ():void => {
			const target:ModelFactory<any>[ "SCHEMA" ] = {} as ObjectSchema.ObjectSchema;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OPTIONAL, "is", [ { name: "object", type: "object" } ], { type: "object is T" } ), ():void => {
			const target:ModelFactory<any>[ "is" ] = ( object ):object is any => false;
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OPTIONAL, "create", [ { name: "...params", type: "any[]" } ], { type: "T" } ), ():void => {
			const target:ModelFactory<any>[ "create" ] = () => {};
			expect( target ).toBeDefined();
		} );

		it( hasMethod( OPTIONAL, "createFrom", [ "W extends object" ], [ { name: "object", type: "W" }, { name: "...params", type: "any[]" } ], { type: "W & T" } ), ():void => {
			const target:ModelFactory<any>[ "createFrom" ] = ( object ) => object;
			expect( target ).toBeDefined();
		} );

	} );

} );
