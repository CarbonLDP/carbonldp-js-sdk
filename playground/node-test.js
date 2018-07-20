"use strict";

const Carbon = require( "../dist/Carbon" ).default;
const jsonld = require( "jsonld" );

function jsonldExpand( object ) {
	return new Promise( function ( resolve, reject ) {
		jsonld.expand( object, ( err, expanded ) => {
			if( err ) {
				reject( err );
			} else {
				resolve( expanded );
			}
		} );
	} );
}

function evalExpand( object ) {
	let libExpandPromise = jsonldExpand( object );
	let myExpandPromise = Carbon.JSONLD.Processor.Class.expand( object );

	return Promise.all( [ libExpandPromise, myExpandPromise ] ).then( ( expandObjects ) => {
		let libExpand = expandObjects[ 0 ];
		let myExpand = expandObjects[ 1 ];

		console.log( "\n\n<--- Objects expanded [Lib, My] --->" );
		console.log( Carbon.Utils.O.areEqual( libExpand, myExpand, { arrays:true, objects:true } ) );

		console.log( libExpand );
		console.log( myExpand );
	} );
}

let objects = [
	{
		"@context": {
			"@vocab": "http://example.com/ns#",
			"@base": "http://example.com/",
			"url": { "@type": "@id" }
		},
		"@type": "Person",
		"name": "Jane Doe",
		"jobTitle": "Professor",
		"telephone": "(425) 123-4567",
		"url": "http://www.janedoe.com"
	},
	{
		"@context": "http://schema.org/",
		"@type": "Person",
		"name": "Jane Doe",
		"jobTitle": "Professor",
		"telephone": "(425) 123-4567",
		"url": "http://www.janedoe.com"
	},
	{
		"@context": {
			"ical": "http://www.w3.org/2002/12/cal/ical#",
			"xsd": "http://www.w3.org/2001/XMLSchema#",
			"ical:dtstart": {
				"@type": "xsd:dateTime"
			}
		},
		"ical:summary": "Lady Gaga Concert",
		"ical:location": "New Orleans Arena, New Orleans, Louisiana, USA",
		"ical:dtstart": "2011-04-09T20:00Z"
	},
	{
		"@context": {
			"name": "http://schema.org/name",
			"description": "http://schema.org/description",
			"image": {
				"@id": "http://schema.org/image",
				"@type": "@id"
			},
			"geo": "http://schema.org/geo",
			"latitude": {
				"@id": "http://schema.org/latitude",
				"@type": "xsd:float"
			},
			"longitude": {
				"@id": "http://schema.org/longitude",
				"@type": "xsd:float"
			},
			"xsd": "http://www.w3.org/2001/XMLSchema#"
		},
		"name": "The Empire State Building",
		"description": "The Empire State Building is a 102-story landmark in New York City.",
		"image": "http://www.civil.usherbrooke.ca/cours/gci215a/empire-state-building.jpg",
		"geo": {
			"latitude": "40.75",
			"longitude": "73.98"
		}
	},
	{
		"@context": {
			"gr": "http://purl.org/goodrelations/v1#",
			"pto": "http://www.productontology.org/id/",
			"foaf": "http://xmlns.com/foaf/0.1/",
			"xsd": "http://www.w3.org/2001/XMLSchema#",
			"foaf:page": {
				"@type": "@id"
			},
			"gr:acceptedPaymentMethods": {
				"@type": "@id"
			},
			"gr:hasBusinessFunction": {
				"@type": "@id"
			},
			"gr:hasCurrencyValue": {
				"@type": "xsd:float"
			}
		},
		"@id": "http://example.org/cars/for-sale#tesla",
		"@type": "gr:Offering",
		"gr:name": "Used Tesla Roadster",
		"gr:description": "Need to sell fast and furiously",
		"gr:hasBusinessFunction": "gr:Sell",
		"gr:acceptedPaymentMethods": "gr:Cash",
		"gr:hasPriceSpecification": {
			"gr:hasCurrencyValue": "85000",
			"gr:hasCurrency": "USD"
		},
		"gr:includes": {
			"@type": [
				"gr:Individual",
				"pto:Vehicle"
			],
			"gr:name": "Tesla Roadster",
			"foaf:page": "http://www.teslamotors.com/roadster"
		}
	},
	{
		"@context": {
			"name": "http://rdf.data-vocabulary.org/#name",
			"ingredient": "http://rdf.data-vocabulary.org/#ingredients",
			"yield": "http://rdf.data-vocabulary.org/#yield",
			"instructions": "http://rdf.data-vocabulary.org/#instructions",
			"step": {
				"@id": "http://rdf.data-vocabulary.org/#step",
				"@type": "xsd:integer"
			},
			"description": "http://rdf.data-vocabulary.org/#description",
			"xsd": "http://www.w3.org/2001/XMLSchema#"
		},
		"name": "Mojito",
		"ingredient": [
			"12 fresh mint leaves",
			"1/2 lime, juiced with pulp",
			"1 tablespoons white sugar",
			"1 cup ice cubes",
			"2 fluid ounces white rum",
			"1/2 cup club soda"
		],
		"yield": "1 cocktail",
		"instructions": [
			{
				"step": 1,
				"description": "Crush lime juice, mint and sugar together in glass."
			},
			{
				"step": 2,
				"description": "Fill glass to top with ice cubes."
			},
			{
				"step": 3,
				"description": "Pour white rum over ice."
			},
			{
				"step": 4,
				"description": "Fill the rest of glass with club soda, stir."
			},
			{
				"step": 5,
				"description": "Garnish with a lime wedge."
			}
		]
	},
	{
		"@context": {
			"dc": "http://purl.org/dc/elements/1.1/",
			"ex": "http://example.org/vocab#",
			"xsd": "http://www.w3.org/2001/XMLSchema#",
			"ex:contains": {
				"@type": "@id"
			}
		},
		"@graph": [
			{
				"@id": "http://example.org/library",
				"@type": "ex:Library",
				"ex:contains": "http://example.org/library/the-republic"
			},
			{
				"@id": "http://example.org/library/the-republic",
				"@type": "ex:Book",
				"dc:creator": "Plato",
				"dc:title": "The Republic",
				"ex:contains": "http://example.org/library/the-republic#introduction"
			},
			{
				"@id": "http://example.org/library/the-republic#introduction",
				"@type": "ex:Chapter",
				"dc:description": "An introductory chapter on The Republic.",
				"dc:title": "The Introduction"
			}
		]
	},
	{
		"@context": "http://www.w3.org/ns/activitystreams",
		"@type": "Create",
		"actor": {
			"@type": "Person",
			"@id": "acct:sally@example.org",
			"displayName": "Sally"
		},
		"object": {
			"@type": "Note",
			"content": "This is a simple note"
		},
		"published": "2015-01-25T12:34:56Z"
	}
];

let promises = [];
for( let object of objects ) {
	promises.push( evalExpand( object ) );
}

Promise.all( promises ).then( () => {
	console.log( "Finish it" );
} ).catch( error => {
	console.error( error );
} );

return;

var carbon = new Carbon();
carbon.setSetting( "domain", "dev.carbonldp.com" );

carbon.extendObjectSchema( {
	"acl": "http://www.w3.org/ns/auth/acl#",
	"api": "http://purl.org/linked-data/api/vocab#",
	"c": "http://carbonldp.com/ns/v1/platform#",
	"cs": "http://carbonldp.com/ns/v1/security#",
	"cp": "http://carbonldp.com/ns/v1/patch#",
	"cc": "http://creativecommons.org/ns#",
	"cert": "http://www.w3.org/ns/auth/cert#",
	"dbp": "http://dbpedia.org/property/",
	"dc": "http://purl.org/dc/terms/",
	"doap": "http://usefulinc.com/ns/doap#",
	"example": "http://example.org/ns#",
	"ex": "http://example.org/ns#",
	"exif": "http://www.w3.org/2003/12/exif/ns#",
	"fn": "http://www.w3.org/2005/xpath-functions#",
	"foaf": "http://xmlns.com/foaf/0.1/",
	"geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
	"geonames": "http://www.geonames.org/ontology#",
	"gr": "http://purl.org/goodrelations/v1#",
	"http": "http://www.w3.org/2006/http#",
	"ldp": "http://www.w3.org/ns/ldp#",
	"log": "http://www.w3.org/2000/10/swap/log#",
	"owl": "http://www.w3.org/2002/07/owl#",
	"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
	"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
	"rei": "http://www.w3.org/2004/06/rei#",
	"rsa": "http://www.w3.org/ns/auth/rsa#",
	"rss": "http://purl.org/rss/1.0/",
	"sd": "http://www.w3.org/ns/sparql-service-description#",
	"sfn": "http://www.w3.org/ns/sparql#",
	"sioc": "http://rdfs.org/sioc/ns#",
	"skos": "http://www.w3.org/2004/02/skos/core#",
	"swrc": "http://swrc.ontoware.org/ontology#",
	"types": "http://rdfs.org/sioc/types#",
	"vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
	"wot": "http://xmlns.com/wot/0.1/",
	"xhtml": "http://www.w3.org/1999/xhtml#",
	"xsd": "http://www.w3.org/2001/XMLSchema#"
} );

carbon.extendObjectSchema( "http://example.org/ns#BlogPost" , {
	"title": {
		"@id": "ex:title",
		"@type": "xsd:string"
	},
	"tags": {
		"@id": "ex:tag",
		"@type": "@id",
		"@container": "@set"
	}
} );

var appContext;

console.log( "Authenticating..." );
carbon.auth.authenticate( "admin@carbonldp.com", "hello" ).then( function() {
	console.log( "Authenticated!" );
	console.log( "Getting context..." );
	return carbon.apps.getContext( "test-app/" );
}).then( function( _appContext ) {
	console.log( "Console received: {}", _appContext.app.id );
	appContext = _appContext;

	console.log( "Getting root container..." );
	return appContext.documents.get( "/" );
}).then( function( result ) {
	console.log( "Root container received" );
	console.log( result[0].id );
	process.exit();
}).catch( function( error ) {
	console.error( error );
	process.exit( 1 );
});