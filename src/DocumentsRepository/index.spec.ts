import { DocumentsRepository } from "./DocumentsRepository";
import * as Module from "./index";
import * as Traits from "./Traits";
import * as Utils from "./Utils";

describe( "DocumentsRepository/index", () => {

	it( "should reexport DocumentsRepository", () => {
		expect( Module.DocumentsRepository ).toBeDefined();
		expect( Module.DocumentsRepository ).toBe( DocumentsRepository );
	} );

	it( "should reexport Traits", () => {
		expect( Module.Traits ).toBeDefined();
		expect( Module.Traits ).toBe( Traits );
	} );

	it( "should reexport _getErrorResponseParserFn", () => {
		expect( Module._getErrorResponseParserFn ).toBeDefined();
		expect( Module._getErrorResponseParserFn ).toBe( Utils._getErrorResponseParserFn );
	} );

	it( "should reexport _parseResourceParams", () => {
		expect( Module._parseResourceParams ).toBeDefined();
		expect( Module._parseResourceParams ).toBe( Utils._parseResourceParams );
	} );

	it( "should reexport _parseURIParams", () => {
		expect( Module._parseURIParams ).toBeDefined();
		expect( Module._parseURIParams ).toBe( Utils._parseURIParams );
	} );

} );
