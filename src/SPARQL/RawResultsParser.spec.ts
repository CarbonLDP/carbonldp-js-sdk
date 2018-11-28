import { SPARQLRawResults } from "./RawResults";
import { SPARQLRawResultsParser } from "./RawResultsParser";


describe( "SPARQLRawResultsParser", () => {

	it( "should exist", () => {
		expect( SPARQLRawResultsParser ).toBeDefined();
		expect( SPARQLRawResultsParser ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be instantiable", () => {
		const parser:SPARQLRawResultsParser = new SPARQLRawResultsParser();
		expect( parser ).toEqual( jasmine.any( SPARQLRawResultsParser ) );
	} );


	describe( "SPARQLRawResultsParser.parse", () => {

		it( "should exist", () => {
			expect( SPARQLRawResultsParser.prototype.parse ).toBeDefined();
			expect( SPARQLRawResultsParser.prototype.parse ).toEqual( jasmine.any( Function ) );
		} );


		it( "should parse query SELECT result", async () => {
			const data:SPARQLRawResults = {
				"head": {
					"links": [
						"http://www.w3.org/TR/rdf-sparql-XMLres/example.rq",
					],
					"vars": [
						"x",
						"hpage",
						"name",
						"mbox",
						"age",
						"blurb",
						"friend",
					],
				},
				"results": {
					"bindings": [
						{
							"x": { "type": "bnode", "value": "r1" },

							"hpage": { "type": "uri", "value": "http://work.example.org/alice/" },

							"name": { "type": "literal", "value": "Alice" },

							"mbox": { "type": "literal", "value": "" },

							"blurb": {
								"datatype": "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral",
								"type": "literal",
								"value": "<p xmlns=\"http://www.w3.org/1999/xhtml\">My name is <b>alice</b></p>",
							},

							"friend": { "type": "bnode", "value": "r2" },
						},
						{
							"x": { "type": "bnode", "value": "r2" },

							"hpage": { "type": "uri", "value": "http://work.example.org/bob/" },

							"name": { "type": "literal", "value": "Bob", "xml:lang": "en" },

							"mbox": { "type": "uri", "value": "mailto:bob@work.example.org" },

							"friend": { "type": "bnode", "value": "r1" },
						},
					],
				},
			};

			const parser:SPARQLRawResultsParser = new SPARQLRawResultsParser();
			const result:SPARQLRawResults = await parser.parse( JSON.stringify( data ) );

			expect( result ).toEqual( data );
		} );

		it( "should parse query ASK result", async () => {
			const data:SPARQLRawResults = {
				"head": {},
				"boolean": true,
			};

			const parser:SPARQLRawResultsParser = new SPARQLRawResultsParser();
			const result:SPARQLRawResults = await parser.parse( JSON.stringify( data ) );

			expect( result ).toEqual( data );
		} );

		it( "should throw error when invalid data", async () => {
			const parser:SPARQLRawResultsParser = new SPARQLRawResultsParser();

			await parser
				.parse( "something that is not a valid JSON !@#$%^&*()_+¡™£¢∞§¶•ªº–" )
				.catch( error => {
					expect( error ).toEqual( jasmine.any( Error ) );
				} );
		} );

	} );

} );
