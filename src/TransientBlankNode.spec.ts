import { TransientBlankNode } from "./TransientBlankNode";
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

describe( module( "carbonldp/TransientBlankNode" ), ():void => {

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
			"Creates a `CarbonLDP.TransientBlankNode` object from the parameters specified.", [
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The `CarbonLDP.TransientDocument` object where the fragment is part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created." },
			],
			{ type: "T & CarbonLDP.TransientBlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.TransientBlankNode` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object to be converted into a `CarbonLDP.TransientBlankNode`." },
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The `CarbonLDP.TransientDocument` object where the fragment is part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created." },
			],
			{ type: "T & CarbonLDP.TransientBlankNode" }
		), ():void => {} );

	} );

	describe( property( STATIC, "TransientBlankNode", "CarbonLDP.TransientBlankNodeFactory", "Constant that implements the `CarbonLDP.TransientBlankNodeFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( TransientBlankNode ).toBeDefined();
			expect( TransientBlankNode ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `BlankNode.is`

		// TODO: Test `BlankNode.create`


		describe( "TransientBlankNode.createFrom", ():void => {

			it( isDefined(), ():void => {
				expect( TransientBlankNode.createFrom ).toBeDefined();
				expect( TransientBlankNode.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			// TODO: Separate in different tests
			it( "should test method with blank node label", ():void => {
				let document:TransientDocument = TransientDocument.create();

				interface MyFragment {
					property:string;
				}

				let blankNode:TransientBlankNode & MyFragment;

				blankNode = TransientBlankNode.createFrom<MyFragment>( { property: "my property 1" }, document, "_:BlankNode-1" );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( blankNode.id ).toBe( "_:BlankNode-1" );
				expect( blankNode.property ).toBe( "my property 1" );

				let anotherBlankNode:TransientBlankNode = TransientBlankNode.createFrom<{}>( {}, document, "_:BlankNode-2" );
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

				let blankNode:TransientBlankNode & MyFragment;

				blankNode = TransientBlankNode.createFrom<MyFragment>( { property: "my property 3" }, document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( URI.isBNodeID( blankNode.id ) ).toBe( true );
				expect( blankNode.property ).toBe( "my property 3" );

				let anotherBlankNode:TransientBlankNode = TransientBlankNode.createFrom<{}>( {}, document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode._document ).toBe( document );
				expect( URI.isBNodeID( anotherBlankNode.id ) ).toBe( true );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

		} );

	} );

} );
