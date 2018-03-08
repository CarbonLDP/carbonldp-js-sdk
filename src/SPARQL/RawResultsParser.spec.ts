import {
	clazz,
	hasMethod,
	INSTANCE,
	isDefined,
	module,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import { SPARQLRawResults } from "./RawResults";

import * as RawResultsParser from "./RawResultsParser";

describe( module( "carbonldp/SPARQL/RawResultsParser" ), ():void => {

	it( isDefined(), ():void => {
		expect( RawResultsParser ).toBeDefined();
		expect( Utils.isObject( RawResultsParser ) ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.SPARQL.SPARQLRawResultsParser",
		"Class to parse SPARQL Query result to a `CarbonLDP.SPARQL.SPARQLRawResults` object.", [
			"CarbonLDP.HTTP.Parser<CarbonLDP.SPARQL.SPARQLRawResults>",
		]
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( RawResultsParser.SPARQLRawResultsParser ).toBeDefined();
			expect( Utils.isFunction( RawResultsParser.SPARQLRawResultsParser ) ).toBe( true );

			let parser:RawResultsParser.SPARQLRawResultsParser = new RawResultsParser.SPARQLRawResultsParser();
			expect( parser ).toBeTruthy();
			expect( parser instanceof RawResultsParser.SPARQLRawResultsParser ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"parse",
			"Parse the SPARQL Query string result to a `CarbonLDP.SPARQL.SPARQLRawResults` object.", [
				{ name: "input", type: "string" },
			],
			{ type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			let parser:RawResultsParser.SPARQLRawResultsParser = new RawResultsParser.SPARQLRawResultsParser();

			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let querySelectObject:any = {
				"head": {
					"link": [
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
			let querySelectString:string = JSON.stringify( querySelectObject );

			let queryAskObject:any = {
				"head": {},
				"boolean": true,
			};
			let queryAskString:string = JSON.stringify( queryAskObject );

			let spies:any = {
				successSelect: ( result ) => {
					expect( result ).toEqual( querySelectObject );
				},
				successAsk: ( result ) => {
					expect( result ).toEqual( queryAskObject );
				},
				fail: ( error ) => {
					expect( error ).toBeTruthy();
					expect( error instanceof Error ).toBe( true );
				},
			};
			let spySuccessSelect:jasmine.Spy = spyOn( spies, "successSelect" ).and.callThrough();
			let spySuccessAsk:jasmine.Spy = spyOn( spies, "successAsk" ).and.callThrough();
			let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<SPARQLRawResults>;

			promise = parser.parse( querySelectString );
			expect( promise instanceof Promise );
			promises.push( promise.then( spies.successSelect, spies.fail ) );

			promise = parser.parse( queryAskString );
			expect( promise instanceof Promise );
			promises.push( promise.then( spies.successAsk, spies.fail ) );

			promise = parser.parse( "something that is not a valid JSON !@#$%^&*()_+¡™£¢∞§¶•ªº–" );
			expect( promise instanceof Promise );
			promises.push( promise.then( spies.successSelect, spies.fail ) );

			Promise.all( promises ).then( () => {
				expect( spySuccessSelect.calls.count() ).toBe( 1 );
				expect( spySuccessAsk.calls.count() ).toBe( 1 );
				expect( spyFail.calls.count() ).toBe( 1 );
				done();
			}, done.fail );
		} );

	} );

} );
