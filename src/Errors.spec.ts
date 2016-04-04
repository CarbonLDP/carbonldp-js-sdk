import {
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import IDAlreadyInUseError from "./Errors/IDAlreadyInUseError";
import IllegalActionError from "./Errors/IllegalActionError";
import IllegalArgumentError from "./Errors/IllegalArgumentError";
import IllegalStateError from "./Errors/IllegalStateError";
import NotImplementedError from "./Errors/NotImplementedError";

import * as Errors from "./Errors";

describe( module( "Carbon/Errors" ), ():void => {

	it( isDefined(), ():void => {
		expect( Errors ).toBeDefined();
		expect( Utils.isObject( Errors ) ).toBe( true );
	});

	it ( reexports(
		STATIC,
		"IDAlreadyInUseError",
		"Carbon/Errors/IDAlreadyInUseError"
	), ():void => {
		expect( Errors.IDAlreadyInUseError ).toBeDefined();
		expect( Errors.IDAlreadyInUseError ).toBe( IDAlreadyInUseError );
	});
	it ( reexports(
		STATIC,
		"IllegalActionError",
		"Carbon/Errors/IllegalActionError"
	), ():void => {
		expect( Errors.IllegalActionError ).toBeDefined();
		expect( Errors.IllegalActionError ).toBe( IllegalActionError );
	});
	it ( reexports(
		STATIC,
		"IllegalArgumentError",
		"Carbon/Errors/IllegalArgumentError"
	), ():void => {
		expect( Errors.IllegalArgumentError ).toBeDefined();
		expect( Errors.IllegalArgumentError ).toBe( IllegalArgumentError );
	});
	it ( reexports(
		STATIC,
		"IllegalStateError",
		"Carbon/Errors/IllegalStateError"
	), ():void => {
		expect( Errors.IllegalStateError ).toBeDefined();
		expect( Errors.IllegalStateError ).toBe( IllegalStateError );
	});
	it ( reexports(
		STATIC,
		"NotImplementedError",
		"Carbon/Errors/NotImplementedError"
	), ():void => {
		expect( Errors.NotImplementedError ).toBeDefined();
		expect( Errors.NotImplementedError ).toBe( NotImplementedError );
	});

});