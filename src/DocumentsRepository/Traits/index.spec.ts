import * as Module from "./index";
import { EventEmitterDocumentsRepositoryTrait } from "./EventEmitterDocumentsRepositoryTrait";
import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";
import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";
import { QueryableDocumentsRepositoryTrait } from "./QueryableDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./SPARQLDocumentsRepositoryTrait";

describe( "DocumentsRepository/Traits/index", () => {

	it( "should reexport EventEmitterDocumentsRepositoryTrait", () => {
		expect( Module.EventEmitterDocumentsRepositoryTrait ).toBeDefined();
		expect( Module.EventEmitterDocumentsRepositoryTrait ).toBe( EventEmitterDocumentsRepositoryTrait );
	} );

	it( "should reexport HTTPRepositoryTrait", () => {
		expect( Module.HTTPRepositoryTrait ).toBeDefined();
		expect( Module.HTTPRepositoryTrait ).toBe( HTTPRepositoryTrait );
	} );

	it( "should reexport LDPDocumentsRepositoryTrait", () => {
		expect( Module.LDPDocumentsRepositoryTrait ).toBeDefined();
		expect( Module.LDPDocumentsRepositoryTrait ).toBe( LDPDocumentsRepositoryTrait );
	} );

	it( "should reexport QueryableDocumentsRepositoryTrait", () => {
		expect( Module.QueryableDocumentsRepositoryTrait ).toBeDefined();
		expect( Module.QueryableDocumentsRepositoryTrait ).toBe( QueryableDocumentsRepositoryTrait );
	} );

	it( "should reexport SPARQLDocumentsRepositoryTrait", () => {
		expect( Module.SPARQLDocumentsRepositoryTrait ).toBeDefined();
		expect( Module.SPARQLDocumentsRepositoryTrait ).toBe( SPARQLDocumentsRepositoryTrait );
	} );

} );
