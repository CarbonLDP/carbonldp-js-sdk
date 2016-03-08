/// <reference path="./../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as AccessPoint from "./LDP/AccessPoint";
import * as BasicContainer from "./LDP/BasicContainer";
import * as Container from "./LDP/Container";
import * as PersistedContainer from "./LDP/PersistedContainer";
import * as RDFSource from "./LDP/RDFSource";

import * as LDP from "./LDP";

describe( module( "LDP" ), ():void => {

	it( isDefined(), ():void => {
		expect( LDP ).toBeDefined();
		expect( Utils.isObject( LDP ) ).toBe( true );
	});

	it( reexports(
		STATIC,
		"AccessPoint",
		"Carbon/LDP/AccessPoint"
	), ():void => {
		expect( LDP.AccessPoint ).toBeDefined();
		expect( LDP.AccessPoint ).toBe( AccessPoint );
	});

	it( reexports(
		STATIC,
		"BasicContainer",
		"Carbon/LDP/BasicContainer"
	), ():void => {
		expect( LDP.BasicContainer ).toBeDefined();
		expect( LDP.BasicContainer ).toBe( BasicContainer );
	});

	it( reexports(
		STATIC,
		"Container",
		"Carbon/LDP/Container"
	), ():void => {
		expect( LDP.Container ).toBeDefined();
		expect( LDP.Container ).toBe( Container );
	});

	it( reexports(
		STATIC,
		"PersistedContainer",
		"Carbon/LDP/PersistedContainer"
	), ():void => {
		expect( LDP.PersistedContainer ).toBeDefined();
		expect( LDP.PersistedContainer ).toBe( PersistedContainer );
	});

	it( reexports(
		STATIC,
		"RDFSource",
		"Carbon/LDP/RDFSource"
	), ():void => {
		expect( LDP.RDFSource ).toBeDefined();
		expect( LDP.RDFSource ).toBe( RDFSource );
	});

});
