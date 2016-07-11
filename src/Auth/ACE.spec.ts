import {module, isDefined, hasProperty, STATIC} from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as ACE from "./ACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( ACE ).toBeDefined();
		expect( Utils.isObject( ACE ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_Class",
		"string"
	), ():void => {
		expect( ACE.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ACE.RDF_CLASS ) ).toBe( true );

		expect( ACE.RDF_CLASS ).toBe( NS.CS.Class.AccessControlEntry );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ACE.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ACE.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ACE.SCHEMA, "granting" ) ).toBe( true );
		expect( ACE.SCHEMA[ "granting" ] ).toEqual( {
			"@id": NS.CS.Predicate.granting,
			"@type": NS.XSD.DataType.boolean,
		} );

		expect( Utils.hasProperty( ACE.SCHEMA, "permissions" ) ).toBe( true );
		expect( ACE.SCHEMA[ "permissions" ] ).toEqual( {
			"@id": NS.CS.Predicate.permission,
			"@type": "@id",
			"@container": "@set",
		} );

		expect( Utils.hasProperty( ACE.SCHEMA, "subject" ) ).toBe( true );
		expect( ACE.SCHEMA[ "subject" ] ).toEqual( {
			"@id": NS.CS.Predicate.subject,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( ACE.SCHEMA, "subjectClass" ) ).toBe( true );
		expect( ACE.SCHEMA[ "subjectClass" ] ).toEqual( {
			"@id": NS.CS.Predicate.subjectClass,
			"@type": "@id",
		} );
	} );

} );
