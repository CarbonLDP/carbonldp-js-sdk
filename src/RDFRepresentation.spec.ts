import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as PersistedDocument from "./PersistedDocument";
import AbstractContext from "./AbstractContext";

import * as RDFRepresentation from "./RDFRepresentation";

describe( module( "Carbon/RDFRepresentation" ), ():void => {

	it( isDefined(), ():void => {
		expect( RDFRepresentation ).toBeDefined();
		expect( Utils.isObject( RDFRepresentation ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( RDFRepresentation.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( RDFRepresentation.RDF_CLASS ) ).toBe( true );

		expect( RDFRepresentation.RDF_CLASS ).toBe( NS.C.Class.RDFRepresentation );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( RDFRepresentation.SCHEMA ).toBeDefined();
		expect( Utils.isObject( RDFRepresentation.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( RDFRepresentation.SCHEMA, "mediaType" ) ).toBe( true );
		expect( RDFRepresentation.SCHEMA[ "mediaType" ] ).toEqual( {
			"@id": NS.C.Predicate.mediaType,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( RDFRepresentation.SCHEMA, "size" ) ).toBe( true );
		expect( RDFRepresentation.SCHEMA[ "size" ] ).toEqual( {
			"@id": NS.C.Predicate.size,
			"@type": NS.XSD.DataType.long,
		} );
	} );

	describe( clazz(
		"Carbon.RDFRepresentation.Factory",
		"Factory class for `Carbon.RDFRepresentation.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFRepresentation.Factory ).toBeDefined();
			expect( Utils.isFunction( RDFRepresentation.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.RDFRepresentation.Class` object", [
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFRepresentation.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( RDFRepresentation.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				mediaType: null,
				size: null,
			};
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.mediaType;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );
			object.mediaType = null;

			delete object.size;
			expect( RDFRepresentation.Factory.hasClassProperties( object ) ).toBe( false );
			object.size = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.NonRDFSource.Class` object", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( RDFRepresentation.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RDFRepresentation.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let context:AbstractContext = new MockedContext();

			object = PersistedDocument.Factory.create( "", context.documents );
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( RDFRepresentation.Factory.is( object ) ).toBe( false );
			object.types.push( RDFRepresentation.RDF_CLASS );
			expect( RDFRepresentation.Factory.is( object ) ).toBe( true );
		} );

	} );

} );
