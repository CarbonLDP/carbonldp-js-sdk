import {
	isDefined,
	module,
	reexports,
	STATIC
} from "../test/JasmineExtender";

import * as Errors from "./";

import IDAlreadyInUseError from "./IDAlreadyInUseError";
import IllegalActionError from "./IllegalActionError";
import IllegalArgumentError from "./IllegalArgumentError";
import IllegalStateError from "./IllegalStateError";
import InvalidJSONLDSyntaxError from "./InvalidJSONLDSyntaxError";
import NotImplementedError from "./NotImplementedError";

describe( module( "Carbon/Errors" ), ():void => {

	it( isDefined(), ():void => {
		expect( Errors ).toBeDefined();
		expect( Errors ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"IDAlreadyInUseError",
		"Carbon/Errors/IDAlreadyInUseError"
	), ():void => {
		expect( Errors.IDAlreadyInUseError ).toBeDefined();
		expect( Errors.IDAlreadyInUseError ).toBe( IDAlreadyInUseError );
	} );

	it( reexports(
		STATIC,
		"IllegalActionError",
		"Carbon/Errors/IllegalActionError"
	), ():void => {
		expect( Errors.IllegalActionError ).toBeDefined();
		expect( Errors.IllegalActionError ).toBe( IllegalActionError );
	} );

	it( reexports(
		STATIC,
		"IllegalArgumentError",
		"Carbon/Errors/IllegalArgumentError"
	), ():void => {
		expect( Errors.IllegalArgumentError ).toBeDefined();
		expect( Errors.IllegalArgumentError ).toBe( IllegalArgumentError );
	} );

	it( reexports(
		STATIC,
		"IllegalStateError",
		"Carbon/Errors/IllegalStateError"
	), ():void => {
		expect( Errors.IllegalStateError ).toBeDefined();
		expect( Errors.IllegalStateError ).toBe( IllegalStateError );
	} );

	it( reexports(
		STATIC,
		"InvalidJSONLDSyntaxError",
		"Carbon/Errors/InvalidJSONLDSyntaxError"
	), ():void => {
		expect( Errors.InvalidJSONLDSyntaxError ).toBeDefined();
		expect( Errors.InvalidJSONLDSyntaxError ).toBe( InvalidJSONLDSyntaxError );
	} );

	it( reexports(
		STATIC,
		"NotImplementedError",
		"Carbon/Errors/NotImplementedError"
	), ():void => {
		expect( Errors.NotImplementedError ).toBeDefined();
		expect( Errors.NotImplementedError ).toBe( NotImplementedError );
	} );

} );
