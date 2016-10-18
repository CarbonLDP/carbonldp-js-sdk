import {
	STATIC,

	module,

	isDefined,
	reexports,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as Agents from "./Platform/Agents";
import * as Auth from "./Platform/Auth";
import * as PersistedAgent from "./Platform/PersistedAgent";

import * as Platform from "./Platform";

describe( module( "Carbon/Platform" ), ():void => {

	it( isDefined(), ():void => {
		expect( Platform ).toBeDefined();
		expect( Utils.isObject( Platform ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Agents",
		"Carbon/Platform/Agents"
	), ():void => {
		expect( Platform.Agents ).toBeDefined();
		expect( Platform.Agents ).toBe( Agents );
	} );

	it( reexports(
		STATIC,
		"Auth",
		"Carbon/Platform/Auth"
	), ():void => {
		expect( Platform.Auth ).toBeDefined();
		expect( Platform.Auth ).toBe( Auth );
	} );

	it( reexports(
		STATIC,
		"PersistedAgent",
		"Carbon/Platform/PersistedAgent"
	), ():void => {
		expect( Platform.PersistedAgent ).toBeDefined();
		expect( Platform.PersistedAgent ).toBe( PersistedAgent );
	} );

} );