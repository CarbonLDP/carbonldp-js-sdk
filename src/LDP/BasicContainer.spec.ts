import {
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasProperty,
	hasMethod,
	hasSignature
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Document from "./../Document";

import * as BasicContainer from "./BasicContainer";

describe( module( "Carbon/LDP/BasicContainer" ), ():void => {

	it( isDefined(), ():void => {
		expect( BasicContainer ).toBeDefined();
		expect( Utils.isObject( BasicContainer ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( BasicContainer.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( BasicContainer.RDF_CLASS ) ).toBe( true );

		expect( BasicContainer.RDF_CLASS ).toBe( NS.LDP.Class.BasicContainer );
	});

	describe( clazz(
		"Carbon.LDP.BasicContainer.Factory",
		"Factory class for `Carbon.LDP.BasicContainer.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( BasicContainer.Factory ).toBeDefined();
			expect( Utils.isFunction( BasicContainer.Factory ) ).toBe( true );
		});

		describe( method(
			STATIC,
			"hasRDFClass"
		), ():void => {

			it( hasSignature(
				"Returns true if the Pointer provided has the type of a BasicContainer.", [
					{ name: "pointer", type: "Carbon.Pointer.Class" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( BasicContainer.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( BasicContainer.Factory.hasRDFClass ) ).toBe( true );

				let pointer:Pointer.Class;

				pointer = Document.Factory.create();
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.DirectContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.IndirectContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.DirectContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.IndirectContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );


				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.BasicContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.BasicContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( true );

				pointer = Document.Factory.create();
				pointer.id = "http://example.com/resource/";
				(<Document.Class> pointer).types.push( NS.LDP.Class.RDFSource );
				(<Document.Class> pointer).types.push( NS.LDP.Class.Container );
				(<Document.Class> pointer).types.push( NS.LDP.Class.BasicContainer );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( true );


				pointer = Pointer.Factory.create( "http://example.com/resource/#pointer" );
				expect( BasicContainer.Factory.hasRDFClass( pointer ) ).toBe( false );
			});

			it( hasSignature(
				"Returns true if the Pointer provided has the type of a BasicContainer.", [
					{ name: "pointer", type: "Carbon.Pointer.Class" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( BasicContainer.Factory.hasRDFClass ).toBeDefined();
				expect( Utils.isFunction( BasicContainer.Factory.hasRDFClass ) ).toBe( true );

				let object:Object;

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( true );

				object = {
					"@id": "http://example.com/resource/",
					"@type": [
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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( true );

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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( true );


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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( false );

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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( false );

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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( false );

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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( false );


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
				expect( BasicContainer.Factory.hasRDFClass( object ) ).toBe( false );

				expect( BasicContainer.Factory.hasRDFClass( {} ) ).toBe( false );
			});

		});

	});

});
