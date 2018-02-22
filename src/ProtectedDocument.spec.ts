import * as ProtectedDocument from "./ProtectedDocument";
import DefaultExport from "./ProtectedDocument";
import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	isDefined,
	module,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

describe( module( "Carbon/ProtectedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( ProtectedDocument ).toBeDefined();
		expect( Utils.isObject( ProtectedDocument ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.ProtectedDocument.Class",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.Document.Document" ), ():void => {} );

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

		expect( ProtectedDocument.RDF_CLASS ).toBe( CS.ProtectedDocument );
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
			"@id": CS.accessControlList,
			"@type": "@id",
		} );

	} );

} );
