import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasDefaultExport
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as RawResults from "./RawResults";

import * as RawResultsParser from "./RawResultsParser";
import DefaultExport from "./RawResultsParser";

describe( module( "Carbon/SPARQL/RawResultsParser" ), ():void => {

	it( isDefined(), ():void => {
		expect( RawResultsParser ).toBeDefined();
		expect( Utils.isObject( RawResultsParser ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.SPARQL.RawResultsParser.Class",
		"Class to parse SPARQL Query result to a `Carbon.SPARQL.RawResult.Class` object."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RawResultsParser.Class ).toBeDefined();
			expect( Utils.isFunction( RawResultsParser.Class ) ).toBe( true );

			let parser:RawResultsParser.Class = new RawResultsParser.Class();
			expect( parser ).toBeTruthy();
			expect( parser instanceof RawResultsParser.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"parse",
			"Parse the SPARQL Query string result to a `Carbon.SPARQL.RawResult.Class` object.", [
				{name: "input", type: "string"},
			],
			{type: "Promise<Carbon.SPARQL.RawResult.Class>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			let parser:RawResultsParser.Class = new RawResultsParser.Class();

			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let querySelectObject = {
				"head": {
					"link": [
						"http://www.w3.org/TR/rdf-sparql-XMLres/example.rq"
					],
					"vars": [
						"x",
						"hpage",
						"name",
						"mbox",
						"age",
						"blurb",
						"friend"
					]
				},
				"results": {
					"bindings": [
						{
							"x": {"type": "bnode", "value": "r1"},

							"hpage": {"type": "uri", "value": "http://work.example.org/alice/"},

							"name": {"type": "literal", "value": "Alice"},

							"mbox": {"type": "literal", "value": ""},

							"blurb": {
								"datatype": "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral",
								"type": "literal",
								"value": "<p xmlns=\"http://www.w3.org/1999/xhtml\">My name is <b>alice</b></p>"
							},

							"friend": {"type": "bnode", "value": "r2"}
						},
						{
							"x": {"type": "bnode", "value": "r2"},

							"hpage": {"type": "uri", "value": "http://work.example.org/bob/"},

							"name": {"type": "literal", "value": "Bob", "xml:lang": "en"},

							"mbox": {"type": "uri", "value": "mailto:bob@work.example.org"},

							"friend": {"type": "bnode", "value": "r1"}
						}
					]
				}
			};
			let querySelectString = JSON.stringify( querySelectObject );

			let queryAskObject = {
				"head": {},
				"boolean": true
			};
			let queryAskString = JSON.stringify( queryAskObject );

			let spies = {
				successSelect: ( result ) => {
					expect( RawResults.Factory.is( result ) ).toBe( true );
					expect( result ).toEqual( querySelectObject );
				},
				successAsk: ( result ) => {
					expect( RawResults.Factory.is( result ) ).toBe( true );
					expect( result ).toEqual( queryAskObject );
				},
				fail: ( error ) => {
					expect( error ).toBeTruthy();
					expect( error instanceof Error ).toBe( true );
				}
			};
			let spySuccessSelect = spyOn( spies, "successSelect" ).and.callThrough();
			let spySuccessAsk = spyOn( spies, "successAsk" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			let promises:Promise<any>[] = [];
			let promise:Promise<RawResults.Class>;

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

	it( hasDefaultExport( "Carbon.SPARQL.RawResultParser.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( RawResultsParser.Class );
	} );

} );