import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as LDP from "./";

import { AddMemberAction } from "./AddMemberAction";
import { CarbonError } from "./CarbonError";
import { CarbonMap } from "./CarbonMap";
import { CarbonMapEntry } from "./CarbonMapEntry";
import { DirectContainer } from "./DirectContainer";
import { DocumentMetadata } from "./DocumentMetadata";
import { ErrorResponse } from "./ErrorResponse";
import { RemoveMemberAction } from "./RemoveMemberAction";
import { ResponseMetadata } from "./ResponseMetadata";
import { ValidationError } from "./ValidationError";
import { VolatileResource } from "./VolatileResource";

describe( module( "carbonldp/LDP" ), ():void => {

	it( isDefined(), ():void => {
		expect( LDP ).toBeDefined();
		expect( Utils.isObject( LDP ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"AddMemberAction",
		"CarbonLDP.LDP.AddMemberAction"
	), ():void => {
		expect( LDP.AddMemberAction ).toBeDefined();
		expect( LDP.AddMemberAction ).toBe( AddMemberAction );
	} );

	it( reexports(
		STATIC,
		"CarbonMap",
		"CarbonLDP.LDP.CarbonMap"
	), ():void => {
		expect( LDP.CarbonMap ).toBeDefined();
		expect( LDP.CarbonMap ).toBe( CarbonMap );
	} );

	it( reexports(
		STATIC,
		"DirectContainer",
		"CarbonLDP.LDP.DirectContainer"
	), ():void => {
		expect( LDP.DirectContainer ).toBeDefined();
		expect( LDP.DirectContainer ).toBe( DirectContainer );
	} );

	it( reexports(
		STATIC,
		"CarbonMapEntry",
		"CarbonLDP.LDP.CarbonMapEntry"
	), ():void => {
		expect( LDP.CarbonMapEntry ).toBeDefined();
		expect( LDP.CarbonMapEntry ).toBe( CarbonMapEntry );
	} );

	it( reexports(
		STATIC,
		"CarbonError",
		"CarbonLDP.LDP.CarbonError"
	), ():void => {
		expect( LDP.CarbonError ).toBeDefined();
		expect( LDP.CarbonError ).toBe( CarbonError );
	} );

	it( reexports(
		STATIC,
		"RemoveMemberAction",
		"CarbonLDP.LDP.RemoveMemberAction"
	), ():void => {
		expect( LDP.RemoveMemberAction ).toBeDefined();
		expect( LDP.RemoveMemberAction ).toBe( RemoveMemberAction );
	} );

	it( reexports(
		STATIC,
		"ErrorResponse",
		"CarbonLDP.LDP.ErrorResponse"
	), ():void => {
		expect( LDP.ErrorResponse ).toBeDefined();
		expect( LDP.ErrorResponse ).toBe( ErrorResponse );
	} );

	it( reexports(
		STATIC,
		"ResponseMetadata",
		"CarbonLDP.LDP.ResponseMetadata"
	), ():void => {
		expect( LDP.ResponseMetadata ).toBeDefined();
		expect( LDP.ResponseMetadata ).toBe( ResponseMetadata );
	} );

	it( reexports(
		STATIC,
		"DocumentMetadata",
		"CarbonLDP.LDP.DocumentMetadata"
	), ():void => {
		expect( LDP.DocumentMetadata ).toBeDefined();
		expect( LDP.DocumentMetadata ).toBe( DocumentMetadata );
	} );

	it( reexports(
		STATIC,
		"ValidationError",
		"CarbonLDP.LDP.ValidationError"
	), ():void => {
		expect( LDP.ValidationError ).toBeDefined();
		expect( LDP.ValidationError ).toBe( ValidationError );
	} );

	it( reexports(
		STATIC,
		"VolatileResource",
		"CarbonLDP.LDP.VolatileResource"
	), ():void => {
		expect( LDP.VolatileResource ).toBeDefined();
		expect( LDP.VolatileResource ).toBe( VolatileResource );
	} );

} );
