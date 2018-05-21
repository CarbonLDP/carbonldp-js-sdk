import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { CS } from "../Vocabularies";
import { TransientProtectedDocument } from "./TransientProtectedDocument";


describe( module( "carbonldp/ProtectedDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientProtectedDocument",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientProtectedDocumentFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.TransientProtectedDocument` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientProtectedDocument",
		"CarbonLDP.TransientProtectedDocumentFactory",
		"Constant that implements the `CarbonLDP.TransientProtectedDocumentFactory` interface."
	), ():void => {

		it( "should exist", ():void => {
			expect( TransientProtectedDocument ).toBeDefined();
			expect( TransientProtectedDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different errors
		it( "TransientProtectedDocument.TYPE", ():void => {
			expect( TransientProtectedDocument.TYPE ).toBeDefined();
			expect( Utils.isString( TransientProtectedDocument.TYPE ) ).toBe( true );

			expect( TransientProtectedDocument.TYPE ).toBe( CS.ProtectedDocument );
		} );

	} );

} );