import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as BasicContainer from "./LDP/BasicContainer";
import * as Container from "./LDP/Container";
import * as DirectContainer from "./LDP/DirectContainer";
import * as IndirectContainer from "./LDP/IndirectContainer";
import * as PersistedContainer from "./LDP/PersistedContainer";
import * as RDFSource from "./LDP/RDFSource";

import * as LDP from "./LDP";

describe( module( "Carbon/LDP" ), ():void => {

	it( isDefined(), ():void => {
		expect( LDP ).toBeDefined();
		expect( Utils.isObject( LDP ) ).toBe( true );
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
		"DirectContainer",
		"Carbon/LDP/DirectContainer"
	), ():void => {
		expect( LDP.DirectContainer ).toBeDefined();
		expect( LDP.DirectContainer ).toBe( DirectContainer );
	});

	it( reexports(
		STATIC,
		"IndirectContainer",
		"Carbon/LDP/IndirectContainer"
	), ():void => {
		expect( LDP.IndirectContainer ).toBeDefined();
		expect( LDP.IndirectContainer ).toBe( IndirectContainer );
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
