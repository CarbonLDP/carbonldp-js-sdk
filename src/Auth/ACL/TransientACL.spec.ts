import { TransientDocument } from "../../Document";
import { Pointer } from "../../Pointer";
import {
	extendsClass,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../../test/JasmineExtender";
import { CS } from "../../Vocabularies";
import { TransientACE } from "../ACE";

import { TransientACL } from "./TransientACL";

describe( module( "carbonldp/Auth/ACL" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.TransientACL",
		"Interface that represents an in-memory Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {
			let acl:TransientACL = <any> {};
			let fragment:TransientDocument;

			fragment = acl;
			expect( fragment ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"protectedDocument",
			"CarbonLDP.Pointer",
			"Reference to the protected document the ACL belongs."
		), ():void => {
			const target:TransientACL[ "protectedDocument" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"inherits",
			"boolean",
			"Flag that enables or disables the parents ACL inheritance.\n" +
			"If not set, it will be considered as true."
		), ():void => {
			const target:TransientACL[ "inherits" ] = true as boolean;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"directACEntries",
			"CarbonLDP.Auth.TransientACE[]",
			"Array of ACEs that applies to the target protected document."
		), ():void => {
			const target:TransientACL[ "directACEntries" ] = [] as TransientACE[];
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"immediateDescendantsACEntries",
			"CarbonLDP.Auth.TransientACE[]",
			"Array of ACEs that applies to the immediate descendants of the protected document."
		), ():void => {
			const target:TransientACL[ "immediateDescendantsACEntries" ] = [] as TransientACE[];
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"allDescendantsACEntries",
			"CarbonLDP.Auth.TransientACE[]",
			"Array of ACEs that applies to all the branch descendants of the protected document."
		), ():void => {
			const target:TransientACL[ "allDescendantsACEntries" ] = [] as TransientACE[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.TransientACLFactory",
		"Interface with factory, decorate and utils methods for `CarbonLDP.Auth.TransientACL` objects."
	), ():void => {

		describe( property(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabulary.CS.AccessControlList"
		), ():void => {

			it( "should exists", ():void => {
				expect( TransientACL.TYPE ).toBeDefined();
				expect( TransientACL.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:AccessControlList", () => {
				expect( TransientACL.TYPE ).toBe( CS.AccessControlList );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"TransientACL",
		"CarbonLDP.Auth.TransientACLFactory",
		"Constant that implements the `CarbonLDP.Auth.TransientACLFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( TransientACL ).toBeDefined();
			expect( TransientACL ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
