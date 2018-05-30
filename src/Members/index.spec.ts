import {
	module,
	reexports,
	STATIC
} from "../test/JasmineExtender";
import * as Members from "./";
import { MembersDocument } from "./";
import { AddMemberAction } from "./AddMemberAction";
import { RemoveMemberAction } from "./RemoveMemberAction";

describe( module( "carbonldp/Members" ), () => {

	it( "should exists", ():void => {
		expect( Members ).toBeDefined();
		expect( Members ).toEqual( jasmine.any( Object ) );
	} );


	it( reexports(
		STATIC,
		"AddMemberAction",
		"CarbonLDP.Members.AddMemberAction"
	), ():void => {
		expect( Members.AddMemberAction ).toBeDefined();
		expect( Members.AddMemberAction ).toBe( AddMemberAction );
	} );


	it( reexports(
		STATIC,
		"MembersDocument",
		"CarbonLDP.Members.MembersDocument"
	), ():void => {
		expect( Members.MembersDocument ).toBeDefined();
		expect( Members.MembersDocument ).toBe( MembersDocument );
	} );


	it( reexports(
		STATIC,
		"RemoveMemberAction",
		"CarbonLDP.Members.RemoveMemberAction"
	), ():void => {
		expect( Members.RemoveMemberAction ).toBeDefined();
		expect( Members.RemoveMemberAction ).toBe( RemoveMemberAction );
	} );

} );
