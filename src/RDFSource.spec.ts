import {module, isDefined, hasProperty, STATIC } from "./test/JasmineExtender";

import * as NS from "./NS";
import * as Utils from "./Utils";

import * as RDFSource from "./RDFSource";

describe( module( "Carbon/RDFSource" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFSource ).toBeDefined();
		expect( Utils.isObject( RDFSource ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_Class",
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

		expect( Utils.hasProperty( RDFSource.SCHEMA, "defaultInteractionModel" ) ).toBe( true );
		expect( RDFSource.SCHEMA[ "defaultInteractionModel" ] ).toEqual({
			"@id": NS.C.Predicate.defaultInteractionModel,
			"@type": "@id",
		});

		expect( Utils.hasProperty( RDFSource.SCHEMA, "accessPoints" ) ).toBe( true );
		expect( RDFSource.SCHEMA[ "accessPoints" ] ).toEqual({
			"@id": NS.C.Predicate.accessPoint,
			"@type": "@id",
			"@container": "@set",
		});

		expect( Utils.hasProperty( RDFSource.SCHEMA, "accessControlList" ) ).toBe( true );
		expect( RDFSource.SCHEMA[ "accessControlList" ] ).toEqual({
			"@id": NS.C.Predicate.accessControlList,
			"@type": "@id",
		});

	});

});
