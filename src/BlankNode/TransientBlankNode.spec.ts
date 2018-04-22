import { IllegalArgumentError } from "../Errors";
import { URI } from "../RDF";
import {
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { TransientDocument } from "../TransientDocument";
import { BaseBlankNode } from "./BaseBlankNode";
import { TransientBlankNode } from "./TransientBlankNode";


describe( module( "carbonldp/BlankNode" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientBlankNode",
		"Interface that represents the basic data of a blank node."
	), ():void => {} );

	describe( interfaze(
		"CarbonLDP.TransientBlankNodeFactory",
		"Interface with the factory, decorate and utils methods id a `CarbonLDP.TransientBlankNode` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.TransientBlankNode`.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientBlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends CarbonLDP.BaseBlankNode" ],
			"Creates a `CarbonLDP.TransientBlankNode` object from the parameters specified.", [
				{ name: "data", type: "T", description: "Data to be used in the creation of the blank node." },
			],
			{ type: "T & CarbonLDP.TransientBlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends CarbonLDP.BaseBlankNode" ],
			"Creates a `CarbonLDP.TransientBlankNode` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object to be converted into a blank node." },
			],
			{ type: "T & CarbonLDP.TransientBlankNode" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientBlankNode",
		"CarbonLDP.TransientBlankNodeFactory",
		"Constant that implements the `CarbonLDP.TransientBlankNodeFactory` interface."
	), ():void => {

		it( "should exists", ():void => {
			expect( TransientBlankNode ).toBeDefined();
			expect( TransientBlankNode ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `BlankNode.is`

		let document:TransientDocument;
		beforeEach( ():void => {
			document = TransientDocument.create();
		} );

		// TODO: Test `BlankNode.create`

		describe( "TransientBlankNode.createFrom", ():void => {

			it( isDefined(), ():void => {
				expect( TransientBlankNode.createFrom ).toBeDefined();
				expect( TransientBlankNode.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should maintain the _document reference", ():void => {
				const bNode:TransientBlankNode = TransientBlankNode.create( {
					_document: document,
				} );

				expect( bNode._document ).toBe( document );
			} );

			it( "should throw error if id not a blank node label", ():void => {
				const object:BaseBlankNode = {
					_document: document,
					id: "not a blank-node label",
				};
				expect( () => TransientBlankNode.create( object ) ).toThrowError( IllegalArgumentError, `The id "not a blank-node label" is not a blank node label.` );
			} );

			it( "should maintain the blank node label id", ():void => {
				const bNode:TransientBlankNode = TransientBlankNode.create( {
					_document: document,
					id: "_:blank-node-label",
				} );

				expect( bNode.id ).toBe( "_:blank-node-label" );
			} );

			it( "should create a blank node label id not provided", ():void => {
				const bNode:TransientBlankNode = TransientBlankNode.create( { _document: document } );
				expect( URI.isBNodeID( bNode.id ) ).toBe( true );
			} );

		} );

	} );

} );
