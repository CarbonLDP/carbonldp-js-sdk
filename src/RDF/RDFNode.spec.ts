import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as RDFNode from "./RDFNode";

describe( module( "Carbon/RDF/RDFNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFNode ).toBeDefined();
		expect( Utils.isObject( RDFNode ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.RDF.RDFNode.Factory",
		"Factory class for `Carbon.RDF.RDFNode.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFNode.Factory ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.RDF.RDFNode.Class` object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFNode.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Factory.is ) ).toBe( true );

			expect( RDFNode.Factory.is( {"@id": "http://example.com/resource/"} ) ).toBe( true );
			expect( RDFNode.Factory.is( {"@id": "http://example.com/resource/", "@type": "@id"} ) ).toBe( true );
			expect( RDFNode.Factory.is( {"@id": "http://example.com/resource/", "something": "else"} ) ).toBe( true );

			expect( RDFNode.Factory.is( {"@id": [ "something", "else" ]} ) ).toBe( false );
			expect( RDFNode.Factory.is( {"id": "http://example.com/resource/"} ) ).toBe( false );
			expect( RDFNode.Factory.is( {"@type": "http://example.com/types/my-type/"} ) ).toBe( false );
			expect( RDFNode.Factory.is( {} ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.RDF.RDFNode.Class` object with the URI provided.", [
				{name: "uri", type: "string"},
			],
			{type: "Carbon.RDF.RDFNode.Class"}
		), ():void => {
			expect( RDFNode.Factory.create ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Factory.create ) ).toBe( true );

			expect( RDFNode.Factory.create( "http://example.com/resource/" ) ).toEqual( {"@id": "http://example.com/resource/"} );
			//Does not verify if it is an URI
			expect( RDFNode.Factory.create( "some thing that is not an URI, but works" ) ).toEqual( {"@id": "some thing that is not an URI, but works"} );
		} );

	} );

	describe( clazz(
		"Carbon.RDF.RDFNode.Util",
		"Class with useful functions to manage `Carbon.RDF.RDFNode.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFNode.Util ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"areEqual",
			"Returns true if the objects represent the same resource.", [
				{name: "node1", type: "Carbon.RDF.RDFDocument.Class"},
				{name: "node2", type: "Carbon.RDF.RDFDocument.Class"},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFNode.Util.areEqual ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.areEqual ) ).toBe( true );

			let node1:RDFNode.Class = {"@id": "http://example.com/resouce/1-one/"};
			let node1Copy:RDFNode.Class = {"@id": "http://example.com/resouce/1-one/"};
			let node2:RDFNode.Class = {"@id": "http://example.com/resouce/2-two/"};
			expect( RDFNode.Util.areEqual( node1, node1 ) ).toBe( true );
			expect( RDFNode.Util.areEqual( node1, node1Copy ) ).toBe( true );
			expect( RDFNode.Util.areEqual( node1Copy, node1 ) ).toBe( true );

			expect( RDFNode.Util.areEqual( node1, node2 ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"hasType",
			"Returns true if the RDFNode provided has the specified type.", [
				{name: "object", type: "Object", description: "The RDFNode to evaluate."},
				{name: "type", type: "string", description: "The type to look for it existence."},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFNode.Util.hasType ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.hasType ) ).toBe( true );

			let node:any;
			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/" ]
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ]
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( true );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-3/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": []
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( false );

			node = {
				"@id": "http://example.com/resouce/",
			};
			expect( RDFNode.Util.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
			expect( RDFNode.Util.hasType( node, "http://example.com/type-2/" ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"getTypes",
			"Returns an array with the types of the RDFNode provided.", [
				{name: "object", type: "Object", description: "The RDFNode to evaluate."},
			],
			{type: "string[]"}
		), ():void => {
			expect( RDFNode.Util.hasType ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.hasType ) ).toBe( true );

			let node:any;
			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/" ]
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [ "http://example.com/type-1/" ] );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ]
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [ "http://example.com/type-1/", "http://example.com/type-2/" ] );

			node = {
				"@id": "http://example.com/resouce/",
				"@type": []
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [] );

			node = {
				"@id": "http://example.com/resouce/",
			};
			expect( RDFNode.Util.getTypes( node ) ).toEqual( [] );
		} );

		it( hasMethod(
			STATIC,
			"getPropertyURI",
			"Returns the URI from a property resource in the RDFNode object.\n" +
			"Returns `null` if the property doesn't exists or the URI is not found.", [
				{name: "node", type: "Carbon.RDF.RDFNode.Class"},
				{name: "predicate", type: "string"},
			],
			{type: "string"}
		), ():void => {
			expect( RDFNode.Util.getPropertyURI ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getPropertyURI ) ).toBe( true );

			let document:Object = {
				"@id": "http://example.com/resource-id/",
				"http://example.com/property-1/": [ {
					"@id": "http://example.com/property-id/"
				} ],
				"http://example.com/member/": [ {
					"@id": "http://example.com/member-id-1/"
				}, {
					"@id": "http://example.com/member-id-2/"
				}, {
					"@id": "http://example.com/member-id-3/"
				} ]
			};
			let node:RDFNode.Class = <RDFNode.Class>document;
			let id:string;

			id = RDFNode.Util.getPropertyURI( node, "http://example.com/property-1/" );
			expect( id ).toBeDefined();
			expect( Utils.isString( id ) ).toBe( true );
			expect( id ).toBe( "http://example.com/property-id/" );

			id = RDFNode.Util.getPropertyURI( node, "http://example.com/member/" );
			expect( id ).toBeDefined();
			expect( Utils.isString( id ) ).toBe( true );
			expect( id ).toBe( "http://example.com/member-id-1/" );

			id = RDFNode.Util.getPropertyURI( node, "http://example.com/contains/" );
			expect( id ).toBeDefined();
			expect( id ).toBeNull();
		} );

		it( hasMethod(
			STATIC,
			"getFreeNodes",
			"Returns an array with the nodes that are neither a RDFDocument nor are contained inside a one.", [
				{name: "object", type: "T extends Object", description: "The object to evaluate for its free nodes."},
			],
			{type: "Carbon.RDF.Node.Class[]"}
		), ():void => {
			expect( RDFNode.Util.getFreeNodes ).toBeDefined();
			expect( Utils.isFunction( RDFNode.Util.getFreeNodes ) ).toBe( true );

			let object:any;

			object = {};
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );

			object = [];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );
			object = [
				{
					"@id": "http://example.com/resouce/",
					"@graph": [ {} ]
				}
			];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );
			object = [
				{
					"@id": "http://example.com/resouce-1/",
					"@graph": [ {} ]
				},
				{
					"@id": "http://example.com/resouce-2/",
					"@graph": [ {} ]
				}
			];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [] );

			object = [
				{
					"@id": "http://example.com/free-node-1/"
				},
				{
					"@id": "http://example.com/resouce-1/",
					"@graph": [ {} ]
				},
				{
					"@id": "http://example.com/free-node-2/"
				},
				{
					"@id": "http://example.com/resouce-2/",
					"@graph": [ {} ]
				}
			];
			expect( RDFNode.Util.getFreeNodes( object ) ).toEqual( [ {"@id": "http://example.com/free-node-1/"}, {"@id": "http://example.com/free-node-2/"} ] );
		} );

	} );

} );