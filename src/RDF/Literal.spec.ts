import * as Errors from "../Errors";
import {
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import * as Module from "./Literal";
import { RDFLiteral } from "./Literal";

import { Serializer } from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";

describe( module( "carbonldp/RDF/Literal" ), ():void => {

	describe( interfaze(
		"CarbonLDP.RDF.RDFLiteral",
		"Interface that represents an RDF Literal Value."
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

	describe( interfaze(
		"CarbonLDP.RDF.RDFLiteralFactory",
		"Interface with the factory and utils for `CarbonLDP.RDF.RDFLiteral` objects."
	), ():void => {

		it( hasMethod(
			STATIC,
			"from",
			"Convert the value provided to a `CarbonLDP.RDF.RDFLiteral` object."
		), ():void => {} );

		// TODO: Missing docs of second signature
		it( hasMethod(
			STATIC,
			"parse",
			"Parse the Literal object to the respective JavaScript type.\n" +
			"Returns `null` if the Literal can't be parsed.", [
				{ name: "literal", type: "CarbonLDP.RDF.RDFLiteral" },
			],
			{ type: "any" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.RDF.RDFLiteral` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.RDF.RDFLiteral" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"hasType",
			"Returns true if the Literal has the type specified.", [
				{ name: "value", type: "CarbonLDP.RDF.RDFLiteral" },
				{ name: "type", type: "string" },
			],
			{ type: "boolean" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"RDFLiteral",
		"CarbonLDP.RDF.RDFLiteralFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFLiteral ).toBeDefined();
			expect( RDFLiteral ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "RDFLiteral.from", ():void => {
			expect( RDFLiteral.from ).toBeDefined();
			expect( Utils.isFunction( RDFLiteral.from ) ).toBe( true );

			let value:any;
			let literal:RDFLiteral;

			value = new Date( "05 October 2011 14:48 UTC" );
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.dateTime );
			expect( literal[ "@value" ] ).toBe( "2011-10-05T14:48:00.000Z" );

			value = 100;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "100" );
			value = - 100;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "-100" );
			value = 100.00;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "100" );
			value = - 100.00;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.integer );
			expect( literal[ "@value" ] ).toBe( "-100" );

			value = 100.987654321;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "100.987654321" );
			value = - 100.987654321;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "-100.987654321" );
			value = NaN;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "NaN" );
			value = Infinity;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "Infinity" );
			value = - Infinity;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.double );
			expect( literal[ "@value" ] ).toBe( "-Infinity" );

			value = "a string";
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.string );
			expect( literal[ "@value" ] ).toBe( "a string" );
			value = "";
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.string );
			expect( literal[ "@value" ] ).toBe( "" );
			value = '{ "a": "string" }';
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.string );
			expect( literal[ "@value" ] ).toBe( '{ "a": "string" }' );

			value = true;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.boolean );
			expect( literal[ "@value" ] ).toBe( "true" );
			value = false;
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.boolean );
			expect( literal[ "@value" ] ).toBe( "false" );

			value = {};
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( "{}" );
			value = [];
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( "[]" );
			value = { a: "object" };
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( '{"a":"object"}' );
			value = [ "a", "object", 1 ];
			literal = RDFLiteral.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.object );
			expect( literal[ "@value" ] ).toBe( '["a","object",1]' );

			expect( RDFLiteral.from.bind( null, null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( RDFLiteral.from.bind( null, undefined ) ).toThrowError( Errors.IllegalArgumentError );
		} );

		// TODO: Separate in different tests
		it( "RDFLiteral.parse", ():void => {
			expect( RDFLiteral.parse ).toBeDefined();
			expect( Utils.isFunction( RDFLiteral.parse ) ).toBe( true );

			let literal:RDFLiteral;
			let result:any;

			literal = <RDFLiteral> new Object( { "@type": XSD.object } );
			expect( RDFLiteral.parse( literal ) ).toBeNull();
			literal = <RDFLiteral> new Object( { "@another": "property" } );
			expect( RDFLiteral.parse( literal ) ).toBeNull();
			literal = <RDFLiteral>{};
			expect( RDFLiteral.parse( literal ) ).toBeNull();
			expect( RDFLiteral.parse( null ) ).toBeNull();
			expect( RDFLiteral.parse( undefined ) ).toBeNull();

			literal = { "@value": "a string" };
			expect( RDFLiteral.parse( literal ) ).toBe( "a string" );
			literal = { "@value": "1" };
			expect( RDFLiteral.parse( literal ) ).toBe( "1" );
			literal = { "@value": "a string", "@type": XSD.string };
			expect( RDFLiteral.parse( literal ) ).toBe( "a string" );
			literal = { "@value": "true", "@type": XSD.string };
			expect( RDFLiteral.parse( literal ) ).toBe( "true" );

			literal = { "@value": "2011-10-05", "@type": XSD.date };
			result = <Date>RDFLiteral.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result.toISOString() ).toEqual( "2011-10-05T00:00:00.000Z" );
			literal = { "@value": "2011-10-05T14:48:00.000Z", "@type": XSD.dateTime };
			result = <Date>RDFLiteral.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result.toISOString() ).toEqual( "2011-10-05T14:48:00.000Z" );
			literal = { "@value": "14:48:00.000Z", "@type": XSD.time };
			result = <Date>RDFLiteral.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			result = result.toISOString().split( "T" )[ 1 ];
			expect( result ).toEqual( "14:48:00.000Z" );

			literal = { "@value": "100.00", "@type": XSD.byte };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.decimal };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.int };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.integer };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.long };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.negativeInteger };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.nonNegativeInteger };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.nonPositiveInteger };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.positiveInteger };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.short };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedLong };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedInt };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedShort };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.unsignedByte };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.double };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );

			literal = { "@value": "100.00", "@type": XSD.float };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "NaN", "@type": XSD.float };
			result = RDFLiteral.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBeNaN();

			literal = { "@value": "true", "@type": XSD.boolean };
			result = RDFLiteral.parse( literal );
			expect( Utils.isBoolean( result ) ).toBe( true );
			expect( result ).toEqual( true );
			literal = { "@value": "false", "@type": XSD.boolean };
			result = RDFLiteral.parse( literal );
			expect( Utils.isBoolean( result ) ).toBe( true );
			expect( result ).toEqual( false );

			literal = { "@value": "{}", "@type": XSD.object };
			result = RDFLiteral.parse( literal );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );
			literal = { "@value": '{ "a": "object" }', "@type": XSD.object };
			result = RDFLiteral.parse( literal );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( { a: "object" } );
			literal = { "@value": "[]", "@type": XSD.object };
			result = RDFLiteral.parse( literal );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result ).toEqual( [] );
			literal = { "@value": '[ "a", "array" ]', "@type": XSD.object };
			result = RDFLiteral.parse( literal );
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

		// TODO: Separate in different tests
		it( "RDFLiteral.is", ():void => {
			expect( RDFLiteral.is ).toBeDefined();
			expect( Utils.isFunction( RDFLiteral.is ) ).toBe( true );

			expect( RDFLiteral.is( {} ) ).toBe( false );
			expect( RDFLiteral.is( { "@type": "some" } ) ).toBe( false );
			expect( RDFLiteral.is( { "value": "some" } ) ).toBe( false );

			expect( RDFLiteral.is( { "@value": "some" } ) ).toBe( true );
			expect( RDFLiteral.is( { "@type": "some", "@value": "another" } ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "RDFLiteral.hasType", ():void => {
			expect( RDFLiteral.hasType ).toBeDefined();
			expect( Utils.isFunction( RDFLiteral.hasType ) ).toBe( true );

			expect( RDFLiteral.hasType( { "@value": "some" }, XSD.string ) ).toBe( true );
			expect( RDFLiteral.hasType( { "@value": "some" }, XSD.integer ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some" }, XSD.boolean ) ).toBe( false );

			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.date }, XSD.date ) ).toBe( true );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.dateTime }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.duration }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.gDay }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.gMonth }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.gMonthDay }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.gYear }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.gYearMonth }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.time }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.byte }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.decimal }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.int }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.integer }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.long }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.negativeInteger }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.nonNegativeInteger }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.nonPositiveInteger }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.positiveInteger }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.short }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.unsignedLong }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.unsignedInt }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.unsignedShort }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.unsignedByte }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.double }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.float }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.boolean }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.string }, XSD.date ) ).toBe( false );
			expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.object }, XSD.date ) ).toBe( false );
		} );

	} );

	it( reexports(
		STATIC,
		"Serializers",
		"carbonldp/RDF/Literal/Serializers"
	), ():void => {
		expect( Module.Serializers ).toBeDefined();
		expect( Module.Serializers ).toBe( Serializers );
	} );

	it( reexports(
		STATIC,
		"Serializer",
		"CarbonLDP.RDF.Literal.Serializer"
	), ():void => {
		const target:Module.Serializer = {} as Serializer;
		expect( target ).toBeDefined();
	} );

} );
