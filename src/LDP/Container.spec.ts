/// <reference path="../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasProperty,
	hasMethod,
	hasSignature
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import * as NS from "../NS";
import * as Pointer from "../Pointer";
import * as Document from "../Document";

import * as Container from "./Container";

describe( module( "Carbon/LDP/Container" ), ():void => {

	it( isDefined(), ():void => {
		expect( Container ).toBeDefined();
		expect( Utils.isObject( Container ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Container.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Container.RDF_CLASS ) ).toBe( true );

		expect( Container.RDF_CLASS ).toBe( NS.LDP.Class.Container );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Container.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Container.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Container.SCHEMA, "contains" ) ).toBe( true );
		expect( Container.SCHEMA[ "contains" ] ).toEqual({
			"@id": NS.LDP.Predicate.contains,
			"@container": "@set",
			"@type": "@id"
		});

		expect( Utils.hasProperty( Container.SCHEMA, "members" ) ).toBe( true );
		expect( Container.SCHEMA[ "members" ] ).toEqual({
			"@id": NS.LDP.Predicate.member,
			"@container": "@set",
			"@type": "@id"
		});

		expect( Utils.hasProperty( Container.SCHEMA, "isMemberOfRelation" ) ).toBe( true );
		expect( Container.SCHEMA[ "isMemberOfRelation" ] ).toEqual({
			"@id": NS.LDP.Predicate.isMemberOfRelation,
			"@type": "@id"
		});

		expect( Utils.hasProperty( Container.SCHEMA, "hasMemberRelation" ) ).toBe( true );
		expect( Container.SCHEMA[ "hasMemberRelation" ] ).toEqual({
			"@id": NS.LDP.Predicate.hasMemberRelation,
			"@type": "@id"
		});

		expect( Utils.hasProperty( Container.SCHEMA, "insertedContentRelation" ) ).toBe( true );
		expect( Container.SCHEMA[ "insertedContentRelation" ] ).toEqual({
			"@id": NS.LDP.Predicate.insertedContentRelation,
			"@type": "@id"
		});
	});

	describe( clazz(
		"Carbon.LDP.Container.Factory",
		"Factory class for LDP Container objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Container.Factory ).toBeDefined();
			expect( Utils.isFunction( Container.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the properties to be defined as a LDP Container", [
				{ name: "resource", type: "Carbon.RDF.Node.Class" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Container.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Container.Factory.hasClassProperties ) ).toBe( true );

			let object:any;

			object = {
				hasMemberRelation: Pointer.Factory.create( "http://example.com/memberOf/" ),
				isMemberOfRelation: Pointer.Factory.create( "http://example.com/isAMemberOf/" )
			};
			expect( Container.Factory.hasClassProperties( object ) ).toBe( true );

			object = {
				hasMemberRelation: Pointer.Factory.create( "http://example.com/memberOf/" )
			};
			expect( Container.Factory.hasClassProperties( object ) ).toBe( false );
			object = {
				isMemberOfRelation: Pointer.Factory.create( "http://example.com/isAMemberOf/" )
			};
			expect( Container.Factory.hasClassProperties( object ) ).toBe( false );
		});

		describe( method(
			STATIC,
			"hasRDFClass"
		), ():void => {

			it( hasSignature(
				"Returns true if the Pointer provided is an LDP Container.", [
					{ name: "pointer", type: "Carbon.Pointer.Class" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( Container.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( Container.Factory.hasRDFClass ) ).toBe( true );

				let pointer:Pointer.Class;

				pointer = Document.Factory.create();
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.BasicContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.DirectContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.IndirectContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.BasicContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.DirectContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.IndirectContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.BasicContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.DirectContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create( "http://example.com/resource/" );
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.IndirectContainer );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Pointer.Factory.create( "http://example.com/resource/#pointer" );
				expect( Container.Factory.hasRDFClass( pointer ) ).toBe( false );
			});

			it( hasSignature(
				"Returns true if the Object provided is an LDP Container.", [
					{ name: "expandedObject", type: "Object" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( Container.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( Container.Factory.hasRDFClass ) ).toBe( true );

				let object:Object;

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#Container",
						"http://www.w3.org/ns/ldp#BasicContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#Container",
						"http://www.w3.org/ns/ldp#DirectContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#Container",
						"http://www.w3.org/ns/ldp#IndirectContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#BasicContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#DirectContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#IndirectContainer"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource",
						"http://www.w3.org/ns/ldp#Container"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
						"http://www.w3.org/ns/ldp#RDFSource"
					],
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( false );


				object = {
					"@id": "http://example.com/resource/",
					"http://example.com/ns#string": [{
						"@value": "a string"
					}],
					"http://example.com/ns#integer": [{
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer"
					}]
				};
				expect( Container.Factory.hasRDFClass( object ) ).toBe( false );

				expect( Container.Factory.hasRDFClass( {} ) ).toBe( false );
			});

		});

	});

});