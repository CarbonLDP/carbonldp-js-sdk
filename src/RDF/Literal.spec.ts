import {
	STATIC,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	reexports,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Errors from "../Errors";
import { XSD } from "../Vocabularies/XSD";

import Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";

import * as Literal from "./Literal";
import DefaultExport from "./Literal";

describe( module( "Carbon/RDF/Literal" ), ():void => {

	it( isDefined(), ():void => {
		expect( Literal ).toBeDefined();
		expect( Utils.isObject( Literal ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.RDF.Literal.Class",
		"Interface that represents an `rdf:Literal`."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@type",
			"string",
			"The URI of the XSD type of the literal."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"@value",
			"string",
			"The actual string value if the literal."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RDF.Literal.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Literal.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.RDF.Literal.Factory",
		"Factory class for `Carbon.RDF.Literal.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Literal.Factory ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"from",
			"Convert the value provided to a `Carbon.RDF.Literal.Class` object."
		), ():void => {
			expect( Literal.Factory.from ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.from ) ).toBe( true );

			let value:any;
			let literal:Literal.Class;

			value = new Date( "05 October 2011 14:48 UTC" );
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.dateTime );
			expect( literal[ "@value" ] ).toBe( "2011-10-05T14:48:00.000Z" );

			value = 100;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "100" );
			value = - 100;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "-100" );
			value = 100.00;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "100" );
			value = - 100.00;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "-100" );

			value = 100.987654321;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "100.987654321" );
			value = - 100.987654321;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "-100.987654321" );
			value = NaN;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "NaN" );
			value = Infinity;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "Infinity" );
			value = - Infinity;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "-Infinity" );

			value = "a string";
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.string );
			expect( literal[ "@value" ] ).toBe( "a string" );
			value = "";
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.string );
			expect( literal[ "@value" ] ).toBe( "" );
			value = '{ "a": "string" }';
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.string );
			expect( literal[ "@value" ] ).toBe( '{ "a": "string" }' );

			value = true;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.boolean );
			expect( literal[ "@value" ] ).toBe( "true" );
			value = false;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.boolean );
			expect( literal[ "@value" ] ).toBe( "false" );

			value = {};
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( "{}" );
			value = [];
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( "[]" );
			value = { a: "object" };
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( '{"a":"object"}' );
			value = [ "a", "object", 1 ];
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( '["a","object",1]' );

			expect( Literal.Factory.from.bind( null, null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( Literal.Factory.from.bind( null, undefined ) ).toThrowError( Errors.IllegalArgumentError );
		} );

		it( hasMethod(
			STATIC,
			"parse",
			"Parse the Literal object to the respective JavaScript type.\n" +
			"Returns `null` if the Literal can't be parsed.", [
				{ name: "literal", type: "Carbon.RDF.Literal.Class" },
			],
			{ type: "any" }
		), ():void => {
			expect( Literal.Factory.parse ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.parse ) ).toBe( true );

			let literal:Literal.Class;
			let result:any;

			literal = <Literal.Class> new Object( { "@type": XSD.object } );
			expect( Literal.Factory.parse( literal ) ).toBeNull();
			literal = <Literal.Class> new Object( { "@another": "property" } );
			expect( Literal.Factory.parse( literal ) ).toBeNull();
			literal = <Literal.Class>{};
			expect( Literal.Factory.parse( literal ) ).toBeNull();
			expect( Literal.Factory.parse( null ) ).toBeNull();
			expect( Literal.Factory.parse( undefined ) ).toBeNull();

			literal = { "@value": "a string" };
			expect( Literal.Factory.parse( literal ) ).toBe( "a string" );
			literal = { "@value": "1" };
			expect( Literal.Factory.parse( literal ) ).toBe( "1" );
			literal = { "@value": "a string", "@type": XSD.string };
			expect( Literal.Factory.parse( literal ) ).toBe( "a string" );
			literal = { "@value": "true", "@type": XSD.string };
			expect( Literal.Factory.parse( literal ) ).toBe( "true" );

			literal = { "@value": "2011-10-05", "@type": XSD.date };
			result = <Date>Literal.Factory.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result.toISOString() ).toEqual( "2011-10-05T00:00:00.000Z" );
			literal = { "@value": "2011-10-05T14:48:00.000Z", "@type": XSD.dateTime };
			result = <Date>Literal.Factory.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result.toISOString() ).toEqual( "2011-10-05T14:48:00.000Z" );
			literal = { "@value": "14:48:00.000Z", "@type": XSD.time };
			result = <Date>Literal.Factory.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			result = result.toISOString().split( "T" )[ 1 ];
			expect( result ).toEqual( "14:48:00.000Z" );

			literal = { "@value": "100.00", "@type": XSD.byte };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.decimal };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.int };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.integer };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.long };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.negativeInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.nonNegativeInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.nonPositiveInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.positiveInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.short };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedLong };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedInt };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedShort };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedByte };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.double };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );

			literal = { "@value": "100.00", "@type": XSD.float };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "NaN", "@type": XSD.float };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBeNaN();

			literal = { "@value": "true", "@type": XSD.boolean };
			result = Literal.Factory.parse( literal );
			expect( Utils.isBoolean( result ) ).toBe( true );
			expect( result ).toEqual( true );
			literal = { "@value": "false", "@type": XSD.boolean };
			result = Literal.Factory.parse( literal );
			expect( Utils.isBoolean( result ) ).toBe( true );
			expect( result ).toEqual( false );

			literal = { "@value": "{}", "@type": XSD.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );
			literal = { "@value": '{ "a": "object" }', "@type": XSD.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( { a: "object" } );
			literal = { "@value": "[]", "@type": XSD.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result ).toEqual( [] );
			literal = { "@value": '[ "a", "array" ]', "@type": XSD.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result ).toEqual( [ "a", "array" ] );

			// TODO wait implementation
			/*  - duration
			    - gDay
			    - gMoth
			    - gMonthDay
			    - gYear
			    - gYearMonth
			*/
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.RDF.Literal.Class` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Literal.Factory.is ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.is ) ).toBe( true );

			expect( Literal.Factory.is( {} ) ).toBe( false );
			expect( Literal.Factory.is( { "@type": "some" } ) ).toBe( false );
			expect( Literal.Factory.is( { "value": "some" } ) ).toBe( false );

			expect( Literal.Factory.is( { "@value": "some" } ) ).toBe( true );
			expect( Literal.Factory.is( { "@type": "some", "@value": "another" } ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasType",
			"Returns true if the Literal has the type specified.", [
				{ name: "value", type: "Carbon.RDF.Literal.Class" },
				{ name: "type", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Literal.Factory.hasType ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.hasType ) ).toBe( true );

			expect( Literal.Factory.hasType( { "@value": "some" }, XSD.string ) ).toBe( true );
			expect( Literal.Factory.hasType( { "@value": "some" }, XSD.integer ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some" }, XSD.boolean ) ).toBe( false );

			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.date }, XSD.date ) ).toBe( true );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.dateTime }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.duration }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.gDay }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.gMonth }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.gMonthDay }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.gYear }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.gYearMonth }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.time }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.byte }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.decimal }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.int }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.integer }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.long }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.negativeInteger }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.nonNegativeInteger }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.nonPositiveInteger }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.positiveInteger }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.short }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.unsignedLong }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.unsignedInt }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.unsignedShort }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.unsignedByte }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.double }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.float }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.boolean }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.string }, XSD.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.object }, XSD.date ) ).toBe( false );
		} );

	} );

	it( reexports(
		STATIC,
		"Serializers",
		"Carbon/RDF/Literal/Serializers"
	), ():void => {
		expect( Literal.Serializers ).toBeDefined();
		expect( Literal.Serializers ).toBe( Serializers );
	} );

	it( reexports(
		STATIC,
		"Serializer",
		"Carbon/RDF/Literal/Serializer"
	), ():void => {
	} );

} );
