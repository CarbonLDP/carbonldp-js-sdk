import { ContainerType } from "./ContainerType";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
import * as Module from "./index";
import { ObjectSchemaDigester } from "./ObjectSchemaDigester";
import { ObjectSchemaResolver } from "./ObjectSchemaResolver";
import { ObjectSchemaUtils } from "./ObjectSchemaUtils";
import { PointerType } from "./PointerType";

describe( "ObjectSchema/index", () => {

	it( "should reexport ContainerType", () => {
		expect( Module.ContainerType ).toBeDefined();
		expect( Module.ContainerType ).toBe( ContainerType );
	} );

	it( "should reexport DigestedObjectSchema", () => {
		expect( Module.DigestedObjectSchema ).toBeDefined();
		expect( Module.DigestedObjectSchema ).toBe( DigestedObjectSchema );
	} );

	it( "should reexport DigestedObjectSchemaProperty", () => {
		expect( Module.DigestedObjectSchemaProperty ).toBeDefined();
		expect( Module.DigestedObjectSchemaProperty ).toBe( DigestedObjectSchemaProperty );
	} );

	it( "should reexport ObjectSchemaDigester", () => {
		expect( Module.ObjectSchemaDigester ).toBeDefined();
		expect( Module.ObjectSchemaDigester ).toBe( ObjectSchemaDigester );
	} );

	it( "should reexport ObjectSchemaResolver", () => {
		expect( Module.ObjectSchemaResolver ).toBeDefined();
		expect( Module.ObjectSchemaResolver ).toBe( ObjectSchemaResolver );
	} );

	it( "should reexport ObjectSchemaUtils", () => {
		expect( Module.ObjectSchemaUtils ).toBeDefined();
		expect( Module.ObjectSchemaUtils ).toBe( ObjectSchemaUtils );
	} );

	it( "should reexport PointerType", () => {
		expect( Module.PointerType ).toBeDefined();
		expect( Module.PointerType ).toBe( PointerType );
	} );

} );
