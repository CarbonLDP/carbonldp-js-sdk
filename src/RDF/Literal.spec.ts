import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	reexports
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Errors from "./../Errors";
import * as XSD from "./../NS/XSD";

import Serializer from "./Literal/Serializer";
import * as Serializers from "./Literal/Serializers";

import * as Literal from "./Literal";

describe( module( "Carbon/RDF/Literal" ), ():void => {

	it( isDefined(), ():void => {
		expect( Literal ).toBeDefined();
		expect( Utils.isObject( Literal ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.RDF.Literal.Factory",
		"Class Factory to manage creation and management of Literal objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Literal.Factory ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"from",
			"Convert the value provided to a Literal object."
		), ():void => {
			expect( Literal.Factory.from ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.from ) ).toBe( true );

			let value:any;
			let literal:Literal.Class;

			value = new Date('05 October 2011 14:48 UTC');
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.dateTime );
			expect( literal[ "@value" ] ).toBe( "2011-10-05T14:48:00.000Z" );

			value = 100;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.integer );
			expect( literal[ "@value" ] ).toBe( "100" );
			value = -100;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.integer );
			expect( literal[ "@value" ] ).toBe( "-100" );
			value = 100.00;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.integer );
			expect( literal[ "@value" ] ).toBe( "100" );
			value = -100.00;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.integer );
			expect( literal[ "@value" ] ).toBe( "-100" );

			value = 100.987654321;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.double );
			expect( literal[ "@value" ] ).toBe( "100.987654321" );
			value = -100.987654321;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.double );
			expect( literal[ "@value" ] ).toBe( "-100.987654321" );
			value = NaN;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.double );
			expect( literal[ "@value" ] ).toBe( "NaN" );
			value = Infinity;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.double );
			expect( literal[ "@value" ] ).toBe( "Infinity" );
			value = -Infinity;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.double );
			expect( literal[ "@value" ] ).toBe( "-Infinity" );

			value = "a string";
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.string );
			expect( literal[ "@value" ] ).toBe( "a string" );
			value = "";
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.string );
			expect( literal[ "@value" ] ).toBe( "" );
			value = '{ "a": "string" }';
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.string );
			expect( literal[ "@value" ] ).toBe( '{ "a": "string" }' );

			value = true;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.boolean );
			expect( literal[ "@value" ] ).toBe( "true" );
			value = false;
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.boolean );
			expect( literal[ "@value" ] ).toBe( "false" );

			value = {};
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.object );
			expect( literal[ "@value" ] ).toBe( "{}" );
			value = [];
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.object );
			expect( literal[ "@value" ] ).toBe( "[]" );
			value = { a: "object" };
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.object );
			expect( literal[ "@value" ] ).toBe( '{"a":"object"}' );
			value = [ "a", "object", 1 ];
			literal = Literal.Factory.from( value );
			expect( Utils.hasProperty( literal, "@value" ) ).toBe( true );
			expect( Utils.hasProperty( literal, "@type" ) ).toBe( true );
			expect( literal[ "@type" ] ).toBe( XSD.DataType.object );
			expect( literal[ "@value" ] ).toBe( '["a","object",1]' );

			expect( Literal.Factory.from.bind( null, null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( Literal.Factory.from.bind( null, undefined ) ).toThrowError( Errors.IllegalArgumentError );
		});

		it( hasMethod(
			STATIC,
			"parse",
			"Parse the Literal object to the respective JavaScript type.\n" +
			"Returns null if cannot be parsed.", [
				{ name: "literal", type: "Carbon.RDF.Literal.Class" }
			],
			{ type: "any" }
		), ():void => {
			expect( Literal.Factory.parse ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.parse ) ).toBe( true );

			let literal:Literal.Class;
			let result:any;

			literal = <Literal.Class> new Object({ "@type": XSD.DataType.object });
			expect( Literal.Factory.parse( literal ) ).toBeNull();
			literal = <Literal.Class> new Object({ "@another": "property" });
			expect( Literal.Factory.parse( literal ) ).toBeNull();
			literal = <Literal.Class>{};
			expect( Literal.Factory.parse( literal ) ).toBeNull();
			expect( Literal.Factory.parse( null ) ).toBeNull();
			expect( Literal.Factory.parse( undefined ) ).toBeNull();

			literal = { "@value": "a string" };
			expect( Literal.Factory.parse( literal ) ).toBe( "a string" );
			literal = { "@value": "1" };
			expect( Literal.Factory.parse( literal ) ).toBe( "1" );
			literal = { "@value": "a string", "@type": XSD.DataType.string };
			expect( Literal.Factory.parse( literal ) ).toBe( "a string" );
			literal = { "@value": "true", "@type": XSD.DataType.string };
			expect( Literal.Factory.parse( literal ) ).toBe( "true" );

			literal = { "@value": "2011-10-05", "@type": XSD.DataType.date };
			result = <Date>Literal.Factory.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result.toISOString() ).toEqual( "2011-10-05T00:00:00.000Z" );
			literal = { "@value": "2011-10-05T14:48:00.000Z", "@type": XSD.DataType.dateTime };
			result = <Date>Literal.Factory.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			expect( result.toISOString() ).toEqual( "2011-10-05T14:48:00.000Z" );
			literal = { "@value": "14:48:00.000Z", "@type": XSD.DataType.time };
			result = <Date>Literal.Factory.parse( literal );
			expect( Utils.isDate( result ) ).toBe( true );
			result = result.toISOString().split( "T" )[ 1 ];
			expect( result ).toEqual( "14:48:00.000Z" );

			literal = { "@value": "100.00", "@type": XSD.DataType.byte };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.decimal };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.int };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.integer };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.long };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.negativeInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.nonNegativeInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.nonPositiveInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.positiveInteger };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.short };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.unsignedLong };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.unsignedInt };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.unsignedShort };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.unsignedByte };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "100.00", "@type": XSD.DataType.double };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );

			literal = { "@value": "100.00", "@type": XSD.DataType.float };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toEqual( 100 );
			literal = { "@value": "NaN", "@type": XSD.DataType.float };
			result = Literal.Factory.parse( literal );
			expect( Utils.isNumber( result ) ).toBe( true );
			expect( result ).toBeNaN();

			literal = { "@value": "true", "@type": XSD.DataType.boolean };
			result = Literal.Factory.parse( literal );
			expect( Utils.isBoolean( result ) ).toBe( true );
			expect( result ).toEqual( true );
			literal = { "@value": "false", "@type": XSD.DataType.boolean };
			result = Literal.Factory.parse( literal );
			expect( Utils.isBoolean( result ) ).toBe( true );
			expect( result ).toEqual( false );

			literal = { "@value": '{}', "@type": XSD.DataType.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( {} );
			literal = { "@value": '{ "a": "object" }', "@type": XSD.DataType.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isObject( result ) ).toBe( true );
			expect( result ).toEqual( { a: "object" } );
			literal = { "@value": '[]', "@type": XSD.DataType.object };
			result = Literal.Factory.parse( literal );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result ).toEqual( [] );
			literal = { "@value": '[ "a", "array" ]', "@type": XSD.DataType.object };
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
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided can be called a RDF Literal", [
				{ name: "value", type: "any" }
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
		});

		it( hasMethod(
			STATIC,
			"hasType",
			"Returns true if the Literal has the type indicated", [
				{ name: "value", type: "Carbon.RDF.Literal.Class" },
				{ name: "type", type: "string" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Literal.Factory.hasType ).toBeDefined();
			expect( Utils.isFunction( Literal.Factory.hasType ) ).toBe( true );

			expect( Literal.Factory.hasType( { "@value": "some" }, XSD.DataType.string ) ).toBe( true );
			expect( Literal.Factory.hasType( { "@value": "some" }, XSD.DataType.integer ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some" }, XSD.DataType.boolean ) ).toBe( false );

			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.date }, XSD.DataType.date ) ).toBe( true );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.dateTime }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.duration }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.gDay }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.gMonth }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.gMonthDay }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.gYear }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.gYearMonth }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.time }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.byte }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.decimal }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.int }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.integer }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.long }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.negativeInteger }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.nonNegativeInteger }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.nonPositiveInteger }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.positiveInteger }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.short }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.unsignedLong }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.unsignedInt }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.unsignedShort }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.unsignedByte }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.double }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.float }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.boolean }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.string }, XSD.DataType.date ) ).toBe( false );
			expect( Literal.Factory.hasType( { "@value": "some value", "@type": XSD.DataType.object }, XSD.DataType.date ) ).toBe( false );
		});

	});

	describe( clazz(
		"Carbon.RDF.Literal.Util",
		"Class with useful functions for manage RDF Literals"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Literal.Util ).toBeDefined();
			expect( Utils.isFunction( Literal.Util ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"areEqual",
			"Returns true if two Literals are equal", [
				{ name: "literal1", type: "Carbon.RDF.Literal.Class" },
				{ name: "literal2", type: "Carbon.RDF.Literal.Class" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( Literal.Util.areEqual ).toBeDefined();
			expect( Utils.isFunction( Literal.Util.areEqual ) ).toBe( true );

			// TODO wait implementation
		});

	});

	it( reexports(
		STATIC,
		"serializer",
		"Carbon/RDF/Literal/Serializers"
	), ():void => {
		expect( Literal.Serializers ).toBeDefined();
		expect( Literal.Serializers ).toBe( Serializers );
	});

});