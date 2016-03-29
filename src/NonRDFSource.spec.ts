import * as NonRDFSource from "./NonRDFSource";
import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as PersistedDocument from "./PersistedDocument";
import AbstractContext from "./AbstractContext";

describe( module( "Carbon/NonRDFSource" ), ():void => {

	it( isDefined(), ():void => {
		expect( NonRDFSource ).toBeDefined();
		expect( Utils.isObject( NonRDFSource ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( NonRDFSource.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( NonRDFSource.RDF_CLASS ) ).toBe( true );

		expect( NonRDFSource.RDF_CLASS ).toBe( NS.C.Class.RDFRepresentation );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( NonRDFSource.SCHEMA ).toBeDefined();
		expect( Utils.isObject( NonRDFSource.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( NonRDFSource.SCHEMA, "fileIdentifier" ) ).toBe( true );
		expect( NonRDFSource.SCHEMA[ "fileIdentifier" ] ).toEqual({
			"@id": NS.C.Predicate.fileIdentifier,
			"@type": NS.XSD.DataType.string
		});

		expect( Utils.hasProperty( NonRDFSource.SCHEMA, "mediaType" ) ).toBe( true );
		expect( NonRDFSource.SCHEMA[ "mediaType" ] ).toEqual({
			"@id": NS.C.Predicate.mediaType,
			"@type": NS.XSD.DataType.string
		});

		expect( Utils.hasProperty( NonRDFSource.SCHEMA, "size" ) ).toBe( true );
		expect( NonRDFSource.SCHEMA[ "size" ] ).toEqual({
			"@id": NS.C.Predicate.size,
			"@type": NS.XSD.DataType.long
		});
	});

	describe( clazz(
		"Carbon.NonRDFSource.Factory",
		"Factory class for `Carbon.NonRDFSource.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( NonRDFSource.Factory ).toBeDefined();
			expect( Utils.isFunction( NonRDFSource.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.NonRDFSource.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( NonRDFSource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( NonRDFSource.Factory.hasClassProperties ) ).toBe( true );

			let object:any = {};
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );

			object.fileIdentifier = "Identifier-of-the-file";
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( false );

			object.size = 1000;
			expect( NonRDFSource.Factory.hasClassProperties( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.NonRDFSource.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( NonRDFSource.Factory.is ).toBeDefined();
			expect( Utils.isFunction( NonRDFSource.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.fileIdentifier = "Identifier-of-the-file";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let context:AbstractContext = new MockedContext();

			object = PersistedDocument.Factory.create( "", context.documents );
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.fileIdentifier = "Identifier-of-the-file";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.mediaType = "application/pdf";
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.size = 1000;
			expect( NonRDFSource.Factory.is( object ) ).toBe( false );
			object.types.push( NonRDFSource.RDF_CLASS );
			expect( NonRDFSource.Factory.is( object ) ).toBe( true );
		});

	});

});
