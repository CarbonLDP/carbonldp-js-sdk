import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as AddMemberAction from "./LDP/AddMemberAction";
import * as DirectContainer from "./LDP/DirectContainer";
import * as Error from "./LDP/Error";
import * as IndirectContainer from "./LDP/IndirectContainer";
import * as RemoveMemberAction from "./LDP/RemoveMemberAction";
import * as ErrorResponse from "./LDP/ErrorResponse";
import * as ResponseMetadata from "./LDP/ResponseMetadata";
import * as ResourceMetadata from "./LDP/ResourceMetadata";

import * as LDP from "./LDP";

describe( module( "Carbon/LDP" ), ():void => {

	it( isDefined(), ():void => {
		expect( LDP ).toBeDefined();
		expect( Utils.isObject( LDP ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"AddMemberAction",
		"Carbon/LDP/AddMemberAction"
	), ():void => {
		expect( LDP.AddMemberAction ).toBeDefined();
		expect( LDP.AddMemberAction ).toBe( AddMemberAction );
	} );

	it( reexports(
		STATIC,
		"DirectContainer",
		"Carbon/LDP/DirectContainer"
	), ():void => {
		expect( LDP.DirectContainer ).toBeDefined();
		expect( LDP.DirectContainer ).toBe( DirectContainer );
	} );

	it( reexports(
		STATIC,
		"Error",
		"Carbon/LDP/Error"
	), ():void => {
		expect( LDP.Error ).toBeDefined();
		expect( LDP.Error ).toBe( Error );
	} );

	it( reexports(
		STATIC,
		"IndirectContainer",
		"Carbon/LDP/IndirectContainer"
	), ():void => {
		expect( LDP.IndirectContainer ).toBeDefined();
		expect( LDP.IndirectContainer ).toBe( IndirectContainer );
	} );

	it( reexports(
		STATIC,
		"RemoveMemberAction",
		"Carbon/LDP/RemoveMemberAction"
	), ():void => {
		expect( LDP.RemoveMemberAction ).toBeDefined();
		expect( LDP.RemoveMemberAction ).toBe( RemoveMemberAction );
	} );

	it( reexports(
		STATIC,
		"ErrorResponse",
		"Carbon/LDP/ErrorResponse"
	), ():void => {
		expect( LDP.ErrorResponse ).toBeDefined();
		expect( LDP.ErrorResponse ).toBe( ErrorResponse );
	} );

	it( reexports(
		STATIC,
		"ResponseMetadata",
		"Carbon/LDP/ResponseMetadata"
	), ():void => {
		expect( LDP.ResponseMetadata ).toBeDefined();
		expect( LDP.ResponseMetadata ).toBe( ResponseMetadata );
	} );

	it( reexports(
		STATIC,
		"ResourceMetadata",
		"Carbon/LDP/ResourceMetadata"
	), ():void => {
		expect( LDP.ResourceMetadata ).toBeDefined();
		expect( LDP.ResourceMetadata ).toBe( ResourceMetadata );
	} );

} );
