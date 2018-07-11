import { IllegalArgumentError } from "../../../Errors/IllegalArgumentError";
import {
	clazz,
	hasMethod,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "../../../test/JasmineExtender";
import * as Utils from "./../../../Utils";

import * as XSD from "./XSD";

describe( module(
	"carbonldp/RDF/Literal/Serializers/XSD"
), ():void => {

	it( isDefined(), ():void => {
		expect( XSD ).toBeDefined();
		expect( Utils.isObject( XSD ) ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.DateSerializer",
		"Class that can serialize a Date object into a string literal with format `YYYY-MM-DD`.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#dateSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.DateSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.DateSerializer ) ).toBe( true );

			let serializer:XSD.DateSerializer = new XSD.DateSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.DateSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns the string with format `YYYY-MM-DD`, of the Date object", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.DateSerializer = new XSD.DateSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			let date:Date = new Date( "05 October 2011 14:48 UTC" );
			expect( serializer.serialize( date ) ).toBe( "2011-10-05" );

			expect( serializer.serialize.bind( null, { another: "object", that: "is", not: "a Date" } ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "another object that: is not a Date" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "2011-10-05" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, null ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

	it( hasProperty(
		STATIC,
		"dateSerializer",
		"CarbonLDP.RDF.Literal.Serializers.DateSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.DateSerializer`."
	), ():void => {
		expect( XSD.dateSerializer ).toBeDefined();
		expect( XSD.dateSerializer instanceof XSD.DateSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.DateTimeSerializer",
		"Class that can serialize a Date object into a string ISO literal.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#dateTimeSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.DateTimeSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.DateTimeSerializer ) ).toBe( true );

			let serializer:XSD.DateTimeSerializer = new XSD.DateTimeSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.DateTimeSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns the simplified extended ISO format (ISO 8601) of the Date object.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.DateTimeSerializer = new XSD.DateTimeSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			let date:Date = new Date( "05 October 2011 14:48 UTC" );
			expect( serializer.serialize( date ) ).toBe( "2011-10-05T14:48:00.000Z" );

			expect( serializer.serialize.bind( null, { another: "object", that: "is", not: "a Date" } ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "another object that: is not a Date" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "2011-10-05T14:48:00.000Z" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, null ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

	it( hasProperty(
		STATIC,
		"dateTimeSerializer",
		"CarbonLDP.RDF.Literal.Serializers.DateTimeSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.DateTimeSerializer`."
	), ():void => {
		expect( XSD.dateTimeSerializer ).toBeDefined();
		expect( XSD.dateTimeSerializer instanceof XSD.DateTimeSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.TimeSerializer",
		"Class that can serialize a Date object into a literal string with format `HH:mm:ss.sssZ`.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#timeSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.TimeSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.TimeSerializer ) ).toBe( true );

			let serializer:XSD.TimeSerializer = new XSD.TimeSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.TimeSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns a string representing the Date object with format `HH:mm:ss.sssZ`.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.TimeSerializer = new XSD.TimeSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			let date:Date = new Date( "05 October 2011 14:48 UTC" );
			expect( serializer.serialize( date ) ).toBe( "14:48:00.000Z" );

			expect( serializer.serialize.bind( null, { another: "object", that: "is", not: "a Date" } ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "another object that: is not a Date" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "14:48:00.000Z" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, null ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

	it( hasProperty(
		STATIC,
		"timeSerializer",
		"CarbonLDP.RDF.Literal.Serializers.TimeSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.TimeSerializer`."
	), ():void => {
		expect( XSD.timeSerializer ).toBeDefined();
		expect( XSD.timeSerializer instanceof XSD.TimeSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.IntegerSerializer",
		"Class that can serialize any Number value to a string literal of an integer.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#integerSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.IntegerSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.IntegerSerializer ) ).toBe( true );

			let serializer:XSD.IntegerSerializer = new XSD.IntegerSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.IntegerSerializer ).toBe( true );
		} );

		it( "should overflow if larger than 2^32 - 1", ():void => {
			const serializer:XSD.IntegerSerializer = new XSD.IntegerSerializer();
			expect( serializer.serialize( Math.pow( 2, 32 ) ) ).not.toBe( "4294967296" );
			expect( serializer.serialize( Math.pow( 2, 40 ) ) ).not.toBe( "1099511627776" );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns a string representing a integer from the Number provided.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.IntegerSerializer = new XSD.IntegerSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
			expect( serializer.serialize( 100.123456789 ) ).toBe( "100" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "-100" );
			expect( serializer.serialize( 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( NaN ) ).toBe( "0" );
			expect( serializer.serialize( Infinity ) ).toBe( "0" );
			expect( serializer.serialize( - Infinity ) ).toBe( "0" );

			expect( serializer.serialize.bind( null, { another: "object", that: "is", not: "a Number" } ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "another object that: is not a Number" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "100.132" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, null ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

	it( hasProperty(
		STATIC,
		"integerSerializer",
		"CarbonLDP.RDF.Literal.Serializers.IntegerSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.IntegerSerializer`."
	), ():void => {
		expect( XSD.integerSerializer ).toBeDefined();
		expect( XSD.integerSerializer instanceof XSD.IntegerSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.UnsignedIntegerSerializer",
		"Class that can serialize any Number value to a string literal of an unsigned integer.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#unsignedIntegerSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.UnsignedIntegerSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.UnsignedIntegerSerializer ) ).toBe( true );

			let serializer:XSD.UnsignedIntegerSerializer = new XSD.UnsignedIntegerSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.UnsignedIntegerSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns a string representing an unsigned integer from the Number provided.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.UnsignedIntegerSerializer = new XSD.UnsignedIntegerSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "100" );
			expect( serializer.serialize( 100.123456789 ) ).toBe( "100" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "100" );
			expect( serializer.serialize( 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( NaN ) ).toBe( "0" );
			expect( serializer.serialize( Infinity ) ).toBe( "0" );
			expect( serializer.serialize( - Infinity ) ).toBe( "0" );

			expect( serializer.serialize.bind( null, { another: "object", that: "is", not: "a Number" } ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "another object that: is not a Number" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "100.132" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, null ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

	describe( "LongSerializer", ():void => {

		describe( "LongSerializer.serialize", ():void => {

			it( "should accept numbers larger than 2^32 - 1", ():void => {
				const serializer:XSD.LongSerializer = new XSD.LongSerializer();
				expect( serializer.serialize( Math.pow( 2, 32 ) ) ).toBe( "4294967296" );
				expect( serializer.serialize( - Math.pow( 2, 32 ) ) ).toBe( "-4294967296" );

				expect( serializer.serialize( Math.pow( 2, 40 ) ) ).toBe( "1099511627776" );
				expect( serializer.serialize( - Math.pow( 2, 40 ) ) ).toBe( "-1099511627776" );
			} );

			it( "should remove decimals", ():void => {
				const serializer:XSD.LongSerializer = new XSD.LongSerializer();
				expect( serializer.serialize( 4294967296.45 ) ).toBe( "4294967296" );
				expect( serializer.serialize( 1099511627776.7632 ) ).toBe( "1099511627776" );
			} );

		} );

	} );

	describe( "UnsignedLongSerializer", ():void => {

		describe( "UnsignedLongSerializer.serialize", ():void => {

			it( "should accept numbers larger than 2^32 - 1", ():void => {
				const serializer:XSD.UnsignedLongSerializer = new XSD.UnsignedLongSerializer();
				expect( serializer.serialize( Math.pow( 2, 32 ) ) ).toBe( "4294967296" );
				expect( serializer.serialize( - Math.pow( 2, 32 ) ) ).toBe( "4294967296" );

				expect( serializer.serialize( Math.pow( 2, 40 ) ) ).toBe( "1099511627776" );
				expect( serializer.serialize( - Math.pow( 2, 40 ) ) ).toBe( "1099511627776" );
			} );

			it( "should remove decimals", ():void => {
				const serializer:XSD.UnsignedLongSerializer = new XSD.UnsignedLongSerializer();
				expect( serializer.serialize( - 4294967296.45 ) ).toBe( "4294967296" );
				expect( serializer.serialize( - 1099511627776.7632 ) ).toBe( "1099511627776" );
			} );

		} );

	} );

	it( hasProperty(
		STATIC,
		"unsignedIntegerSerializer",
		"CarbonLDP.RDF.Literal.Serializers.UnsignedIntegerSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.UnsignedIntegerSerializer`."
	), ():void => {
		expect( XSD.unsignedIntegerSerializer ).toBeDefined();
		expect( XSD.unsignedIntegerSerializer instanceof XSD.UnsignedIntegerSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.FloatSerializer",
		"Class that can serialize any Number value to a string literal of float.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#floatSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.FloatSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.FloatSerializer ) ).toBe( true );

			let serializer:XSD.FloatSerializer = new XSD.FloatSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.FloatSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns a string representing a float from the Number provided.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.FloatSerializer = new XSD.FloatSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
			expect( serializer.serialize( 100.123456789 ) ).toBe( "100.123456789" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "-100.123456789" );
			expect( serializer.serialize( 0.123456789 ) ).toBe( "0.123456789" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "-0.123456789" );
			expect( serializer.serialize( NaN ) ).toBe( "NaN" );
			expect( serializer.serialize( Infinity ) ).toBe( "INF" );
			expect( serializer.serialize( - Infinity ) ).toBe( "-INF" );

			expect( serializer.serialize.bind( null, { another: "object", that: "is", not: "a Number" } ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "another object that: is not a Number" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, "100.132" ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, null ) ).toThrowError( IllegalArgumentError );
			expect( serializer.serialize.bind( null, undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

	it( hasProperty(
		STATIC,
		"floatSerializer",
		"CarbonLDP.RDF.Literal.Serializers.FloatSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.FloatSerializer`."
	), ():void => {
		expect( XSD.floatSerializer ).toBeDefined();
		expect( XSD.floatSerializer instanceof XSD.FloatSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.BooleanSerializer",
		"Class that can serialize any variable to a string literal representation its truth value.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#booleanSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.BooleanSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.BooleanSerializer ) ).toBe( true );

			let serializer:XSD.BooleanSerializer = new XSD.BooleanSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.BooleanSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns a string representing the truth value from the variable provided.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.BooleanSerializer = new XSD.BooleanSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			expect( serializer.serialize( true ) ).toBe( "true" );
			expect( serializer.serialize( 1 ) ).toBe( "true" );
			expect( serializer.serialize( 100 ) ).toBe( "true" );
			expect( serializer.serialize( - 100 ) ).toBe( "true" );
			expect( serializer.serialize( 100.123456789 ) ).toBe( "true" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "true" );
			expect( serializer.serialize( 0.123456789 ) ).toBe( "true" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "true" );
			expect( serializer.serialize( Infinity ) ).toBe( "true" );
			expect( serializer.serialize( - Infinity ) ).toBe( "true" );
			expect( serializer.serialize( { another: "object", that: "is", not: "a Boolean" } ) ).toBe( "true" );
			expect( serializer.serialize( "another object that: is not a Boolean" ) ).toBe( "true" );
			expect( serializer.serialize( {} ) ).toBe( "true" );
			expect( serializer.serialize( [] ) ).toBe( "true" );

			expect( serializer.serialize( - 0 ) ).toBe( "false" );
			expect( serializer.serialize( 0 ) ).toBe( "false" );
			expect( serializer.serialize( null ) ).toBe( "false" );
			expect( serializer.serialize( undefined ) ).toBe( "false" );
			expect( serializer.serialize( "" ) ).toBe( "false" );
			expect( serializer.serialize( NaN ) ).toBe( "false" );
			expect( serializer.serialize( false ) ).toBe( "false" );
		} );

	} );

	it( hasProperty(
		STATIC,
		"booleanSerializer",
		"CarbonLDP.RDF.Literal.Serializers.BooleanSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.BooleanSerializer`"
	), ():void => {
		expect( XSD.booleanSerializer ).toBeDefined();
		expect( XSD.booleanSerializer instanceof XSD.BooleanSerializer ).toBe( true );
	} );

	describe( clazz(
		"CarbonLDP.RDF.Literal.Serializers.StringSerializer",
		"Class that can serialize any variable to a string literal representation its truth value.\n" +
		"Instead of instantiating this class, use the already exposed instance `carbonldp/RDF/Literal/Serializes/XSD#stringSerializer`."
	), ():void => {

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( XSD.StringSerializer ).toBeDefined();
			expect( Utils.isFunction( XSD.StringSerializer ) ).toBe( true );

			let serializer:XSD.StringSerializer = new XSD.StringSerializer();
			expect( serializer ).toBeTruthy();
			expect( serializer instanceof XSD.StringSerializer ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"serialize",
			"Returns a string representing the truth value from the variable provided.", [
				{ name: "value", type: "any" },
			],
			{ type: "string" }
		), ():void => {
			let serializer:XSD.StringSerializer = new XSD.StringSerializer();

			expect( serializer.serialize ).toBeDefined();
			expect( Utils.isFunction( serializer.serialize ) ).toBe( true );

			expect( serializer.serialize( - 0.0 ) ).toBe( "0" );
			expect( serializer.serialize( 0.0 ) ).toBe( "0" );
			expect( serializer.serialize( 1 ) ).toBe( "1" );
			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
			expect( serializer.serialize( 100.123456789 ) ).toBe( "100.123456789" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "-100.123456789" );
			expect( serializer.serialize( NaN ) ).toBe( "NaN" );
			expect( serializer.serialize( Infinity ) ).toBe( "Infinity" );
			expect( serializer.serialize( - Infinity ) ).toBe( "-Infinity" );
			expect( serializer.serialize( { an: "object" } ) ).toBe( "[object Object]" );
			expect( serializer.serialize( [ "an", "array" ] ) ).toBe( "an,array" );
			expect( serializer.serialize( "a string" ) ).toBe( "a string" );
			expect( serializer.serialize( "" ) ).toBe( "" );
			expect( serializer.serialize( true ) ).toBe( "true" );
			expect( serializer.serialize( false ) ).toBe( "false" );
			expect( serializer.serialize( function():string { return "some"; } ) ).toMatch( /function[^]*return.*some/ );
			expect( serializer.serialize( undefined ) ).toBe( "undefined" );
			expect( serializer.serialize( null ) ).toBe( "null" );
		} );

	} );

	it( hasProperty(
		STATIC,
		"stringSerializer",
		"CarbonLDP.RDF.Literal.Serializers.StringSerializer",
		"The already exposed instance of the class `CarbonLDP.RDF.Literal.Serializers.StringSerializer`."
	), ():void => {
		expect( XSD.stringSerializer ).toBeDefined();
		expect( XSD.stringSerializer instanceof XSD.StringSerializer ).toBe( true );
	} );

} );
