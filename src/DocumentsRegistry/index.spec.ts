import { DocumentsRegistry } from "./DocumentsRegistry";
import * as Module from "./index";

describe( "DocumentsRegistry/index", () => {

	it( "should reexport DocumentsRegistry", () => {
		expect( Module.DocumentsRegistry ).toBeDefined();
		expect( Module.DocumentsRegistry ).toBe( DocumentsRegistry );
	} );

} );
