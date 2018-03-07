import { ProtectedDocument } from "./ProtectedDocument";

import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

describe( module( "carbonldp/ProtectedDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ProtectedDocument.ProtectedDocument",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document.Document" ), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.ProtectedDocument.ProtectedDocumentFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.ProtectedDocument.ProtectedDocument` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ProtectedDocument",
		"CarbonLDP.ProtectedDocument.ProtectedDocumentFactory",
		"Constant that implements the `CarbonLDP.ProtectedDocument.ProtectedDocumentFactory` interface."
	), ():void => {

		it( "should exist", ():void => {
			expect( ProtectedDocument ).toBeDefined();
			expect( ProtectedDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different errors
		it( "ProtectedDocument.TYPE", ():void => {
			expect( ProtectedDocument.TYPE ).toBeDefined();
			expect( Utils.isString( ProtectedDocument.TYPE ) ).toBe( true );

			expect( ProtectedDocument.TYPE ).toBe( CS.ProtectedDocument );
		} );

		// TODO: Separate in different errors
		it( "ProtectedDocument.SCHEMA", ():void => {
			expect( ProtectedDocument.SCHEMA ).toBeDefined();
			expect( Utils.isObject( ProtectedDocument.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( ProtectedDocument.SCHEMA, "accessControlList" ) ).toBe( true );
			expect( ProtectedDocument.SCHEMA[ "accessControlList" ] ).toEqual( {
				"@id": CS.accessControlList,
				"@type": "@id",
			} );

		} );

	} );

} );
