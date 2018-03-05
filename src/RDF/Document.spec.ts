import {
	clazz,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import DefaultExport, {
	RDFDocument,
	RDFDocumentParser,
} from "./Document";

import { RDFNode } from "./Node";

describe( module( "Carbon/RDF/Document" ), ():void => {

	describe( interfaze(
		"Carbon.RDF.Document.RDFDocument",
		"Interface that represents an `rdf:Document`."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@id",
			"string",
			"The ID URI of the current document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"@graph",
			"Carbon.RDF.Node.RDFNode[]",
			"The graph content of the current document."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.RDF.Document.RDFDocumentConstant",
		"Interface with the factory and utils for `Carbon.RDF.Document.RDFDocument` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object is a `Carbon.RDF.Document.RDFDocument` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is Carbon.RDF.Document.RDFDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Returns a `Carbon.RDF.Document.RDFDocument` object created with the parameters provided.", [
				{ name: "resources", type: "Carbon.RDF.Node.RDFNode[]" },
				{ name: "uri", type: "string", optional: true },
			],
			{ type: "Carbon.RDF.Document.RDFDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getDocuments",
			"Returns the objects that represents an RDF Document of an array of RDF like objects.", [
				{ name: "objects", type: "object | object[]" },
			],
			{ type: "Carbon.RDF.Document.RDFDocument[]" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getResources",
			"Returns all the resources that not are RDF Documents from the array of RDF like objects provided.", [
				{ name: "objects", type: "object | object[]" },
			],
			{ type: "Carbon.RDF.Node.RDFNode" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getDocumentResources",
			"Returns all the resources that are the document resource from an RDF document or an array of RDF nodes.", [
				{ name: "document", type: "Carbon.RDF.Document.RDFDocument | Carbon.RDF.Node.RDFNode[]" },
			],
			{ type: "Carbon.RDF.Node.RDFNode[]" }
		), ():void => {
		} );

		it( hasMethod(
			OBLIGATORY,
			"getNamedFragmentResources",
			"Returns all the resources that refers to named fragments from a RDF document or an array of RDF nodes. " +
			"If documentResource is provided, it will return the fragments of the specified document resource.", [
				{ name: "document", type: "Carbon.RDF.Document.RDFDocument | Carbon.RDF.Node.RDFNode[]" },
				{ name: "documentResource", type: "string | Carbon.RDF.Node.RDFNode", optional: true },
			],
			{ type: "Carbon.RDF.Node.RDFNode[]" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"getBNodeResources",
			"Returns all the resources that refers to the blank nodes from an RDF document or an array of RDF nodes.", [
				{ name: "document", type: "Carbon.RDF.Document.RDFDocument | Carbon.RDF.Node.RDFNode[]" },
			],
			{ type: "Carbon.RDF.Node.RDFNode[]" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RDF.Document.RDFDocument" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RDFDocument;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( property(
		STATIC,
		"RDFDocument",
		"Carbon.RDF.Document.RDFDocumentConstant"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFDocument ).toBeDefined();
			expect( RDFDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in  different tests
		it( "RDFDocument.is", ():void => {
			expect( RDFDocument.is ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.is ) ).toBe( true );

			let object:Object;
			object = {
				"@id": "",
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" },
				],
			};
			expect( RDFDocument.is( object ) ).toBe( true );
			object = {
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" },
				],
			};
			expect( RDFDocument.is( object ) ).toBe( true );
			expect( RDFDocument.is( { "@graph": [] } ) ).toBe( true );

			expect( RDFDocument.is( { "something-else": [] } ) ).toBe( false );
			expect( RDFDocument.is( { "@graph": {} } ) ).toBe( false );
			expect( RDFDocument.is( { "@graph": "something else" } ) ).toBe( false );
			expect( RDFDocument.is( {} ) ).toBe( false );
		} );

		// TODO: Separate in  different tests
		it( "RDFDocument.create", ():void => {
			expect( RDFDocument.create ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.create ) ).toBe( true );

			let nodes:RDFNode[];
			nodes = [
				{ "@id": "http://example.com/resource/1" },
				{ "@id": "http://example.com/resource/1#fragment-1" },
				{ "@id": "http://example.com/resource/2" },
			];
			expect( RDFDocument.create( nodes ) ).toEqual( {
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" },
				],
			} );
			expect( RDFDocument.create( nodes, "http://example.com/uri-resource/" ) ).toEqual( {
				"@id": "http://example.com/uri-resource/",
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" },
				],
			} );

			nodes = [];
			expect( RDFDocument.create( nodes ) ).toEqual( {
				"@graph": [],
			} );
			expect( RDFDocument.create( nodes, "http://example.com/uri-resource/" ) ).toEqual( {
				"@id": "http://example.com/uri-resource/",
				"@graph": [],
			} );

		} );


		let document:RDFDocument;
		let node:RDFNode, fragment:RDFNode, bNode:RDFNode;
		beforeEach( ():void => {
			node = { "@id": "http://example.com/resource/node/" };
			fragment = { "@id": "http://example.com/resource/#fragment" };
			bNode = { "@id": "_:IdOfBlankNode" };
			document = {
				"@id": "http://example.com/resource/",
				"@graph": [
					node,
					fragment,
					bNode,
				],
			};
		} );

		describe( "RDFDocument.getDocuments", ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.getDocuments ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.getDocuments ) ).toBe( true );
			} );

			// TODO: Separate in  different tests
			it( "should tests when array of objects", ():void => {
				let documents:RDFDocument[];

				documents = RDFDocument.getDocuments( [] );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 0 );

				documents = RDFDocument.getDocuments( [ document, document, document ] );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 3 );
				expect( documents[ 0 ] ).toEqual( document );

				documents = RDFDocument.getDocuments( [ node, fragment, bNode, document ] );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 1 );
				expect( documents[ 0 ] ).toBe( document );

				expect( RDFDocument.getDocuments( [ {}, {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.getDocuments( [ null, null, null ] ) ).toEqual( [] );
			} );

			// TODO: Separate in  different tests
			it( "should test when single object", ():void => {
				let documents:RDFDocument[];

				documents = RDFDocument.getDocuments( document );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 1 );
				expect( documents[ 0 ] ).toEqual( document );

				documents = RDFDocument.getDocuments( document );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 1 );
				expect( documents[ 0 ] ).toEqual( document );


				documents = RDFDocument.getDocuments( node );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 0 );

				expect( RDFDocument.getDocuments( {} ) ).toEqual( [] );
				expect( RDFDocument.getDocuments( null ) ).toEqual( [] );
			} );

		} );

		describe( "RDFDocument.getResources", ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.getResources ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.getResources ) ).toBe( true );
			} );

			// TODO: Separate in  different tests
			it( "should test when array of objects", ():void => {
				let nodes:RDFNode[];

				nodes = RDFDocument.getResources( [] );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 0 );

				nodes = RDFDocument.getResources( [ document, document ] );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 3 * 2 );
				expect( RDFNode.is( nodes[ 0 ] ) ).toBe( true );
				expect( nodes[ 0 ] ).toEqual( node );
				expect( RDFNode.areEqual( nodes[ 0 ], node ) ).toBe( true );

				nodes = RDFDocument.getResources( [ node, node, node, node ] );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 4 );
				expect( RDFNode.is( nodes[ 0 ] ) ).toBe( true );
				expect( nodes[ 0 ] ).toEqual( node );
				expect( RDFNode.areEqual( nodes[ 0 ], node ) ).toBe( true );

				expect( RDFDocument.getResources( [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.getResources( [ null, null ] ) ).toEqual( [] );
			} );

			// TODO: Separate in  different tests
			it( "should test when single object", ():void => {
				let nodes:RDFNode[];

				nodes = RDFDocument.getResources( [] );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 0 );

				nodes = RDFDocument.getResources( document );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 3 );
				expect( RDFNode.is( nodes[ 0 ] ) ).toBe( true );
				expect( nodes[ 0 ] ).toEqual( node );
				expect( RDFNode.areEqual( nodes[ 0 ], node ) ).toBe( true );

				nodes = RDFDocument.getResources( node );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 0 );

				expect( RDFDocument.getResources( {} ) ).toEqual( [] );
				expect( RDFDocument.getResources( null ) ).toEqual( [] );
			} );

		} );

		describe( "RDFDocument.getDocumentResources", ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.getDocumentResources ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.getDocumentResources ) ).toBe( true );
			} );

			// TODO: Separate in  different tests
			it( "should test when RDF document", ():void => {
				let documentResources:RDFNode[];

				documentResources = RDFDocument.getDocumentResources( document );
				expect( Utils.isArray( documentResources ) ).toBe( true );
				expect( documentResources.length ).toBe( 1 );
				expect( documentResources ).toEqual( [ node ] );

				expect( RDFDocument.getDocumentResources( <any> {} ) ).toEqual( [] );
				expect( RDFDocument.getDocumentResources( null ) ).toEqual( [] );

			} );

			// TODO: Separate in  different tests
			it( "should test when array of RDF nodes", ():void => {
				let documentResources:RDFNode[];

				documentResources = RDFDocument.getDocumentResources( [ node, fragment, bNode, node ] );
				expect( Utils.isArray( documentResources ) ).toBe( true );
				expect( documentResources.length ).toBe( 2 );
				expect( documentResources ).toEqual( [ node, node ] );

				expect( RDFDocument.getDocumentResources( <any> [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.getDocumentResources( [ null, null ] ) ).toEqual( [] );
			} );

		} );

		describe( "RDFDocument.getNamedFragmentResources", ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.getNamedFragmentResources ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.getNamedFragmentResources ) ).toBe( true );
			} );

			// TODO: Separate in  different tests
			it( "should test when RDFDocument and RDFNode", ():void => {
				let fragmentResources:RDFNode[];

				fragmentResources = RDFDocument.getNamedFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode = <RDFNode>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [ {
						"@value": "A property",
					} ],
				};
				let myDocument:RDFDocument = RDFDocument.create( [
					fragment,
					node,
					myFragment,
					bNode,
				], "http://example.com/resource-another/" );
				let documentResource:RDFNode;

				documentResource = RDFNode.create( document[ "@id" ] );
				fragmentResources = RDFDocument.getNamedFragmentResources( myDocument, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ] );

				documentResource = RDFNode.create( fragment[ "@id" ] );
				fragmentResources = RDFDocument.getNamedFragmentResources( myDocument, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				documentResource = RDFNode.create( myDocument[ "@id" ] );
				fragmentResources = RDFDocument.getNamedFragmentResources( myDocument, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.getNamedFragmentResources( <any> {} ) ).toEqual( [] );
				expect( RDFDocument.getNamedFragmentResources( null ) ).toEqual( [] );
			} );

			// TODO: Separate in  different tests
			it( "should test when RDFDocument and string", ():void => {
				let fragmentResources:RDFNode[];

				fragmentResources = RDFDocument.getNamedFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode = <RDFNode>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [ {
						"@value": "A property",
					} ],
				};
				let myDocument:RDFDocument = RDFDocument.create( [
					fragment,
					node,
					myFragment,
					bNode,
				], "http://example.com/resource-another/" );

				fragmentResources = RDFDocument.getNamedFragmentResources( myDocument, document[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ] );

				fragmentResources = RDFDocument.getNamedFragmentResources( myDocument, fragment[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );

				fragmentResources = RDFDocument.getNamedFragmentResources( myDocument, myDocument[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.getNamedFragmentResources( <any> {} ) ).toEqual( [] );
				expect( RDFDocument.getNamedFragmentResources( null ) ).toEqual( [] );
			} );


			// TODO: Separate in  different tests
			it( "should test when array of RDFNode's and RDFNode", ():void => {
				let fragmentResources:RDFNode[];

				fragmentResources = RDFDocument.getNamedFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode = <RDFNode>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [ {
						"@value": "A property",
					} ],
				};
				let resources:RDFNode[] = [ fragment, node, myFragment, bNode ];
				let documentResource:RDFNode;

				documentResource = RDFNode.create( document[ "@id" ] );
				fragmentResources = RDFDocument.getNamedFragmentResources( resources, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ] );

				documentResource = RDFNode.create( fragment[ "@id" ] );
				fragmentResources = RDFDocument.getNamedFragmentResources( resources, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );

				fragmentResources = RDFDocument.getNamedFragmentResources( resources, "http://example.com/resource-another/" );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.getNamedFragmentResources( <any> [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.getNamedFragmentResources( [ null, null ] ) ).toEqual( [] );
			} );

			// TODO: Separate in  different tests
			it( "should test when array of RDFNode's and string", ():void => {
				let fragmentResources:RDFNode[];

				fragmentResources = RDFDocument.getNamedFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode = <RDFNode>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [ {
						"@value": "A property",
					} ],
				};
				let resources:RDFNode[] = [ fragment, node, myFragment, bNode ];

				fragmentResources = RDFDocument.getNamedFragmentResources( resources, document[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ] );

				fragmentResources = RDFDocument.getNamedFragmentResources( resources, fragment[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );

				fragmentResources = RDFDocument.getNamedFragmentResources( resources, "http://example.com/resource-another/" );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.getNamedFragmentResources( <any> [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.getNamedFragmentResources( [ null, null ] ) ).toEqual( [] );
			} );

		} );

		// TODO: Separate in  different tests
		it( "RDFDocument.getBNodeResources", ():void => {
			expect( RDFDocument.getBNodeResources ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.getBNodeResources ) ).toBe( true );

			let bNodeResources:RDFNode[];

			bNodeResources = RDFDocument.getBNodeResources( document );
			expect( Utils.isArray( bNodeResources ) ).toBe( true );
			expect( bNodeResources.length ).toBe( 1 );
			expect( bNodeResources[ 0 ] ).toEqual( bNode );

			expect( RDFDocument.getBNodeResources( <any> {} ) ).toEqual( [] );
			expect( RDFDocument.getBNodeResources( null ) ).toEqual( [] );
		} );

	} );

	describe( clazz(
		"Carbon.RDF.Document.RDFDocumentParser",
		"Class to parse a JSON-LD string to an array of RDFDocuments."
	), ():void => {
		let compactedObject:any = {
			"@context": {
				"ex": "http://example.com/",
				"ns": "http://example.com/ns#",
			},
			"@id": "ex:resource/",
			"@graph": [
				{
					"@id": "http://example.com/resource/",
					"ns:string": [ {
						"@value": "Document Resource",
					} ],
					"ns:pointerSet": [
						{ "@id": "_:1" },
						{ "@id": "http://example.com/resource/#1" },
						{ "@id": "http://example.com/external-resource/" },
					],
				},
				{
					"@id": "_:1",
					"ns:string": {
						"@value": "Fragment 1",
					},
					"ns:pointerSet": [
						{ "@id": "ex:resource/" },
						{ "@id": "ex:resource/#1" },
					],
				},
				{
					"@id": "ex:resource/#1",
					"ns:string": {
						"@value": "NamedFragment 1",
					},
				},
			],
		};
		let expandedObject:any = [ {
			"@id": "http://example.com/resource/",
			"@graph": [
				{
					"@id": "http://example.com/resource/",
					"http://example.com/ns#string": [ {
						"@value": "Document Resource",
					} ],
					"http://example.com/ns#pointerSet": [
						{ "@id": "_:1" },
						{ "@id": "http://example.com/resource/#1" },
						{ "@id": "http://example.com/external-resource/" },
					],
				},
				{
					"@id": "_:1",
					"http://example.com/ns#string": [ {
						"@value": "Fragment 1",
					} ],
					"http://example.com/ns#pointerSet": [
						{ "@id": "http://example.com/resource/" },
						{ "@id": "http://example.com/resource/#1" },
					],
				},
				{
					"@id": "http://example.com/resource/#1",
					"http://example.com/ns#string": [ {
						"@value": "NamedFragment 1",
					} ],
				},
			],
		} ];

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( RDFDocumentParser ).toBeDefined();
			expect( Utils.isFunction( RDFDocumentParser ) ).toBe( true );

			let parser:RDFDocumentParser = new RDFDocumentParser();
			expect( parser ).toBeDefined();
			expect( parser instanceof RDFDocumentParser ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"parse",
			"Parse the a JSON-LD string to an array of RDFDocuments.", [
				{ name: "input", type: "string" },
			],
			{ type: "Promise<Carbon.RDF.Document.RDFDocument>" }
		), ( done ):void => {
			let parser:RDFDocumentParser = new RDFDocumentParser();
			let input:string;

			input = JSON.stringify( compactedObject );
			let spies:any = {
				success: ( result ):void => {
					expect( Utils.isArray( result ) ).toBe( true );
					expect( result.length ).toBe( 1 );
					expect( RDFDocument.is( result[ 0 ] ) ).toBe( true );
					expect( result ).toEqual( expandedObject );
				},
				successEmpty: ( result ):void => {
					expect( Utils.isArray( result ) ).toBe( true );
					expect( result.length ).toBe( 0 );
				},
				error: ( error ):void => {
					expect( error instanceof Error ).toBe( true );
				},
			};
			let successSpy:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let successEmptySpy:jasmine.Spy = spyOn( spies, "successEmpty" ).and.callThrough();
			let errorSpy:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = parser.parse( input ).then( spies.success, spies.error );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spies.success, spies.error );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = parser.parse( "{}" ).then( spies.successEmpty, spies.error );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = parser.parse( "[ {}, null ]" ).then( spies.successEmpty, spies.error );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			Promise.all( promises ).then( ():void => {
				expect( successSpy.calls.count() ).toBe( 1 );
				expect( successEmptySpy.calls.count() ).toBe( 2 );
				expect( errorSpy.calls.count() ).toBe( 1 );
				done();
			}, done.fail );

		} );

	} );

} );
