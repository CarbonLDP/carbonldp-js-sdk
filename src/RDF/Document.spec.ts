import {
		INSTANCE,
		STATIC,

		module,
		clazz,
		method,

		isDefined,
		hasConstructor,
		hasMethod,
		hasSignature,
		hasProperty,
		hasInterface,
		extendsClass
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as RDFNode from "./RDFNode";
import * as Errors from "./../Errors";

import * as RDFDocument from "./Document";

describe( module( "Carbon/RDF/Document" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFDocument ).toBeDefined();
		expect( Utils.isObject( RDFDocument ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.RDF.Document.Factory",
		"Factory class for `Carbon.RDF.Document.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFDocument.Factory ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object is a `Carbon.RDF.Document.Class` object.", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( RDFDocument.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Factory.is ) ).toBe( true );

			let object:Object;
			object = {
				"@id": "",
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" }
				]
			};
			expect( RDFDocument.Factory.is( object ) ).toBe( true );
			object = {
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" }
				]
			};
			expect( RDFDocument.Factory.is( object ) ).toBe( true );
			expect( RDFDocument.Factory.is( { "@graph": [] } ) ).toBe( true );

			expect( RDFDocument.Factory.is( { "something-else": [] } ) ).toBe( false );
			expect( RDFDocument.Factory.is( { "@graph": {} } ) ).toBe( false );
			expect( RDFDocument.Factory.is( { "@graph": "something else" } ) ).toBe( false );
			expect( RDFDocument.Factory.is( {} ) ).toBe( false );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Returns a `Carbon.RDF.Document.Class` object created with the parameters provided.", [
				{ name: "resources", type: "Carbon.RDF.RDFNode.Class[]" },
				{ name: "uri", type: "string", optional: true }
			],
			{ type: "Carbon.RDF.RDFDocument.Class" }
		), ():void => {
			expect( RDFDocument.Factory.create ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Factory.create ) ).toBe( true );

			let nodes:RDFNode.Class[];
			nodes = [
				{ "@id": "http://example.com/resource/1" },
				{ "@id": "http://example.com/resource/1#fragment-1" },
				{ "@id": "http://example.com/resource/2" }
			];
			expect( RDFDocument.Factory.create( nodes ) ).toEqual({
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" }
				]
			});
			expect( RDFDocument.Factory.create( nodes, "http://example.com/uri-resource/" ) ).toEqual({
				"@id": "http://example.com/uri-resource/",
				"@graph": [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" }
				]
			});

			nodes = [];
			expect( RDFDocument.Factory.create( nodes ) ).toEqual({
				"@graph": [],
			});
			expect( RDFDocument.Factory.create( nodes, "http://example.com/uri-resource/" ) ).toEqual({
				"@id": "http://example.com/uri-resource/",
				"@graph": [],
			});

		});

	});

	describe( clazz(
		"Carbon.RDF.Document.Util",
		"Class with useful functions to manage `Carbon.RDF.Document.Class` objects."
	), ():void => {
		let document:RDFDocument.Class;
		let node:RDFNode.Class, fragment:RDFNode.Class, bNode:RDFNode.Class;

		beforeEach( ():void => {
			node = { "@id": "http://example.com/resource/node/" };
			fragment = { "@id": "http://example.com/resource/#fragment" };
			bNode = { "@id": "_:IdOfBlankNode" };
			document = {
				"@id": "http://example.com/resource/",
				"@graph": [
					node,
					fragment,
					bNode
				],
			};
		} );

		it( isDefined(), ():void => {
			expect( RDFDocument.Util ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Util ) ).toBe( true );
		} );

		describe( method(
			STATIC,
			"getDocuments"
		), ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.Util.getDocuments ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.Util.getDocuments ) ).toBe( true );
			});

			it( hasSignature(
				"Returns the objects that represents a RDF Document of an array of RDF like objects.", [
					{ name: "objects", type: "Object[]" }
				],
				{ type: "Carbon.RDF.Document.Class[]" }
			), ():void => {
				let documents:RDFDocument.Class[];

				documents = RDFDocument.Util.getDocuments( [] );
				expect( Utils.isArray ( documents ) ).toBe( true );
				expect( documents.length ).toBe( 0 );

				documents = RDFDocument.Util.getDocuments( [ document, document, document ] );
				expect( Utils.isArray ( documents ) ).toBe( true );
				expect( documents.length ).toBe( 3 );
				expect( documents[ 0 ] ).toEqual( document );

				documents = RDFDocument.Util.getDocuments( [ node, fragment, bNode, document ] );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 1 );
				expect( documents[ 0 ] ).toBe( document );

				expect( RDFDocument.Util.getDocuments( [ {},  {},  {} ] ) ).toEqual( [] );
				expect( RDFDocument.Util.getDocuments( [ null, null, null ] ) ).toEqual( [] );
			});

			it( hasSignature(
				"Returns an array of with the object provided, if it is an RDF Document.", [
					{ name: "object", type: "Object" }
				],
				{ type: "Carbon.RDF.Document.Class[]" }
			), ():void => {
				let documents:RDFDocument.Class[];

				documents = RDFDocument.Util.getDocuments( document );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 1 );
				expect( documents[ 0 ] ).toEqual( document );

				documents = RDFDocument.Util.getDocuments( document );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 1 );
				expect( documents[ 0 ] ).toEqual( document );


				documents = RDFDocument.Util.getDocuments( node );
				expect( Utils.isArray( documents ) ).toBe( true );
				expect( documents.length ).toBe( 0 );

				expect( RDFDocument.Util.getDocuments( {} ) ).toEqual( [] );
				expect( RDFDocument.Util.getDocuments( null ) ).toEqual( [] );
			});

		});

		describe( method(
			STATIC,
			"getResources"
		), ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.Util.getResources ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.Util.getResources ) ).toBe( true );
			});

			it( hasSignature(
				"Returns all the resources that not are RDF Documents from the array of RDF like objects provided.", [
					{ name: "objects", type: "Object[]" }
				],
				{ type: "Carbon.RDF.RDFNode.Class" }
			), ():void => {
				let nodes:RDFNode.Class[];

				nodes = RDFDocument.Util.getResources( [] );
				expect( Utils.isArray ( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 0 );

				nodes = RDFDocument.Util.getResources( [ document, document ] );
				expect( Utils.isArray ( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 3 * 2 );
				expect( RDFNode.Factory.is( nodes[ 0 ] ) ).toBe( true );
				expect( nodes[ 0 ] ).toEqual( node );
				expect( RDFNode.Util.areEqual( nodes[ 0 ], node ) ).toBe( true );

				nodes = RDFDocument.Util.getResources( [ node, node, node, node ] );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 4 );
				expect( RDFNode.Factory.is( nodes[ 0 ] ) ).toBe( true );
				expect( nodes[ 0 ] ).toEqual( node );
				expect( RDFNode.Util.areEqual( nodes[ 0 ], node ) ).toBe( true );

				expect( RDFDocument.Util.getResources( [ {}, {}] ) ).toEqual( [] );
				expect( RDFDocument.Util.getResources( [ null, null ] ) ).toEqual( [] );
			});

			it( hasSignature(
				"Returns all the resources that not are RDF Documents from the RDF like object provided.", [
					{ name: "object", type: "Object" }
				],
				{ type: "Carbon.RDF.RDFNode.Class" }
			), ():void => {
				let nodes:RDFNode.Class[];

				nodes = RDFDocument.Util.getResources( [] );
				expect( Utils.isArray ( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 0 );

				nodes = RDFDocument.Util.getResources( document );
				expect( Utils.isArray ( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 3 );
				expect( RDFNode.Factory.is( nodes[ 0 ] ) ).toBe( true );
				expect( nodes[ 0 ] ).toEqual( node );
				expect( RDFNode.Util.areEqual( nodes[ 0 ], node ) ).toBe( true );

				nodes = RDFDocument.Util.getResources( node );
				expect( Utils.isArray( nodes ) ).toBe( true );
				expect( nodes.length ).toBe( 0 );

				expect( RDFDocument.Util.getResources( {} ) ).toEqual( [] );
				expect( RDFDocument.Util.getResources( null ) ).toEqual( [] );
			});

		});

		describe( method(
			STATIC,
			"getDocumentResources"
		), ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.Util.getDocumentResources ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.Util.getDocumentResources ) ).toBe( true );
			});

			it( hasSignature(
				"Returns all the resources that refers to documents from a document.", [
					{ name: "document", type: "Carbon.RDF.Document.Class" }
				],
				{ type: "Carbon.RDF.RDFNode.Class[]" }
			), ():void => {
				let documentResources:RDFNode.Class[];

				documentResources = RDFDocument.Util.getDocumentResources( document );
				expect( Utils.isArray( documentResources ) ).toBe( true );
				expect( documentResources.length ).toBe( 1 );
				expect( documentResources ).toEqual( [ node ] );

				expect( RDFDocument.Util.getDocumentResources( <any> {} ) ).toEqual( [] );
				expect( RDFDocument.Util.getDocumentResources( null ) ).toEqual( [] );

			});

			it( hasSignature(
				"Returns all the resources that refers to documents from an array of resources.", [
					{ name: "document", type: "Carbon.RDF.RDFNode.Class[]" }
				],
				{ type: "Carbon.RDF.RDFNode.Class[]" }
			), ():void => {
				let documentResources:RDFNode.Class[];

				documentResources = RDFDocument.Util.getDocumentResources( [ node, fragment, bNode, node ] );
				expect( Utils.isArray( documentResources ) ).toBe( true );
				expect( documentResources.length ).toBe( 2 );
				expect( documentResources ).toEqual( [ node, node ] );

				expect( RDFDocument.Util.getDocumentResources( <any> [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.Util.getDocumentResources( [ null, null ] ) ).toEqual( [] );
			});

		});

		describe( method(
			STATIC,
			"getFragmentResources"
		), ():void => {

			it( isDefined(), ():void => {
				expect( RDFDocument.Util.getFragmentResources ).toBeDefined();
				expect( Utils.isFunction( RDFDocument.Util.getFragmentResources ) ).toBe( true );
			});

			it( hasSignature(
				"Returns all the resources that refers to fragments from a document. " +
				"If documentResource is provided, it will return the fragments of the specified document.", [
					{ name: "document", type: "Carbon.RDF.Document.Class" },
					{ name: "documentResource", type: "Carbon.RDF.RDFNode.Class", optional: true }
				],
				{ type: "Carbon.RDF.RDFNode.Class[]" }
			), ():void => {
				let fragmentResources:RDFNode.Class[];

				fragmentResources = RDFDocument.Util.getFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode.Class = <RDFNode.Class>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [{
						"@value": "A property"
					}]
				};
				let myDocument:RDFDocument.Class = RDFDocument.Factory.create( [
					fragment,
					node,
					myFragment,
					bNode
				], "http://example.com/resource-another/" );
				let documentResource:RDFNode.Class;

				documentResource = RDFNode.Factory.create( document[ "@id" ] );
				fragmentResources = RDFDocument.Util.getFragmentResources( myDocument, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ]);

				documentResource = RDFNode.Factory.create( fragment[ "@id" ] );
				fragmentResources = RDFDocument.Util.getFragmentResources( myDocument, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				documentResource = RDFNode.Factory.create( myDocument[ "@id" ] );
				fragmentResources = RDFDocument.Util.getFragmentResources( myDocument, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.Util.getFragmentResources( <any> {} ) ).toEqual( [] );
				expect( RDFDocument.Util.getFragmentResources( null ) ).toEqual( [] );
			});

			it( hasSignature(
				"Returns all the resources that refers to fragments from a document. " +
				"If documentResourceURI is provided, it will return the fragments of the specified URI.", [
					{ name: "document", type: "Carbon.RDF.Document.Class" },
					{ name: "documentResourceURI", type: "string", optional: true }
				],
				{ type: "Carbon.RDF.RDFNode.Class[]" }
			), ():void => {
				let fragmentResources:RDFNode.Class[];

				fragmentResources = RDFDocument.Util.getFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode.Class = <RDFNode.Class>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [{
						"@value": "A property"
					}]
				};
				let myDocument:RDFDocument.Class = RDFDocument.Factory.create( [
					fragment,
					node,
					myFragment,
					bNode
				], "http://example.com/resource-another/" );

				fragmentResources = RDFDocument.Util.getFragmentResources( myDocument, document[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ]);

				fragmentResources = RDFDocument.Util.getFragmentResources( myDocument, fragment[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );

				fragmentResources = RDFDocument.Util.getFragmentResources( myDocument, myDocument[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.Util.getFragmentResources( <any> {} ) ).toEqual( [] );
				expect( RDFDocument.Util.getFragmentResources( null ) ).toEqual( [] );
			});


			it( hasSignature(
				"Returns all the resources that refers to fragments from an array of resources. " +
				"If documentResource is provided, it will return the fragments of the specified document.", [
					{ name: "document", type: "Carbon.RDF.Document.Class" },
					{ name: "documentResource", type: "Carbon.RDF.RDFNode.Class", optional: true }
				],
				{ type: "Carbon.RDF.RDFNode.Class[]" }
			), ():void => {
				let fragmentResources:RDFNode.Class[];

				fragmentResources = RDFDocument.Util.getFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode.Class = <RDFNode.Class>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [{
						"@value": "A property"
					}]
				};
				let resources:RDFNode.Class[] = [ fragment, node, myFragment, bNode ];
				let documentResource:RDFNode.Class;

				documentResource = RDFNode.Factory.create( document[ "@id" ] );
				fragmentResources = RDFDocument.Util.getFragmentResources( resources, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ]);

				documentResource = RDFNode.Factory.create( fragment[ "@id" ] );
				fragmentResources = RDFDocument.Util.getFragmentResources( resources, documentResource );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );

				fragmentResources = RDFDocument.Util.getFragmentResources( resources, "http://example.com/resource-another/" );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.Util.getFragmentResources( <any> [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.Util.getFragmentResources( [ null, null ] ) ).toEqual( [] );
			});

			it( hasSignature(
				"Returns all the resources that refers to fragments from a document. " +
				"If documentResourceURI is provided, it will return the fragments of the specified URI.", [
					{ name: "document", type: "Carbon.RDF.Document.Class" },
					{ name: "documentResourceURI", type: "string", optional: true }
				],
				{ type: "Carbon.RDF.RDFNode.Class[]" }
			), ():void => {
				let fragmentResources:RDFNode.Class[];

				fragmentResources = RDFDocument.Util.getFragmentResources( document );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 1 );
				expect( fragmentResources[ 0 ] ).toEqual( fragment );

				let myFragment:RDFNode.Class = <RDFNode.Class>{
					"@id": document[ "@id" ] + "#fragment-2",
					"@type": [ "http://example.com/types/#fragment" ],
					"http://example.com/property": [{
						"@value": "A property"
					}]
				};
				let resources:RDFNode.Class[] = [ fragment, node, myFragment, bNode ];

				fragmentResources = RDFDocument.Util.getFragmentResources( resources, document[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 2 );
				expect( fragmentResources ).toEqual( [ fragment, myFragment ]);

				fragmentResources = RDFDocument.Util.getFragmentResources( resources, fragment[ "@id" ] );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );

				fragmentResources = RDFDocument.Util.getFragmentResources( resources, "http://example.com/resource-another/" );
				expect( Utils.isArray( fragmentResources ) ).toBe( true );
				expect( fragmentResources.length ).toBe( 0 );


				expect( RDFDocument.Util.getFragmentResources( <any> [ {}, {} ] ) ).toEqual( [] );
				expect( RDFDocument.Util.getFragmentResources( [ null, null ] ) ).toEqual( [] );
			});

		});

		it( hasMethod(
			STATIC,
			"getBNodeResources",
			"Returns all the resources that refers to blank nodes from a document.", [
				{ name: "document", type: "Carbon.RDF.Document.Class" }
			],
			{ type: "Carbon.RDF.RDFNode.Class[]" }
		), ():void => {
			expect( RDFDocument.Util.getBNodeResources ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Util.getBNodeResources ) ).toBe( true );

			let bNodeResources:RDFNode.Class[];

			bNodeResources = RDFDocument.Util.getBNodeResources( document );
			expect( Utils.isArray( bNodeResources ) ).toBe( true );
			expect( bNodeResources.length ).toBe( 1 );
			expect( bNodeResources[ 0 ] ).toEqual( bNode );

			expect( RDFDocument.Util.getBNodeResources( <any> {} ) ).toEqual( [] );
			expect( RDFDocument.Util.getBNodeResources( null ) ).toEqual( [] );
		});

	});

	describe( clazz(
		"Carbon.RDF.Document.Parser",
		"Class for parse a JSON-LD string to an array of RDFDocuments."
	), ():void => {
		let compactedObject = {
			"@context": {
				"ex": "http://example.com/",
				"ns": "http://example.com/ns#",
			},
			"@id": "ex:resource/",
			"@graph": [
				{
					"@id": "http://example.com/resource/",
					"ns:string": [{
						"@value": "Document Resource"
					}],
					"ns:pointerSet": [
						{ "@id": "_:1" },
						{ "@id": "http://example.com/resource/#1" },
						{ "@id": "http://example.com/external-resource/" },
					],
				},
				{
					"@id": "_:1",
					"ns:string": {
						"@value": "Fragment 1"
					},
					"ns:pointerSet": [
						{ "@id": "ex:resource/" },
						{ "@id": "ex:resource/#1" },
					],
				},
				{
					"@id": "ex:resource/#1",
					"ns:string": {
						"@value": "NamedFragment 1"
					},
				},
			],
		};
		let expandedObject = [{
			"@id": "http://example.com/resource/",
			"@graph": [
				{
					"@id": "http://example.com/resource/",
					"http://example.com/ns#string": [{
						"@value": "Document Resource"
					}],
					"http://example.com/ns#pointerSet": [
						{ "@id": "_:1" },
						{ "@id": "http://example.com/resource/#1" },
						{ "@id": "http://example.com/external-resource/" },
					],
				},
				{
					"@id": "_:1",
					"http://example.com/ns#string": [{
						"@value": "Fragment 1"
					}],
					"http://example.com/ns#pointerSet": [
						{ "@id": "http://example.com/resource/" },
						{ "@id": "http://example.com/resource/#1" },
					],
				},
				{
					"@id": "http://example.com/resource/#1",
					"http://example.com/ns#string": [{
						"@value": "NamedFragment 1"
					}],
				},
			],
		}];

		it( isDefined(), ():void => {
			expect( RDFDocument.Parser ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Parser ) ).toBe( true );

			let parser:RDFDocument.Parser = new RDFDocument.Parser();
			expect( parser ).toBeDefined();
			expect( parser instanceof RDFDocument.Parser ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"parse",
			"Parse the a JSON-LD string to an array of RDFDocuments.", [
				{ name: "input", type: "string" }
			],
			{ type: "Promise<any>" }
		), ( done ):void => {
			let parser:RDFDocument.Parser = new RDFDocument.Parser();
			let input:string;

			input = JSON.stringify( compactedObject );
			let spies = {
				success: ( result ):void => {
					expect( Utils.isArray( result ) ).toBe( true );
					expect( result.length ).toBe( 1 );
					expect( RDFDocument.Factory.is( result[ 0 ] ) ).toBe( true );
					expect( result ).toEqual( expandedObject );
				},
				successEmpty: ( result ):void => {
					expect( Utils.isArray( result ) ).toBe( true );
					expect( result.length ).toBe( 0 );
				},
				error: ( error ):void => {
					expect( error instanceof Error ).toBe( true );
				}
			};
			let success = spyOn(spies, 'success').and.callThrough();
			let successEmpty = spyOn(spies, 'successEmpty').and.callThrough();
			let error = spyOn(spies, 'error').and.callThrough();

			let promises: Promise<any>[] = [];
			let promise:Promise<any>;

			promise = parser.parse( input ).then( spies.success, spies.error );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spies.success, spies.error );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = parser.parse( "{}" ).then( spies.successEmpty, spies.error )
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			promise = parser.parse( "[ {}, null ]" ).then( spies.successEmpty, spies.error )
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise );

			Promise.all( promises ).then( ():void => {
				expect( success.calls.count() ).toBe( 1 );
				expect( successEmpty.calls.count() ).toBe( 2 );
				expect( error.calls.count() ).toBe( 1 );
				done();
			}, done.fail );

		});

	})

});
