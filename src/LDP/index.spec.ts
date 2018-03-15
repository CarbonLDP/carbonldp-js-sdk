import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as LDP from "./";

import {
	AddMemberAction,
	AddMemberActionFactory,
} from "./AddMemberAction";
import {
	CarbonError,
	CarbonErrorFactory,
} from "./CarbonError";
import {
	CarbonMap,
	CarbonMapFactory,
} from "./CarbonMap";
import {
	CarbonMapEntry,
	CarbonMapEntryFactory,
} from "./CarbonMapEntry";
import {
	DirectContainer,
	DirectContainerFactory,
} from "./DirectContainer";
import {
	DocumentMetadata,
	DocumentMetadataFactory,
} from "./DocumentMetadata";
import {
	ErrorResponse,
	ErrorResponseFactory,
} from "./ErrorResponse";
import {
	RemoveMemberAction,
	RemoveMemberActionFactory,
} from "./RemoveMemberAction";
import {
	ResponseMetadata,
	ResponseMetadataFactory,
} from "./ResponseMetadata";
import {
	ValidationError,
	ValidationErrorFactory,
} from "./ValidationError";
import {
	VolatileResource,
	VolatileResourceFactory,
} from "./VolatileResource";

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
		"AddMemberActionFactory",
		"CarbonLDP.LDP.AddMemberActionFactory"
	), ():void => {
		const target:LDP.AddMemberActionFactory = {} as AddMemberActionFactory;
		expect( target ).toBeDefined();
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
		"CarbonMapFactory",
		"CarbonLDP.LDP.CarbonMapFactory"
	), ():void => {
		const target:LDP.CarbonMapFactory = {} as CarbonMapFactory;
		expect( target ).toBeDefined();
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
		"DirectContainerFactory",
		"CarbonLDP.LDP.DirectContainerFactory"
	), ():void => {
		const target:LDP.DirectContainerFactory = {} as DirectContainerFactory;
		expect( target ).toBeDefined();
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
		"CarbonMapEntryFactory",
		"CarbonLDP.LDP.CarbonMapEntryFactory"
	), ():void => {
		const target:LDP.CarbonMapEntryFactory = {} as CarbonMapEntryFactory;
		expect( target ).toBeDefined();
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
		"CarbonErrorFactory",
		"CarbonLDP.LDP.CarbonErrorFactory"
	), ():void => {
		const target:LDP.CarbonErrorFactory = {} as CarbonErrorFactory;
		expect( target ).toBeDefined();
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
		"RemoveMemberActionFactory",
		"CarbonLDP.LDP.RemoveMemberActionFactory"
	), ():void => {
		const target:LDP.RemoveMemberActionFactory = {} as RemoveMemberActionFactory;
		expect( target ).toBeDefined();
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
		"ErrorResponseFactory",
		"CarbonLDP.LDP.ErrorResponseFactory"
	), ():void => {
		const target:LDP.ErrorResponseFactory = {} as ErrorResponseFactory;
		expect( target ).toBeDefined();
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
		"ResponseMetadataFactory",
		"CarbonLDP.LDP.ResponseMetadataFactory"
	), ():void => {
		const target:LDP.ResponseMetadataFactory = {} as ResponseMetadataFactory;
		expect( target ).toBeDefined();
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
		"DocumentMetadataFactory",
		"CarbonLDP.LDP.DocumentMetadataFactory"
	), ():void => {
		const target:LDP.DocumentMetadataFactory = {} as DocumentMetadataFactory;
		expect( target ).toBeDefined();
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
		"ValidationErrorFactory",
		"CarbonLDP.LDP.ValidationErrorFactory"
	), ():void => {
		const target:LDP.ValidationErrorFactory = {} as ValidationErrorFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"VolatileResource",
		"CarbonLDP.LDP.VolatileResource"
	), ():void => {
		expect( LDP.VolatileResource ).toBeDefined();
		expect( LDP.VolatileResource ).toBe( VolatileResource );
	} );

	it( reexports(
		STATIC,
		"VolatileResourceFactory",
		"CarbonLDP.LDP.VolatileResourceFactory"
	), ():void => {
		const target:LDP.VolatileResourceFactory = {} as VolatileResourceFactory;
		expect( target ).toBeDefined();
	} );

} );
