import {
	isDefined,
	module,
	reexports,
	STATIC
} from "../test/JasmineExtender";

import * as Errors from "./";

import AbstractError from "./AbstractError";
import IDAlreadyInUseError from "./IDAlreadyInUseError";
import IllegalActionError from "./IllegalActionError";
import IllegalArgumentError from "./IllegalArgumentError";
import IllegalStateError from "./IllegalStateError";
import InvalidJSONLDSyntaxError from "./InvalidJSONLDSyntaxError";
import NotImplementedError from "./NotImplementedError";

describe( module( "carbonldp/Errors" ), ():void => {

	it( isDefined(), ():void => {
		expect( Errors ).toBeDefined();
		expect( Errors ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"AbstractError",
		"CarbonLDP.Errors.AbstractError.AbstractError"
	), ():void => {
		expect( Errors.AbstractError ).toBeDefined();
		expect( Errors.AbstractError ).toBe( AbstractError );
	} );

	it( reexports(
		STATIC,
		"IDAlreadyInUseError",
		"CarbonLDP.Errors.IDAlreadyInUseError.IDAlreadyInUseError"
	), ():void => {
		expect( Errors.IDAlreadyInUseError ).toBeDefined();
		expect( Errors.IDAlreadyInUseError ).toBe( IDAlreadyInUseError );
	} );

	it( reexports(
		STATIC,
		"IllegalActionError",
		"CarbonLDP.Errors.IllegalActionError.IllegalActionError"
	), ():void => {
		expect( Errors.IllegalActionError ).toBeDefined();
		expect( Errors.IllegalActionError ).toBe( IllegalActionError );
	} );

	it( reexports(
		STATIC,
		"IllegalArgumentError",
		"CarbonLDP.Errors.IllegalArgumentError.IllegalArgumentError"
	), ():void => {
		expect( Errors.IllegalArgumentError ).toBeDefined();
		expect( Errors.IllegalArgumentError ).toBe( IllegalArgumentError );
	} );

	it( reexports(
		STATIC,
		"IllegalStateError",
		"CarbonLDP.Errors.IllegalStateError.IllegalStateError"
	), ():void => {
		expect( Errors.IllegalStateError ).toBeDefined();
		expect( Errors.IllegalStateError ).toBe( IllegalStateError );
	} );

	it( reexports(
		STATIC,
		"InvalidJSONLDSyntaxError",
		"CarbonLDP.Errors.InvalidJSONLDSyntaxError.InvalidJSONLDSyntaxError"
	), ():void => {
		expect( Errors.InvalidJSONLDSyntaxError ).toBeDefined();
		expect( Errors.InvalidJSONLDSyntaxError ).toBe( InvalidJSONLDSyntaxError );
	} );

	it( reexports(
		STATIC,
		"NotImplementedError",
		"CarbonLDP.Errors.NotImplementedError.NotImplementedError"
	), ():void => {
		expect( Errors.NotImplementedError ).toBeDefined();
		expect( Errors.NotImplementedError ).toBe( NotImplementedError );
	} );

} );
