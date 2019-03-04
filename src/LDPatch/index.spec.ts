import { DeltaCreator } from "./DeltaCreator";
import * as Module from "./index";
import * as Tokens from "./Tokens";

describe( "LDPatch/index", () => {

	it( "should reexport DeltaCreator", () => {
		expect( Module.DeltaCreator ).toBeDefined();
		expect( Module.DeltaCreator ).toBe( DeltaCreator );
	} );

	it( "should reexport SliceToken", () => {
		expect( Module.SliceToken ).toBeDefined();
		expect( Module.SliceToken ).toBe( Tokens.SliceToken );
	} );

	it( "should reexport AddToken", () => {
		expect( Module.AddToken ).toBeDefined();
		expect( Module.AddToken ).toBe( Tokens.AddToken );
	} );

	it( "should reexport DeleteToken", () => {
		expect( Module.DeleteToken ).toBeDefined();
		expect( Module.DeleteToken ).toBe( Tokens.DeleteToken );
	} );

	it( "should reexport LDPatchToken", () => {
		expect( Module.LDPatchToken ).toBeDefined();
		expect( Module.LDPatchToken ).toBe( Tokens.LDPatchToken );
	} );

	it( "should reexport UpdateListToken", () => {
		expect( Module.UpdateListToken ).toBeDefined();
		expect( Module.UpdateListToken ).toBe( Tokens.UpdateListToken );
	} );

	it( "should reexport PrefixToken", () => {
		expect( Module.PrefixToken ).toBeDefined();
		expect( Module.PrefixToken ).toBe( Tokens.PrefixToken );
	} );

} );
