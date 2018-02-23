import DefaultExport, { BlankNode } from "./BlankNode";
import { Document } from "./Document";
import * as URI from "./RDF/URI";

import {
	clazz,
	hasDefaultExport,
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";

describe( module( "Carbon/BlankNode" ), ():void => {

	describe( interfaze(
		"Carbon.BlankNode.BlankNode",
		"Interface that represents the basic data of a blank node."
	), ():void => {} );

	describe( interfaze(
		"Carbon.BlankNode.BlankNodeFactory",
		"Interface with the factory, decorate and utils methods id a `Carbon.BlankNode.BlankNode` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `Carbon.BlankNode.BlankNode`.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.BlankNode.BlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `Carbon.BlankNode.BlankNode` object from the parameters specified.", [
				{ name: "document", type: "Carbon.Document.Document", description: "The `Carbon.Document.Document` object where the fragment is part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created." },
			],
			{ type: "T & Carbon.BlankNode.BlankNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `Carbon.BlankNode.BlankNode` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object to be converted into a `Carbon.BlankNode.BlankNode`." },
				{ name: "document", type: "Carbon.Document.Document", description: "The `Carbon.Document.Document` object where the fragment is part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created." },
			],
			{ type: "T & Carbon.BlankNode.BlankNode" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.BlankNode.BlankNode" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:BlankNode;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( property( STATIC, "BlankNode", "Carbon.BlankNode.BlankNodeFactory", "Constant that implements the `Carbon.BlankNode.BlankNodeFactory` interface." ), ():void => {

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
				let document:Document = Document.create();

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
				let document:Document = Document.create();

				interface MyFragment {
					property:string;
				}

				let blankNode:BlankNode & MyFragment;

				blankNode = BlankNode.createFrom<MyFragment>( { property: "my property 3" }, document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( URI.Util.isBNodeID( blankNode.id ) ).toBe( true );
				expect( blankNode.property ).toBe( "my property 3" );

				let anotherBlankNode:BlankNode = BlankNode.createFrom<{}>( {}, document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode._document ).toBe( document );
				expect( URI.Util.isBNodeID( anotherBlankNode.id ) ).toBe( true );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

		} );

	} );

} );
