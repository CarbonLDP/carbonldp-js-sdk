import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	method,
	interfaze,

	isDefined,
	hasProperty,
	hasMethod,
	hasSignature,
	hasDefaultExport,
} from "./test/JasmineExtender";
import { Document } from "./Document";
import * as NS from "./Vocabularies/index";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

import * as BlankNode from "./BlankNode";
import DefaultExport from "./BlankNode";

describe( module( "Carbon/BlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( BlankNode ).toBeDefined();
		expect( Utils.isObject( BlankNode ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.BlankNode.Class",
		"Interface that represents the basic data of a blank node."
	), ():void => {

	} );

	it( hasDefaultExport( "Carbon.BlankNode.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:BlankNode.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
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
					{name: "document", type: "Carbon.Document.Document", description: "The `Carbon.Document.Document` object where the fragment is part of."},
				],
				{type: "T & Carbon.BlankNode.Class"}
			), ():void => {
				let document:Document = Document.create();
				interface MyFragment {
					property:string;
				}
				let blankNode:BlankNode.Class & MyFragment;

				blankNode = BlankNode.Factory.createFrom<MyFragment>( {property: "my property 1"}, "_:BlankNode-1", document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( blankNode.id ).toBe( "_:BlankNode-1" );
				expect( blankNode.property ).toBe( "my property 1" );

				let anotherBlankNode:BlankNode.Class = BlankNode.Factory.createFrom<{}>( {}, "_:BlankNode-2", document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode._document ).toBe( document );
				expect( anotherBlankNode.id ).toBe( "_:BlankNode-2" );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

			it( hasSignature(
				[ "T extends Object" ],
				"Creates a `Carbon.BlankNode.Class` object from the object and parameters specified.", [
					{name: "object", type: "T extends Object", description: "Object to be converted into a `Carbon.BlankNode.Class`."},
					{name: "document", type: "Carbon.Document.Document", description: "The `Carbon.Document.Document` object where the fragment is part of."},
				],
				{type: "T & Carbon.BlankNode.Class"}
			), ():void => {
				let document:Document = Document.create();
				interface MyFragment {
					property:string;
				}
				let blankNode:BlankNode.Class & MyFragment;

				blankNode = BlankNode.Factory.createFrom<MyFragment>( {property: "my property 3"}, document );
				expect( blankNode ).toBeTruthy();
				expect( blankNode._document ).toBe( document );
				expect( RDF.URI.Util.isBNodeID( blankNode.id ) ).toBe( true );
				expect( blankNode.property ).toBe( "my property 3" );

				let anotherBlankNode:BlankNode.Class = BlankNode.Factory.createFrom<{}>( {}, document );
				expect( anotherBlankNode ).toBeTruthy();
				expect( anotherBlankNode._document ).toBe( document );
				expect( RDF.URI.Util.isBNodeID( anotherBlankNode.id ) ).toBe( true );
				expect( anotherBlankNode[ "property" ] ).toBeUndefined();
			} );

		} );

	} );

} );
