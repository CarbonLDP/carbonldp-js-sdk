import { EventEmitterDocumentTrait } from "./EventEmitterDocumentTrait";
import * as Module from "./index";
import { LDPDocumentTrait } from "./LDPDocumentTrait";
import { QueryableDocumentTrait } from "./QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "./SPARQLDocumentTrait";

describe( "Document/Traits/index", () => {

	it( "should reexport EventEmitterDocumentTrait", () => {
		expect( Module.EventEmitterDocumentTrait ).toBeDefined();
		expect( Module.EventEmitterDocumentTrait ).toBe( EventEmitterDocumentTrait );
	} );

	it( "should reexport LDPDocumentTrait", () => {
		expect( Module.LDPDocumentTrait ).toBeDefined();
		expect( Module.LDPDocumentTrait ).toBe( LDPDocumentTrait );
	} );

	it( "should reexport QueryableDocumentTrait", () => {
		expect( Module.QueryableDocumentTrait ).toBeDefined();
		expect( Module.QueryableDocumentTrait ).toBe( QueryableDocumentTrait );
	} );

	it( "should reexport SPARQLDocumentTrait", () => {
		expect( Module.SPARQLDocumentTrait ).toBeDefined();
		expect( Module.SPARQLDocumentTrait ).toBe( SPARQLDocumentTrait );
	} );

} );
