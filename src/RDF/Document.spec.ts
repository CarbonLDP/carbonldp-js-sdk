import { RDFDocument } from "./Document";

import { RDFNode } from "./Node";


describe( "RDFDocument", () => {

	it( "should exist", () => {
		expect( RDFDocument ).toBeDefined();
		expect( RDFDocument ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "RDFDocument.is", () => {

			it( "should exist", () => {
				expect( RDFDocument.is ).toBeDefined();
				expect( RDFDocument.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when all properties", () => {
				expect( RDFDocument.is( { "@id": "", "@graph": [] } ) ).toBe( true );
			} );

			it( "should return true when only @graph", () => {
				expect( RDFDocument.is( { "@graph": [] } ) ).toBe( true );
			} );

			it( "should return false when @graph is not an array", () => {
				expect( RDFDocument.is( { "@graph": {} } ) ).toBe( false );
				expect( RDFDocument.is( { "@graph": "something else" } ) ).toBe( false );
			} );

			it( "should return false when empty object", () => {
				expect( RDFDocument.is( {} ) ).toBe( false );
			} );

		} );

		describe( "RDFDocument.create", () => {

			it( "should exist", () => {
				expect( RDFDocument.create ).toBeDefined();
				expect( RDFDocument.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should create from nodes", () => {
				const nodes:RDFNode[] = [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" },
				];
				expect( RDFDocument.create( nodes ) ).toEqual( {
					"@id": "",
					"@graph": [
						{ "@id": "http://example.com/resource/1" },
						{ "@id": "http://example.com/resource/1#fragment-1" },
						{ "@id": "http://example.com/resource/2" },
					],
				} );
			} );

			it( "should create from nodes and a URI", () => {
				const nodes:RDFNode[] = [
					{ "@id": "http://example.com/resource/1" },
					{ "@id": "http://example.com/resource/1#fragment-1" },
					{ "@id": "http://example.com/resource/2" },
				];

				expect( RDFDocument.create( nodes, "http://example.com/uri-resource/" ) ).toEqual( {
					"@id": "http://example.com/uri-resource/",
					"@graph": [
						{ "@id": "http://example.com/resource/1" },
						{ "@id": "http://example.com/resource/1#fragment-1" },
						{ "@id": "http://example.com/resource/2" },
					],
				} );
			} );

		} );


		let document:RDFDocument;
		let node:RDFNode, fragment:RDFNode, bNode:RDFNode;
		beforeEach( () => {
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

		describe( "RDFDocument.getDocuments", () => {

			it( "should exist", () => {
				expect( RDFDocument.getDocuments ).toBeDefined();
				expect( RDFDocument.getDocuments ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return equal only document array", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( [ document, document, document ] );
				expect( documents ).toEqual( [ document, document, document ] );

			} );

			it( "should return only document from nodes array", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( [ node, fragment, bNode, document ] );
				expect( documents ).toEqual( [ document ] );

			} );

			it( "should return document array from single document", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( document );
				expect( documents ).toEqual( [ document ] );

			} );


			it( "should return empty array from empty array", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( [] );
				expect( documents ).toEqual( [] );
			} );

			it( "should return empty array from array with empty objects", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( [ {}, {}, {} ] );
				expect( documents ).toEqual( [] );
			} );

			it( "should return empty array from array with non existent values", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( [ null, undefined, null ] );
				expect( documents ).toEqual( [] );
			} );

			it( "should return empty array from single node", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( node );
				expect( documents ).toEqual( [] );
			} );

			it( "should return empty array from empty object", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( {} );
				expect( documents ).toEqual( [] );
			} );

			it( "should return empty array from single null", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( null );
				expect( documents ).toEqual( [] );
			} );

			it( "should return empty array from single undefined", () => {
				const documents:RDFDocument[] = RDFDocument.getDocuments( undefined );
				expect( documents ).toEqual( [] );
			} );

		} );

		describe( "RDFDocument.getFreeNodes", () => {

			it( "should exist", () => {
				expect( RDFDocument.getFreeNodes ).toBeDefined();
				expect( RDFDocument.getFreeNodes ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return empty array from empty object", () => {
				expect( RDFDocument.getFreeNodes( {} ) ).toEqual( [] );
			} );

			it( "should return empty array from empty array", () => {
				expect( RDFDocument.getFreeNodes( [] ) ).toEqual( [] );
			} );

			it( "should return empty array from array documents", () => {
				const objects:object = [
					{ "@id": "http://example.com/resouce/", "@graph": [ {} ] },
				];
				expect( RDFDocument.getFreeNodes( objects ) ).toEqual( [] );
			} );

			it( "should return nodes array from array documents and nodes", () => {
				const objects:object = [
					{ "@id": "http://example.com/free-node-1/" },
					{ "@id": "http://example.com/resouce-1/", "@graph": [ {} ] },
					{ "@id": "http://example.com/free-node-2/" },
					{ "@id": "http://example.com/resouce-2/", "@graph": [ {} ] },
				];
				expect( RDFDocument.getFreeNodes( objects ) ).toEqual( [
					{ "@id": "http://example.com/free-node-1/" },
					{ "@id": "http://example.com/free-node-2/" },
				] );
			} );

		} );

		describe( "RDFDocument.getResources", () => {

			it( "should exist", () => {
				expect( RDFDocument.getResources ).toBeDefined();
				expect( RDFDocument.getResources ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return graph nodes from documents array", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( [ document, document ] );
				expect( nodes ).toEqual( [
					// Document 1
					node,
					fragment,
					bNode,
					// Document 2
					node,
					fragment,
					bNode,
				] );
			} );

			it( "should return nodes from nodes array", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( [ node, node, node ] );
				expect( nodes ).toEqual( [
					node,
					node,
					node,
				] );
			} );

			it( "should return nodes from single document", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( document );
				expect( nodes ).toEqual( [
					node,
					fragment,
					bNode,
				] );
			} );


			it( "should empty from single node", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( node );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from empty array", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( [] );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from array of empty objects", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( [ {}, {} ] );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from array of null", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( [ null, null ] );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from empty object", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( {} );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from null", () => {
				const nodes:RDFNode[] = RDFDocument.getResources( null );
				expect( nodes ).toEqual( [] );
			} );

		} );


		describe( "RDFDocument.getDocumentResources", () => {

			it( "should exist", () => {
				expect( RDFDocument.getDocumentResources ).toBeDefined();
				expect( RDFDocument.getDocumentResources ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return node resources from document", () => {
				const documentResources:RDFNode[] = RDFDocument.getDocumentResources( document );
				expect( documentResources ).toEqual( [ node ] );
			} );

			it( "should return node resources from nodes", () => {
				const documentResources:RDFNode[] = RDFDocument.getDocumentResources( [ node, fragment, bNode, node ] );
				expect( documentResources ).toEqual( [ node, node ] );
			} );


			it( "should return empty from empty object", () => {
				const documentResources:RDFNode[] = RDFDocument.getDocumentResources( { "@id": "", "@graph": [] } );
				expect( documentResources ).toEqual( [] );
			} );

			it( "should return empty from null", () => {
				const documentResources:RDFNode[] = RDFDocument.getDocumentResources( null );
				expect( documentResources ).toEqual( [] );
			} );

			it( "should return empty from array of empty object", () => {
				const documentResources:RDFNode[] = RDFDocument.getDocumentResources( [ { "@id": "", "@graph": [] } ] );
				expect( documentResources ).toEqual( [] );
			} );

			it( "should return empty from array of null", () => {
				const documentResources:RDFNode[] = RDFDocument.getDocumentResources( [ null, null ] );
				expect( documentResources ).toEqual( [] );
			} );

		} );

		describe( "RDFDocument.getNamedFragmentResources", () => {

			it( "should exist", () => {
				expect( RDFDocument.getNamedFragmentResources ).toBeDefined();
				expect( RDFDocument.getNamedFragmentResources ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return fragments from document", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document );
				expect( nodes ).toEqual( [ fragment ] );
			} );

			it( "should return fragments from document with specified document resource", () => {
				const documentResource:RDFNode = RDFNode.create( document[ "@id" ] );
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document, documentResource );
				expect( nodes ).toEqual( [ fragment ] );
			} );

			it( "should return empty from document with specified fragment node", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document, fragment );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from document with specified not related document resource", () => {
				const documentResource:RDFNode = RDFNode.create( "http://example.com/resource-another/" );
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document, documentResource );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return fragments from document with document resource ID", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document, document[ "@id" ] );
				expect( nodes ).toEqual( [ fragment ] );
			} );

			it( "should return empty from document with specified fragment ID", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document, fragment[ "@id" ] );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from document with specified not related document resource ID", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document, "http://example.com/resource-another/" );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return fragments from document resources", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ] );
				expect( nodes ).toEqual( [ fragment ] );
			} );

			it( "should return fragments from document with specified document resource", () => {
				const documentResource:RDFNode = RDFNode.create( document[ "@id" ] );
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ], documentResource );
				expect( nodes ).toEqual( [ fragment ] );
			} );

			it( "should return empty from document with specified fragment node", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ], fragment );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from document with specified not related document resource", () => {
				const documentResource:RDFNode = RDFNode.create( "http://example.com/resource-another/" );
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ], documentResource );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return fragments from document with document resource ID", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ], document[ "@id" ] );
				expect( nodes ).toEqual( [ fragment ] );
			} );

			it( "should return empty from document with specified fragment ID", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ], fragment[ "@id" ] );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty from document with specified not related document resource ID", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( document[ "@graph" ], "http://example.com/resource-another/" );
				expect( nodes ).toEqual( [] );
			} );


			it( "should return empty when empty document", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( { "@id": "", "@graph": [] } );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty when null", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( null );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty when empty resources", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( [] );
				expect( nodes ).toEqual( [] );
			} );

			it( "should return empty when null array", () => {
				const nodes:RDFNode[] = RDFDocument.getNamedFragmentResources( [ null, null ] );
				expect( nodes ).toEqual( [] );
			} );

		} );

		describe( "RDFDocument.getBNodeResources", () => {

			it( "should exist", () => {
				expect( RDFDocument.getBNodeResources ).toBeDefined();
				expect( RDFDocument.getBNodeResources ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return bNode from document", () => {
				const nodes:RDFNode[] = RDFDocument.getBNodeResources( document );
				expect( nodes ).toEqual( [ bNode ] );
			} );


			it( "should empty from empty document", () => {
				const nodes:RDFNode[] = RDFDocument.getBNodeResources( { "@id": "", "@graph": [] } );
				expect( nodes ).toEqual( [] );
			} );

			it( "should empty from null", () => {
				const nodes:RDFNode[] = RDFDocument.getBNodeResources( null );
				expect( nodes ).toEqual( [] );
			} );

		} );

	} );

} );
