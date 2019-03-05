import * as Module from "./index";
import { SPARQLRawResultsParser } from "./RawResultsParser";
import { SPARQLBuilder } from "./SPARQLBuilder";
import { SPARQLService } from "./SPARQLService";

describe( "SPARQL/index", () => {

	it( "should reexport SPARQLBuilder", () => {
		expect( Module.SPARQLBuilder ).toBeDefined();
		expect( Module.SPARQLBuilder ).toBe( SPARQLBuilder );
	} );

	it( "should reexport SPARQLRawResultsParser", () => {
		expect( Module.SPARQLRawResultsParser ).toBeDefined();
		expect( Module.SPARQLRawResultsParser ).toBe( SPARQLRawResultsParser );
	} );

	it( "should reexport SPARQLService", () => {
		expect( Module.SPARQLService ).toBeDefined();
		expect( Module.SPARQLService ).toBe( SPARQLService );
	} );

} );
