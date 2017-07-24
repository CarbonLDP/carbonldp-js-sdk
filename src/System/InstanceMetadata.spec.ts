import {
	STATIC,

	OBLIGATORY,
	OPTIONAL,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport,
	extendsClass,
} from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Utils from "./../Utils";

import * as InstanceMetadata from "./InstanceMetadata";
import DefaultExport from "./InstanceMetadata";

describe( module( "Carbon/System/InstanceMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( InstanceMetadata ).toBeDefined();
		expect( InstanceMetadata ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( InstanceMetadata.RDF_CLASS ).toBeDefined();
		expect( InstanceMetadata.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( InstanceMetadata.RDF_CLASS ).toBe( NS.C.Class.Instance );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( InstanceMetadata.SCHEMA ).toBeDefined();
		expect( InstanceMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( Utils.hasProperty( InstanceMetadata.SCHEMA, "name" ) ).toBe( true );
		expect( InstanceMetadata.SCHEMA[ "name" ] ).toEqual( {
			"@id": NS.CS.Predicate.namae,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( InstanceMetadata.SCHEMA, "description" ) ).toBe( true );
		expect( InstanceMetadata.SCHEMA[ "description" ] ).toEqual( {
			"@id": NS.CS.Predicate.description,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( InstanceMetadata.SCHEMA, "allowsOrigins" ) ).toBe( true );
		expect( InstanceMetadata.SCHEMA[ "allowsOrigins" ] ).toEqual( {
			"@id": NS.CS.Predicate.allowsOrigin,
			"@container": "@set",
		} );
	} );

	describe( interfaze(
		"Carbon.System.InstanceMetadata.Class",
		"Interface that represents a Carbon LDP Platform application."
	), ():void => {

		it( extendsClass( "Carbon.PersistedProtectedDocument.Class" ), () => {
			const persistedInstanceMetadata:InstanceMetadata.Class = <any> {};
			const persistedProtectedDocument:PersistedProtectedDocument.Class = persistedInstanceMetadata;

			expect( persistedInstanceMetadata ).toBeDefined();
			expect( persistedProtectedDocument ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"The name of the current application."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"description",
			"string",
			"A brief description of the current application."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"allowsOrigin",
			"(string | Carbon.Pointer.Class)[]",
			`An array of string URIs or Pointers that refers to the origins allowed to connect to the application. An special URI that allows everyone to connect is at \`Carbon.NS.CS.Class#AllOrigins\` which translates to \`${ NS.CS.Class.AllOrigins }\`.`
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.System.InstanceMetadata.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:InstanceMetadata.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
