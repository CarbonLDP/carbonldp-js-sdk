/// <reference path="../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import * as NS from "../NS";

import * as RDFSource from "./RDFSource";

describe( module( "Carbon/LDP/RDFSource" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFSource ).toBeDefined();
		expect( Utils.isObject( RDFSource ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( RDFSource.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( RDFSource.RDF_CLASS ) ).toBe( true );

		expect( RDFSource.RDF_CLASS ).toBe( NS.LDP.Class.RDFSource );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( RDFSource.SCHEMA ).toBeDefined();
		expect( Utils.isObject( RDFSource.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( RDFSource.SCHEMA, "created" ) ).toBe( true );
		expect( RDFSource.SCHEMA[ "created" ] ).toEqual({
			"@id": NS.C.Predicate.created,
			"@type": NS.XSD.DataType.dateTime
		});

		expect( Utils.hasProperty( RDFSource.SCHEMA, "modified" ) ).toBe( true );
		expect( RDFSource.SCHEMA[ "modified" ] ).toEqual({
			"@id": NS.C.Predicate.modified,
			"@type": NS.XSD.DataType.dateTime
		});
	});

	describe( clazz(
		"Carbon.LDP.RDFSource.Factory",
		"Factory class for RDFSource objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFSource.Factory ).toBeDefined();
			expect( Utils.isFunction( RDFSource.Factory ) ).toBe( true );
		});

	});

});