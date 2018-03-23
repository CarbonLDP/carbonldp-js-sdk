import {
	INSTANCE,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";

import * as Module from "./";

import { DeltaCreator } from "./DeltaCreator";
import {
	AddToken,
	DeleteToken,
	LDPatchToken,
	PrefixToken,
	SliceToken,
	StatementToken,
	TripleToken,
	UpdateListToken,
} from "./Tokens";

describe( module( "carbonldp/LDPatch" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		INSTANCE,
		"DeltaCreator",
		"CarbonLDP.LDPatch.DeltaCreator"
	), ():void => {
		expect( Module.DeltaCreator ).toBeDefined();
		expect( Module.DeltaCreator ).toBe( DeltaCreator );
	} );

	it( reexports(
		STATIC,
		"PrefixToken",
		"CarbonLDP.LDPatch.PrefixToken"
	), ():void => {
		expect( PrefixToken ).toBeDefined();
		expect( Module.PrefixToken ).toBe( PrefixToken );
	} );

	it( reexports(
		STATIC,
		"UpdateListToken",
		"CarbonLDP.LDPatch.UpdateListToken"
	), ():void => {
		expect( UpdateListToken ).toBeDefined();
		expect( Module.UpdateListToken ).toBe( UpdateListToken );
	} );

	it( reexports(
		STATIC,
		"DeleteToken",
		"CarbonLDP.LDPatch.DeleteToken"
	), ():void => {
		expect( DeleteToken ).toBeDefined();
		expect( Module.DeleteToken ).toBe( DeleteToken );
	} );

	it( reexports(
		STATIC,
		"AddToken",
		"CarbonLDP.LDPatch.AddToken"
	), ():void => {
		expect( AddToken ).toBeDefined();
		expect( Module.AddToken ).toBe( AddToken );
	} );

	it( reexports(
		STATIC,
		"SliceToken",
		"CarbonLDP.LDPatch.SliceToken"
	), ():void => {
		expect( SliceToken ).toBeDefined();
		expect( Module.SliceToken ).toBe( SliceToken );
	} );

	it( reexports(
		STATIC,
		"TripleToken",
		"CarbonLDP.LDPatch.TripleToken"
	), ():void => {
		const target:Module.TripleToken = {} as TripleToken;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"LDPatchToken",
		"CarbonLDP.LDPatch.LDPatchToken"
	), ():void => {
		expect( LDPatchToken ).toBeDefined();
		expect( Module.LDPatchToken ).toBe( LDPatchToken );
	} );

	it( reexports(
		STATIC,
		"StatementToken",
		"CarbonLDP.LDPatch.StatementToken"
	), ():void => {
		const target:Module.StatementToken = {} as StatementToken;
		expect( target ).toBeDefined();
	} );


} );
