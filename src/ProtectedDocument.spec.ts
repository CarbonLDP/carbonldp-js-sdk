import DefaultExport, { ProtectedDocument } from "./ProtectedDocument";

import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

describe( module( "Carbon/ProtectedDocument" ), ():void => {

	describe( interfaze(
		"Carbon.ProtectedDocument.ProtectedDocument",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.Document.Document" ), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.ProtectedDocument.ProtectedDocumentConstant",
		"Interface with the factory, decorate and utils for `Carbon.ProtectedDocument.ProtectedDocument` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ProtectedDocument",
		"Carbon.ProtectedDocument.ProtectedDocumentConstant",
		"Constant that implements the `Carbon.ProtectedDocument.ProtectedDocumentConstant` interface."
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

	it( hasDefaultExport( "Carbon.ProtectedDocument.ProtectedDocument" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:ProtectedDocument;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
