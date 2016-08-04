import {
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasProperty,
	hasMethod,
	hasSignature,
} from "./test/JasmineExtender";
import * as Document from "./Document";
import * as NS from "./NS";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as BlankNode from "./BlankNode";

describe( module( "Carbon/LDP/BlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( BlankNode ).toBeDefined();
		expect( Utils.isObject( BlankNode ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( BlankNode.SCHEMA ).toBeDefined();
		expect( Utils.isObject( BlankNode.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( BlankNode.SCHEMA, "bNodeIdentifier" ) ).toBe( true );
		expect( BlankNode.SCHEMA[ "bNodeIdentifier" ] ).toEqual( {
			"@id": NS.C.Predicate.bNodeIdentifier,
			"@type": NS.XSD.DataType.string,
		} );
	} );

	describe( clazz( "Carbon.BlankNode.Factory", "Factory class for `Carbon.BlankNode.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( BlankNode.Factory ).toBeDefined();
			expect( Utils.isFunction( BlankNode.Factory ) ).toBe( true );
		} );

		describe( method(
			STATIC,
			"createFrom"
		), ():void => {

			it( isDefined(), ():void => {
				expect( BlankNode.Factory.createFrom ).toBeDefined();
				expect( Utils.isFunction( BlankNode.Factory.createFrom ) ).toBe( true );
			} );

			it( hasSignature(
				[ "T extends Object" ],
				"Creates a `Carbon.BlankNode.Class` object from the object and parameters specified.", [
					{name: "object", type: "T extends Object", description: "Object to be converted into a `Carbon.BlankNode.Class`."},
					{name: "id", type: "string", description: "The ID of the of the BlankNode to create. If no ID is provided, one will be created."},
					{name: "document", type: "Carbon.Document.Class", description: "The `Carbon.Document.Class` object where the fragment is part of."},
				],
				{type: "T & Carbon.BlankNode.Class"}
			), ():void => {
				let document:Document.Class = Document.Factory.create();
				interface MyFragment {
					property:string;
				}
				let blankNode:BlankNode.Class & MyFragment;

				blankNode = BlankNode.Factory.createFrom<MyFragment>( {property: "my property 1"}, "_:BlankNode-1", document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode.document ).toBe( document );
				expect( blankNode.id ).toBe( "_:BlankNode-1" );
				expect( blankNode.bNodeIdentifier ).toBeDefined();
				expect( Utils.UUID.is( blankNode.bNodeIdentifier ) ).toBe( true );
				expect( blankNode.property ).toBe( "my property 1" );

				let anotherBlankNode:BlankNode.Class = BlankNode.Factory.createFrom<{bNodeIdentifier:string}>( {bNodeIdentifier: "1345-9876-0"}, "_:BlankNode-2", document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode.document ).toBe( document );
				expect( anotherBlankNode.id ).toBe( "_:BlankNode-2" );
				expect( anotherBlankNode.bNodeIdentifier ).toBeDefined();
				expect( anotherBlankNode.bNodeIdentifier ).toBe( "1345-9876-0" );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

			it( hasSignature(
				[ "T extends Object" ],
				"Creates a `Carbon.BlankNode.Class` object from the object and parameters specified.", [
					{name: "object", type: "T extends Object", description: "Object to be converted into a `Carbon.BlankNode.Class`."},
					{name: "document", type: "Carbon.Document.Class", description: "The `Carbon.Document.Class` object where the fragment is part of."},
				],
				{type: "T & Carbon.BlankNode.Class"}
			), ():void => {
				let document:Document.Class = Document.Factory.create();
				interface MyFragment {
					property:string;
				}
				let blankNode:BlankNode.Class & MyFragment;

				blankNode = BlankNode.Factory.createFrom<MyFragment>( {property: "my property 3"}, document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode.document ).toBe( document );
				expect( RDF.URI.Util.isBNodeID( blankNode.id ) ).toBe( true );
				expect( blankNode.bNodeIdentifier ).toBeDefined();
				expect( Utils.UUID.is( blankNode.bNodeIdentifier ) ).toBe( true );
				expect( blankNode.property ).toBe( "my property 3" );

				let anotherBlankNode:BlankNode.Class = BlankNode.Factory.createFrom<{bNodeIdentifier:string}>( {bNodeIdentifier: "1345-9876-0"}, document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode.document ).toBe( document );
				expect( RDF.URI.Util.isBNodeID( anotherBlankNode.id ) ).toBe( true );
				expect( anotherBlankNode.bNodeIdentifier ).toBeDefined();
				expect( anotherBlankNode.bNodeIdentifier ).toBe( "1345-9876-0" );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the properties and methods of a Carbon.FreeResources.Class object.", [
				{name: "object", type: "T extends Object", description: "The object to be decorated."},
				{name: "bNodeIdentifier", type: "string", optional: true, description: "The identifier to be added to the decorated BlankNode."},
			],
			{type: "T & Carbon.BlankNode.Class"}
		), ():void => {
			expect( BlankNode.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( BlankNode.Factory.decorate ) ).toBe( true );

			let blankNode:BlankNode.Class;

			blankNode = BlankNode.Factory.decorate( {} );
			expect( Utils.UUID.is( blankNode.bNodeIdentifier ) ).toBe( true );

			blankNode = BlankNode.Factory.decorate( {bNodeIdentifier: "12345-9876-0"} );
			expect( Utils.UUID.is( blankNode.bNodeIdentifier ) ).toBe( true );
			expect( blankNode.bNodeIdentifier ).not.toBe( "12345-9876-0" );

			blankNode = BlankNode.Factory.decorate( {}, "12345-9876-0" );
			expect( blankNode.bNodeIdentifier ).toBe( "12345-9876-0" );
		} );

	} );

} );
