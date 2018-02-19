import {
	STATIC,

	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport,
	extendsClass,
} from "./../test/JasmineExtender";
import * as VolatileResource from "./../LDP/VolatileResource";
import * as NS from "../Vocabularies/index";
import * as Utils from "./../Utils";

import * as PlatformMetadata from "./PlatformMetadata";
import DefaultExport from "./PlatformMetadata";

describe( module( "Carbon/System/PlatformMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( PlatformMetadata ).toBeDefined();
		expect( Utils.isObject( PlatformMetadata ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( PlatformMetadata.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( PlatformMetadata.RDF_CLASS ) ).toBe( true );

		expect( PlatformMetadata.RDF_CLASS ).toBe( NS.C.Platform );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( PlatformMetadata.SCHEMA ).toBeDefined();
		expect( Utils.isObject( PlatformMetadata.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( PlatformMetadata.SCHEMA, "version" ) ).toBe( true );
		expect( PlatformMetadata.SCHEMA[ "version" ] ).toEqual( {
			"@id": NS.C.version,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( PlatformMetadata.SCHEMA, "buildDate" ) ).toBe( true );
		expect( PlatformMetadata.SCHEMA[ "buildDate" ] ).toEqual( {
			"@id": NS.C.buildDate,
			"@type": NS.XSD.DataType.dateTime,
		} );

	} );

	describe( interfaze(
		"Carbon.System.PlatformMetadata.Class",
		"Interface that represents a requested API description of the Carbon LDP Platform configured."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource.Class" ), ():void => {
			const instanceMetadata:PlatformMetadata.Class = <any> {};
			const volatileResource:VolatileResource.Class = instanceMetadata;

			expect( instanceMetadata ).toBeDefined();
			expect( volatileResource ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"version",
			"string",
			"The version of the Carbon LDP Platform configured."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"buildDate",
			"Date",
			"The last time the platform was built."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.System.PlatformMetadata.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PlatformMetadata.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );

