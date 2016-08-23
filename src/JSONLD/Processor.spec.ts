import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as jsonld from "jsonld";
import * as Utils from "./../Utils";

import * as Processor from "./Processor";
import DefaultExport from "./Processor";

describe( module( "Carbon/JSONLD/Processor" ), ():void => {

	it( isDefined(), ():void => {
		expect( Processor ).toBeDefined();
		expect( Utils.isObject( Processor ) ).toBe( true );
	} );

	describe( clazz( "Carbon.JSONLD.Processor.Class", "Class that contains methods that can process JSON-LD objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( Processor.Class).toBeDefined();
			expect( Utils.isFunction( Processor.Class ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"expand",
			"Static method that expand a compacted JSON-LD object.", [
				{ name: "input", type: "Object", description: "The compacted JSON-LD object to expand." },
			],
			{ type: "Promise<Array<Object>>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( Processor.Class.expand ).toBeDefined();
			expect( Utils.isFunction( Processor.Class.expand ) ).toBe( true );

			function jsonldExpand( object:Object ):Promise<Object> {
				return new Promise<Object>( ( resolve:Function, reject:Function ) => {
					jsonld.expand( object, ( error, expanded ) => {
						if( error ) {
							reject( error );
						} else {
							resolve( expanded );
						}
					} );
				} );
			}

			function evaluateExpand( object:Object ):Promise<void> {
				let libExpandPromise:Promise<Object> = jsonldExpand( object );
				let myExpandPromise:Promise<Object> = Processor.Class.expand( object );

				return Promise.all( [ libExpandPromise, myExpandPromise ] ).then( ( [ libExpand, myExpand ]:Object[] ) => {
					expect( object ).not.toBe( libExpand );
					expect( object ).not.toBe( myExpand );

					expect( myExpand ).toEqual( libExpand );
				} );
			}

			let objects:Object[] = [
				{
					"@context": {
						"@vocab": "http://example.com/ns#",
						"@base": "http://example.com/",
						"url": { "@type": "@id" },
					},
					"@type": "Person",
					"name": "Jane Doe",
					"jobTitle": "Professor",
					"telephone": "(425) 123-4567",
					"url": "http://www.janedoe.com",
				},
				{
					"@context": "http://schema.org/",
					"@type": "Person",
					"name": "Jane Doe",
					"jobTitle": "Professor",
					"telephone": "(425) 123-4567",
					"url": "http://www.janedoe.com",
				},
				{
					"@context": {
						"ical": "http://www.w3.org/2002/12/cal/ical#",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"ical:dtstart": {
							"@type": "xsd:dateTime",
						},
					},
					"ical:summary": "Lady Gaga Concert",
					"ical:location": "New Orleans Arena, New Orleans, Louisiana, USA",
					"ical:dtstart": "2011-04-09T20:00Z",
				},
				{
					"@context": {
						"name": "http://schema.org/name",
						"description": "http://schema.org/description",
						"image": {
							"@id": "http://schema.org/image",
							"@type": "@id",
						},
						"geo": "http://schema.org/geo",
						"latitude": {
							"@id": "http://schema.org/latitude",
							"@type": "xsd:float",
						},
						"longitude": {
							"@id": "http://schema.org/longitude",
							"@type": "xsd:float",
						},
						"xsd": "http://www.w3.org/2001/XMLSchema#",
					},
					"name": "The Empire State Building",
					"description": "The Empire State Building is a 102-story landmark in New York City.",
					"image": "http://www.civil.usherbrooke.ca/cours/gci215a/empire-state-building.jpg",
					"geo": {
						"latitude": "40.75",
						"longitude": "73.98",
					},
				},
				{
					"@context": {
						"gr": "http://purl.org/goodrelations/v1#",
						"pto": "http://www.productontology.org/id/",
						"foaf": "http://xmlns.com/foaf/0.1/",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"foaf:page": {
							"@type": "@id",
						},
						"gr:acceptedPaymentMethods": {
							"@type": "@id",
						},
						"gr:hasBusinessFunction": {
							"@type": "@id",
						},
						"gr:hasCurrencyValue": {
							"@type": "xsd:float",
						},
					},
					"@id": "http://example.org/cars/for-sale#tesla",
					"@type": "gr:Offering",
					"gr:name": "Used Tesla Roadster",
					"gr:description": "Need to sell fast and furiously",
					"gr:hasBusinessFunction": "gr:Sell",
					"gr:acceptedPaymentMethods": "gr:Cash",
					"gr:hasPriceSpecification": {
						"gr:hasCurrencyValue": "85000",
						"gr:hasCurrency": "USD",
					},
					"gr:includes": {
						"@type": [
							"gr:Individual",
							"pto:Vehicle",
						],
						"gr:name": "Tesla Roadster",
						"foaf:page": "http://www.teslamotors.com/roadster",
					},
				},
				{
					"@context": {
						"name": "http://rdf.data-vocabulary.org/#name",
						"ingredient": "http://rdf.data-vocabulary.org/#ingredients",
						"yield": "http://rdf.data-vocabulary.org/#yield",
						"instructions": "http://rdf.data-vocabulary.org/#instructions",
						"step": {
							"@id": "http://rdf.data-vocabulary.org/#step",
							"@type": "xsd:integer",
						},
						"description": "http://rdf.data-vocabulary.org/#description",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
					},
					"name": "Mojito",
					"ingredient": [
						"12 fresh mint leaves",
						"1/2 lime, juiced with pulp",
						"1 tablespoons white sugar",
						"1 cup ice cubes",
						"2 fluid ounces white rum",
						"1/2 cup club soda",
					],
					"yield": "1 cocktail",
					"instructions": [ {
							"step": 1,
							"description": "Crush lime juice, mint and sugar together in glass.",
						}, {
							"step": 2,
							"description": "Fill glass to top with ice cubes.",
						}, {
							"step": 3,
							"description": "Pour white rum over ice.",
						}, {
							"step": 4,
							"description": "Fill the rest of glass with club soda, stir.",
						}, {
							"step": 5,
							"description": "Garnish with a lime wedge.",
						},
					],
				},
				{
					"@context": {
						"dc": "http://purl.org/dc/elements/1.1/",
						"ex": "http://example.org/vocab#",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"ex:contains": {
							"@type": "@id",
						},
					},
					"@graph": [
						{
							"@id": "http://example.org/library",
							"@type": "ex:Library",
							"ex:contains": "http://example.org/library/the-republic",
						},
						{
							"@id": "http://example.org/library/the-republic",
							"@type": "ex:Book",
							"dc:creator": "Plato",
							"dc:title": "The Republic",
							"ex:contains": "http://example.org/library/the-republic#introduction",
						},
						{
							"@id": "http://example.org/library/the-republic#introduction",
							"@type": "ex:Chapter",
							"dc:description": "An introductory chapter on The Republic.",
							"dc:title": "The Introduction",
						},
					],
				},
				{
					"@context": "http://www.w3.org/ns/activitystreams",
					"@type": "Create",
					"actor": {
						"@type": "Person",
						"@id": "acct:sally@example.org",
						"displayName": "Sally",
					},
					"object": {
						"@type": "Note",
						"content": "This is a simple note",
					},
					"published": "2015-01-25T12:34:56Z",
				},
			];

			let promises:Promise<void>[] = [];
			for( let object of objects ) {
				promises.push( evaluateExpand( object ) );
			}

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

	} );

	it( hasDefaultExport( "Carbon.JSONLD.Processor.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Processor.Class );
	} );

} );
