import { AbstractError } from "./AbstractError";
import { IDAlreadyInUseError } from "./IDAlreadyInUseError";
import { IllegalActionError } from "./IllegalActionError";
import { IllegalArgumentError } from "./IllegalArgumentError";
import { IllegalStateError } from "./IllegalStateError";
import * as Module from "./index";
import { InvalidJSONLDSyntaxError } from "./InvalidJSONLDSyntaxError";
import { NotImplementedError } from "./NotImplementedError";

describe( "Errors/index", () => {

	it( "should reexport AbstractError", () => {
		expect( Module.AbstractError ).toBeDefined();
		expect( Module.AbstractError ).toBe( AbstractError );
	} );

	it( "should reexport IDAlreadyInUseError", () => {
		expect( Module.IDAlreadyInUseError ).toBeDefined();
		expect( Module.IDAlreadyInUseError ).toBe( IDAlreadyInUseError );
	} );

	it( "should reexport IllegalActionError", () => {
		expect( Module.IllegalActionError ).toBeDefined();
		expect( Module.IllegalActionError ).toBe( IllegalActionError );
	} );

	it( "should reexport IllegalArgumentError", () => {
		expect( Module.IllegalArgumentError ).toBeDefined();
		expect( Module.IllegalArgumentError ).toBe( IllegalArgumentError );
	} );

	it( "should reexport IllegalStateError", () => {
		expect( Module.IllegalStateError ).toBeDefined();
		expect( Module.IllegalStateError ).toBe( IllegalStateError );
	} );

	it( "should reexport InvalidJSONLDSyntaxError", () => {
		expect( Module.InvalidJSONLDSyntaxError ).toBeDefined();
		expect( Module.InvalidJSONLDSyntaxError ).toBe( InvalidJSONLDSyntaxError );
	} );

	it( "should reexport NotImplementedError", () => {
		expect( Module.NotImplementedError ).toBeDefined();
		expect( Module.NotImplementedError ).toBe( NotImplementedError );
	} );

} );
