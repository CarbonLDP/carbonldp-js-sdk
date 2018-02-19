import {
	STATIC,

	module,
	interfaze,

	isDefined,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as NS from "./Vocabularies/index";
import * as Utils from "./Utils";

import * as ProtectedDocument from "./ProtectedDocument";
import DefaultExport from "./ProtectedDocument";

describe( module( "Carbon/ProtectedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( ProtectedDocument ).toBeDefined();
		expect( Utils.isObject( ProtectedDocument ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.ProtectedDocument.Class",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.ProtectedDocument.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:ProtectedDocument.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ProtectedDocument.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ProtectedDocument.RDF_CLASS ) ).toBe( true );

		expect( ProtectedDocument.RDF_CLASS ).toBe( NS.CS.Class.ProtectedDocument );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ProtectedDocument.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ProtectedDocument.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ProtectedDocument.SCHEMA, "accessControlList" ) ).toBe( true );
		expect( ProtectedDocument.SCHEMA[ "accessControlList" ] ).toEqual( {
			"@id": NS.CS.Predicate.accessControlList,
			"@type": "@id",
		} );

	} );

} );
