import * as jsonld from "jsonld";
import {
	clazz,
	hasMethod,
	isDefined,
	module,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { JSONLDProcessor } from "./JSONLDProcessor";

describe( module( "carbonldp/JSONLD/JSONLDProcessor" ), ():void => {

	describe( clazz( "CarbonLDP.JSONLD.JSONLDProcessor", "Class that contains methods that can process JSON-LD objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( JSONLDProcessor ).toBeDefined();
			expect( Utils.isFunction( JSONLDProcessor ) ).toBe( true );
		} );

		beforeEach( () => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://schema.org/" ).andReturn( {
				status: 200,
				responseHeaders: {
					"Content-Type": "application/ld+json",
					"ETag": "1234567890",
				},
				responseText: `{
					"@context": {
						"type": "@type",
						"id": "@id",
						"@vocab": "http://schema.org/",
						"schema": "http://schema.org/",
						"cat": "http://www.w3.org/ns/dcat#",
						"cc": "http://creativecommons.org/ns#",
						"cnt": "http://www.w3.org/2008/content#",
						"ctag": "http://commontag.org/ns#",
						"dc": "http://purl.org/dc/terms/",
						"dcat": "http://www.w3.org/ns/dcat#",
						"dcterms": "http://purl.org/dc/terms/",
						"describedby": "http://www.w3.org/2007/05/powder-s#describedby",
						"earl": "http://www.w3.org/ns/earl#",
						"foaf": "http://xmlns.com/foaf/0.1/",
						"gldp": "http://www.w3.org/ns/people#",
						"gr": "http://purl.org/goodrelations/v1#",
						"grddl": "http://www.w3.org/2003/g/data-view#",
						"ht": "http://www.w3.org/2006/http#",
						"ical": "http://www.w3.org/2002/12/cal/icaltzd#",
						"license": {
							"@id": "schema:license",
							"@type": "@id"
						},
						"ma": "http://www.w3.org/ns/ma-ont#",
						"og": "http://ogp.me/ns#",
						"org": "http://www.w3.org/ns/org#",
						"owl": "http://www.w3.org/2002/07/owl#",
						"prov": "http://www.w3.org/ns/prov#",
						"ptr": "http://www.w3.org/2009/pointers#",
						"qb": "http://purl.org/linked-data/cube#",
						"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
						"rdfa": "http://www.w3.org/ns/rdfa#",
						"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
						"rev": "http://purl.org/stuff/rev#",
						"rif": "http://www.w3.org/2007/rif#",
						"role": "http://www.w3.org/1999/xhtml/vocab#role",
						"rr": "http://www.w3.org/ns/r2rml#",
						"sd": "http://www.w3.org/ns/sparql-service-description#",
						"sioc": "http://rdfs.org/sioc/ns#",
						"skos": "http://www.w3.org/2004/02/skos/core#",
						"skosxl": "http://www.w3.org/2008/05/skos-xl#",
						"v": "http://rdf.data-vocabulary.org/#",
						"vcard": "http://www.w3.org/2006/vcard/ns#",
						"void": "http://rdfs.org/ns/void#",
						"wdr": "http://www.w3.org/2007/05/powder#",
						"wdrs": "http://www.w3.org/2007/05/powder-s#",
						"xhv": "http://www.w3.org/1999/xhtml/vocab#",
						"xml": "http://www.w3.org/XML/1998/namespace",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"APIReference": {
							"@id": "schema:APIReference"
						},
						"jobTitle": {
							"@id": "schema:jobTitle"
						},
						"name": {
							"@id": "schema:name"
						},
						"telephone": {
							"@id": "schema:telephone"
						},
						"url": {
							"@id": "schema:url",
							"@type": "@id"
						}
					}
				}`,
			} );
			jasmine.Ajax.stubRequest( "http://www.w3.org/ns/activitystreams" ).andReturn( {
				status: 200,
				responseHeaders: {
					"Content-Type": "application/ld+json",
					"ETag": "1234567890",
				},
				responseText: `{
					"@context": {
						"@vocab": "_:",
						"xsd": "http://www.w3.org/2001/XMLSchema#",
						"as": "http://www.w3.org/ns/activitystreams#",
						"id": "@id",
						"type": "@type",
						"Accept": "as:Accept",
						"Activity": "as:Activity",
						"IntransitiveActivity": "as:IntransitiveActivity",
						"Add": "as:Add",
						"Announce": "as:Announce",
						"Application": "as:Application",
						"Arrive": "as:Arrive",
						"Article": "as:Article",
						"Audio": "as:Audio",
						"Block": "as:Block",
						"Collection": "as:Collection",
						"CollectionPage": "as:CollectionPage",
						"Relationship": "as:Relationship",
						"Create": "as:Create",
						"Delete": "as:Delete",
						"Dislike": "as:Dislike",
						"Document": "as:Document",
						"Event": "as:Event",
						"Follow": "as:Follow",
						"Flag": "as:Flag",
						"Group": "as:Group",
						"Ignore": "as:Ignore",
						"Image": "as:Image",
						"Invite": "as:Invite",
						"Join": "as:Join",
						"Leave": "as:Leave",
						"Like": "as:Like",
						"Link": "as:Link",
						"Mention": "as:Mention",
						"Note": "as:Note",
						"Object": "as:Object",
						"Offer": "as:Offer",
						"OrderedCollection": "as:OrderedCollection",
						"OrderedCollectionPage": "as:OrderedCollectionPage",
						"Organization": "as:Organization",
						"Page": "as:Page",
						"Person": "as:Person",
						"Place": "as:Place",
						"Profile": "as:Profile",
						"Question": "as:Question",
						"Reject": "as:Reject",
						"Remove": "as:Remove",
						"Service": "as:Service",
						"TentativeAccept": "as:TentativeAccept",
						"TentativeReject": "as:TentativeReject",
						"Tombstone": "as:Tombstone",
						"Undo": "as:Undo",
						"Update": "as:Update",
						"Video": "as:Video",
						"View": "as:View",
						"Listen": "as:Listen",
						"Read": "as:Read",
						"Move": "as:Move",
						"Travel": "as:Travel",
						"IsFollowing": "as:IsFollowing",
						"IsFollowedBy": "as:IsFollowedBy",
						"IsContact": "as:IsContact",
						"IsMember": "as:IsMember",
						"subject": {
							"@id": "as:subject",
							"@type": "@id"
						},
						"relationship": {
							"@id": "as:relationship",
							"@type": "@id"
						},
						"actor": {
							"@id": "as:actor",
							"@type": "@id"
						},
						"attributedTo": {
							"@id": "as:attributedTo",
							"@type": "@id"
						},
						"attachment": {
							"@id": "as:attachment",
							"@type": "@id"
						},
						"attachments": {
							"@id": "as:attachments",
							"@type": "@id"
						},
						"author": {
							"@id": "as:author",
							"@type": "@id"
						},
						"bcc": {
							"@id": "as:bcc",
							"@type": "@id"
						},
						"bto": {
							"@id": "as:bto",
							"@type": "@id"
						},
						"cc": {
							"@id": "as:cc",
							"@type": "@id"
						},
						"context": {
							"@id": "as:context",
							"@type": "@id"
						},
						"current": {
							"@id": "as:current",
							"@type": "@id"
						},
						"first": {
							"@id": "as:first",
							"@type": "@id"
						},
						"generator": {
							"@id": "as:generator",
							"@type": "@id"
						},
						"icon": {
							"@id": "as:icon",
							"@type": "@id"
						},
						"image": {
							"@id": "as:image",
							"@type": "@id"
						},
						"inReplyTo": {
							"@id": "as:inReplyTo",
							"@type": "@id"
						},
						"items": {
							"@id": "as:items",
							"@type": "@id"
						},
						"instrument": {
							"@id": "as:instrument",
							"@type": "@id"
						},
						"orderedItems": {
							"@id": "as:items",
							"@type": "@id",
							"@container": "@list"
						},
						"last": {
							"@id": "as:last",
							"@type": "@id"
						},
						"location": {
							"@id": "as:location",
							"@type": "@id"
						},
						"next": {
							"@id": "as:next",
							"@type": "@id"
						},
						"object": {
							"@id": "as:object",
							"@type": "@id"
						},
						"oneOf": {
							"@id": "as:oneOf",
							"@type": "@id"
						},
						"anyOf": {
							"@id": "as:anyOf",
							"@type": "@id"
						},
						"closed": {
							"@id": "as:closed",
							"@type": "xsd:dateTime"
						},
						"origin": {
							"@id": "as:origin",
							"@type": "@id"
						},
						"accuracy": {
							"@id": "as:accuracy",
							"@type": "xsd:float"
						},
						"prev": {
							"@id": "as:prev",
							"@type": "@id"
						},
						"preview": {
							"@id": "as:preview",
							"@type": "@id"
						},
						"provider": {
							"@id": "as:provider",
							"@type": "@id"
						},
						"replies": {
							"@id": "as:replies",
							"@type": "@id"
						},
						"result": {
							"@id": "as:result",
							"@type": "@id"
						},
						"audience": {
							"@id": "as:audience",
							"@type": "@id"
						},
						"partOf": {
							"@id": "as:partOf",
							"@type": "@id"
						},
						"tag": {
							"@id": "as:tag",
							"@type": "@id"
						},
						"tags": {
							"@id": "as:tag",
							"@type": "@id"
						},
						"target": {
							"@id": "as:target",
							"@type": "@id"
						},
						"to": {
							"@id": "as:to",
							"@type": "@id"
						},
						"url": {
							"@id": "as:url",
							"@type": "@id"
						},
						"altitude": {
							"@id": "as:altitude",
							"@type": "xsd:float"
						},
						"content": "as:content",
						"contentMap": {
							"@id": "as:content",
							"@container": "@language"
						},
						"name": "as:name",
						"nameMap": {
							"@id": "as:name",
							"@container": "@language"
						},
						"downstreamDuplicates": "as:downStreamDuplicates",
						"duration": {
							"@id": "as:duration",
							"@type": "xsd:duration"
						},
						"endTime": {
							"@id": "as:endTime",
							"@type": "xsd:dateTime"
						},
						"height": {
							"@id": "as:height",
							"@type": "xsd:nonNegativeInteger"
						},
						"href": {
							"@id": "as:href",
							"@type": "@id"
						},
						"hreflang": "as:hreflang",
						"latitude": {
							"@id": "as:latitude",
							"@type": "xsd:float"
						},
						"longitude": {
							"@id": "as:longitude",
							"@type": "xsd:float"
						},
						"mediaType": "as:mediaType",
						"published": {
							"@id": "as:published",
							"@type": "xsd:dateTime"
						},
						"radius": {
							"@id": "as:radius",
							"@type": "xsd:float"
						},
						"rating": {
							"@id": "as:rating",
							"@type": "xsd:float"
						},
						"rel": "as:rel",
						"startIndex": {
							"@id": "as:startIndex",
							"@type": "xsd:nonNegativeInteger"
						},
						"startTime": {
							"@id": "as:startTime",
							"@type": "xsd:dateTime"
						},
						"summary": "as:summary",
						"summaryMap": {
							"@id": "as:summary",
							"@container": "@language"
						},
						"totalItems": {
							"@id": "as:totalItems",
							"@type": "xsd:nonNegativeInteger"
						},
						"units": "as:units",
						"updated": {
							"@id": "as:updated",
							"@type": "xsd:dateTime"
						},
						"upstreamDuplicates": "as:upstreamDuplicates",
						"verb": "as:verb",
						"width": {
							"@id": "as:width",
							"@type": "xsd:nonNegativeInteger"
						},
						"describes": {
							"@id": "as:describes",
							"@type": "@id"
						},
						"formerType": {
							"@id": "as:formerType",
							"@type": "@id"
						},
						"deleted": {
							"@id": "as:deleted",
							"@type": "xsd:dateTime"
						}
					}
				}`,
			} );
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );

		it( hasMethod(
			STATIC,
			"expand",
			"Static method that expand a compacted JSON-LD object.", [
				{ name: "input", type: "object", description: "The compacted JSON-LD object to expand." },
			],
			{ type: "Promise<object[]>" }
		), ( done:DoneFn ):void => {
			expect( JSONLDProcessor.expand ).toBeDefined();
			expect( Utils.isFunction( JSONLDProcessor.expand ) ).toBe( true );

			function jsonldExpand( object:Object ):Promise<Object> {
				return new Promise<Object>( ( resolve:Function, reject:Function ) => {
					jsonld.expand( <any>object, ( error, expanded ) => {
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
				let myExpandPromise:Promise<Object> = JSONLDProcessor.expand( object );

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
				{
					"@context": {
						"ex": "http://example.com/vocab/",
						"@language": "ja",
						"name": { "@id": "ex:name", "@language": null },
						"occupation": { "@id": "ex:occupation" },
						"occupation_en": { "@id": "ex:occupation", "@language": "en" },
						"occupation_cs": { "@id": "ex:occupation", "@language": "cs" },
					},
					"name": "Yagyū Muneyoshi",
					"occupation": "忍者",
					"occupation_cs": "Nindža",
					"occupation_en": "Ninja",
				},
				{
					"@context": {
						"@vocab": "http://example.com/ns#",
					},
					"moreList": [
						{ "@list": [ 1, 2, 3 ] },
						{ "@list": [ 1, 2, 3 ] },
						{ "@value": "Another element" },
					],
				},
			];

			let promises:Promise<void>[] = [];
			for( let object of objects ) {
				promises.push( evaluateExpand( object ) );
			}

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

	} );

} );
