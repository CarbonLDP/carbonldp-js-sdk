import { BlankNode } from "./BlankNode";
import { TransientDocument } from "./TransientDocument";
import { URI } from "./RDF/URI";
import {
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";

describe( module( "carbonldp/BlankNode" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BlankNode",
		"Interface that represents the basic data of a blank node."
	), ():void => {} );

	describe( interfaze(
		"CarbonLDP.BlankNodeFactory",
		"Interface with the factory, decorate and utils methods id a `CarbonLDP.BlankNode` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.BlankNode`.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.BlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.BlankNode` object from the parameters specified.", [
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The `CarbonLDP.TransientDocument` object where the fragment is part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created." },
			],
			{ type: "T & CarbonLDP.BlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.BlankNode` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object to be converted into a `CarbonLDP.BlankNode`." },
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The `CarbonLDP.TransientDocument` object where the fragment is part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created." },
			],
			{ type: "T & CarbonLDP.BlankNode" }
		), ():void => {} );

	} );

	describe( property( STATIC, "BlankNode", "CarbonLDP.BlankNodeFactory", "Constant that implements the `CarbonLDP.BlankNodeFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( BlankNode ).toBeDefined();
			expect( BlankNode ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `BlankNode.is`

		// TODO: Test `BlankNode.create`


		describe( "BlankNode.createFrom", ():void => {

			it( isDefined(), ():void => {
				expect( BlankNode.createFrom ).toBeDefined();
				expect( BlankNode.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			// TODO: Separate in different tests
			it( "should test method with blank node label", ():void => {
				let document:TransientDocument = TransientDocument.create();

				interface MyFragment {
					property:string;
				}

				let blankNode:BlankNode & MyFragment;

				blankNode = BlankNode.createFrom<MyFragment>( { property: "my property 1" }, document, "_:BlankNode-1" );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( blankNode.id ).toBe( "_:BlankNode-1" );
				expect( blankNode.property ).toBe( "my property 1" );

				let anotherBlankNode:BlankNode = BlankNode.createFrom<{}>( {}, document, "_:BlankNode-2" );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode._document ).toBe( document );
				expect( anotherBlankNode.id ).toBe( "_:BlankNode-2" );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

			// TODO: Separate in different tests
			it( "should test method without label", ():void => {
				let document:TransientDocument = TransientDocument.create();

				interface MyFragment {
					property:string;
				}

				let blankNode:BlankNode & MyFragment;

				blankNode = BlankNode.createFrom<MyFragment>( { property: "my property 3" }, document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( URI.isBNodeID( blankNode.id ) ).toBe( true );
				expect( blankNode.property ).toBe( "my property 3" );

				let anotherBlankNode:BlankNode = BlankNode.createFrom<{}>( {}, document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode._document ).toBe( document );
				expect( URI.isBNodeID( anotherBlankNode.id ) ).toBe( true );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

		} );

	} );

} );
