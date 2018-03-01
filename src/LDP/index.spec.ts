import {
	STATIC,

	module,

	isDefined,
	reexports,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as AddMemberAction from "./AddMemberAction";
import * as CarbonMap from "./CarbonMap";
import * as DirectContainer from "./DirectContainer";
import * as CarbonMapEntry from "./CarbonMapEntry";
import * as Error from "./Error";
import * as RemoveMemberAction from "./RemoveMemberAction";
import * as ErrorResponse from "./ErrorResponse";
import * as ResponseMetadata from "./ResponseMetadata";
import * as DocumentMetadata from "./DocumentMetadata";
import * as ValidationError from "./ValidationError";

import * as LDP from "./index";

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
		"CarbonMap",
		"Carbon/LDP/CarbonMap"
	), ():void => {
		expect( LDP.CarbonMap ).toBeDefined();
		expect( LDP.CarbonMap ).toBe( CarbonMap );
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
		"CarbonMapEntry",
		"Carbon/LDP/CarbonMapEntry"
	), ():void => {
		expect( LDP.CarbonMapEntry ).toBeDefined();
		expect( LDP.CarbonMapEntry ).toBe( CarbonMapEntry );
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
		"DocumentMetadata",
		"Carbon/LDP/DocumentMetadata"
	), ():void => {
		expect( LDP.DocumentMetadata ).toBeDefined();
		expect( LDP.DocumentMetadata ).toBe( DocumentMetadata );
	} );

	it( reexports(
		STATIC,
		"ValidationError",
		"Carbon/LDP/ValidationError"
	), ():void => {
		expect( LDP.ValidationError ).toBeDefined();
		expect( LDP.ValidationError ).toBe( ValidationError );
	} );

} );
