import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as XSD from "./XSD";

describe( module(
	"Carbon/Vocabularies/XSD"
), ():void => {

	it( isDefined(), ():void => {
		expect( XSD ).toBeDefined();
		expect( Utils.isObject( XSD ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( XSD.namespace ).toBeDefined();
		expect( Utils.isString( XSD.namespace ) ).toBe( true );

		expect( XSD.namespace ).toBe( "http://www.w3.org/2001/XMLSchema#" )
	} );

	describe( clazz(
		"Carbon.NS.XSD.DataType",
		"DataType that contains data-types defined in the XML Schema Definition Language (XSD)."
	), ():void => {

		it( isDefined(), ():void => {
			expect( XSD.DataType ).toBeDefined();
			expect( Utils.isFunction( XSD.DataType ) ).toBe( true );
			expect( Object.keys( XSD.DataType ).length ).toBe( 28 * 2 );
		} );

		it( hasProperty(
			STATIC,
			"date",
			"string"
		), ():void => {
			expect( XSD.DataType.date ).toBeDefined();
			expect( Utils.isString( XSD.DataType.date ) ).toBe( true );

			expect( XSD.DataType.date ).toBe( "http://www.w3.org/2001/XMLSchema#date" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#date",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#date" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#date" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#date" ] ).toBe( "date" );
		} );

		it( hasProperty(
			STATIC,
			"dateTime",
			"string"
		), ():void => {
			expect( XSD.DataType.dateTime ).toBeDefined();
			expect( Utils.isString( XSD.DataType.dateTime ) ).toBe( true );

			expect( XSD.DataType.dateTime ).toBe( "http://www.w3.org/2001/XMLSchema#dateTime" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#dateTime",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#dateTime" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#dateTime" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#dateTime" ] ).toBe( "dateTime" );
		} );

		it( hasProperty(
			STATIC,
			"duration",
			"string"
		), ():void => {
			expect( XSD.DataType.duration ).toBeDefined();
			expect( Utils.isString( XSD.DataType.duration ) ).toBe( true );

			expect( XSD.DataType.duration ).toBe( "http://www.w3.org/2001/XMLSchema#duration" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#duration",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#duration" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#duration" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#duration" ] ).toBe( "duration" );
		} );

		it( hasProperty(
			STATIC,
			"gDay",
			"string"
		), ():void => {
			expect( XSD.DataType.gDay ).toBeDefined();
			expect( Utils.isString( XSD.DataType.gDay ) ).toBe( true );

			expect( XSD.DataType.gDay ).toBe( "http://www.w3.org/2001/XMLSchema#gDay" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#gDay",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gDay" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gDay" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gDay" ] ).toBe( "gDay" );
		} );

		it( hasProperty(
			STATIC,
			"gMonth",
			"string"
		), ():void => {
			expect( XSD.DataType.gMonth ).toBeDefined();
			expect( Utils.isString( XSD.DataType.gMonth ) ).toBe( true );

			expect( XSD.DataType.gMonth ).toBe( "http://www.w3.org/2001/XMLSchema#gMonth" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#gMonth",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gMonth" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gMonth" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gMonth" ] ).toBe( "gMonth" );
		} );

		it( hasProperty(
			STATIC,
			"gMonthDay",
			"string"
		), ():void => {
			expect( XSD.DataType.gMonthDay ).toBeDefined();
			expect( Utils.isString( XSD.DataType.gMonthDay ) ).toBe( true );

			expect( XSD.DataType.gMonthDay ).toBe( "http://www.w3.org/2001/XMLSchema#gMonthDay" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#gMonthDay",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gMonthDay" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gMonthDay" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gMonthDay" ] ).toBe( "gMonthDay" );
		} );

		it( hasProperty(
			STATIC,
			"gYear",
			"string"
		), ():void => {
			expect( XSD.DataType.gYear ).toBeDefined();
			expect( Utils.isString( XSD.DataType.gYear ) ).toBe( true );

			expect( XSD.DataType.gYear ).toBe( "http://www.w3.org/2001/XMLSchema#gYear" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#gYear",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gYear" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gYear" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gYear" ] ).toBe( "gYear" );
		} );

		it( hasProperty(
			STATIC,
			"gYearMonth",
			"string"
		), ():void => {
			expect( XSD.DataType.gYearMonth ).toBeDefined();
			expect( Utils.isString( XSD.DataType.gYearMonth ) ).toBe( true );

			expect( XSD.DataType.gYearMonth ).toBe( "http://www.w3.org/2001/XMLSchema#gYearMonth" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#gYearMonth",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gYearMonth" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gYearMonth" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#gYearMonth" ] ).toBe( "gYearMonth" );
		} );

		it( hasProperty(
			STATIC,
			"time",
			"string"
		), ():void => {
			expect( XSD.DataType.time ).toBeDefined();
			expect( Utils.isString( XSD.DataType.time ) ).toBe( true );

			expect( XSD.DataType.time ).toBe( "http://www.w3.org/2001/XMLSchema#time" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#time",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#time" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#time" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#time" ] ).toBe( "time" );
		} );

		it( hasProperty(
			STATIC,
			"byte",
			"string"
		), ():void => {
			expect( XSD.DataType.byte ).toBeDefined();
			expect( Utils.isString( XSD.DataType.byte ) ).toBe( true );

			expect( XSD.DataType.byte ).toBe( "http://www.w3.org/2001/XMLSchema#byte" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#byte",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#byte" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#byte" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#byte" ] ).toBe( "byte" );
		} );

		it( hasProperty(
			STATIC,
			"decimal",
			"string"
		), ():void => {
			expect( XSD.DataType.decimal ).toBeDefined();
			expect( Utils.isString( XSD.DataType.decimal ) ).toBe( true );

			expect( XSD.DataType.decimal ).toBe( "http://www.w3.org/2001/XMLSchema#decimal" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#decimal",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#decimal" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#decimal" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#decimal" ] ).toBe( "decimal" );
		} );

		it( hasProperty(
			STATIC,
			"int",
			"string"
		), ():void => {
			expect( XSD.DataType.int ).toBeDefined();
			expect( Utils.isString( XSD.DataType.int ) ).toBe( true );

			expect( XSD.DataType.int ).toBe( "http://www.w3.org/2001/XMLSchema#int" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#int",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#int" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#int" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#int" ] ).toBe( "int" );
		} );

		it( hasProperty(
			STATIC,
			"integer",
			"string"
		), ():void => {
			expect( XSD.DataType.integer ).toBeDefined();
			expect( Utils.isString( XSD.DataType.integer ) ).toBe( true );

			expect( XSD.DataType.integer ).toBe( "http://www.w3.org/2001/XMLSchema#integer" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#integer",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#integer" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#integer" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#integer" ] ).toBe( "integer" );
		} );

		it( hasProperty(
			STATIC,
			"long",
			"string"
		), ():void => {
			expect( XSD.DataType.long ).toBeDefined();
			expect( Utils.isString( XSD.DataType.long ) ).toBe( true );

			expect( XSD.DataType.long ).toBe( "http://www.w3.org/2001/XMLSchema#long" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#long",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#long" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#long" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#long" ] ).toBe( "long" );
		} );

		it( hasProperty(
			STATIC,
			"negativeInteger",
			"string"
		), ():void => {
			expect( XSD.DataType.negativeInteger ).toBeDefined();
			expect( Utils.isString( XSD.DataType.negativeInteger ) ).toBe( true );

			expect( XSD.DataType.negativeInteger ).toBe( "http://www.w3.org/2001/XMLSchema#negativeInteger" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#negativeInteger",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#negativeInteger" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#negativeInteger" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#negativeInteger" ] ).toBe( "negativeInteger" );
		} );

		it( hasProperty(
			STATIC,
			"nonNegativeInteger",
			"string"
		), ():void => {
			expect( XSD.DataType.nonNegativeInteger ).toBeDefined();
			expect( Utils.isString( XSD.DataType.nonNegativeInteger ) ).toBe( true );

			expect( XSD.DataType.nonNegativeInteger ).toBe( "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" ] ).toBe( "nonNegativeInteger" );
		} );

		it( hasProperty(
			STATIC,
			"nonPositiveInteger",
			"string"
		), ():void => {
			expect( XSD.DataType.nonPositiveInteger ).toBeDefined();
			expect( Utils.isString( XSD.DataType.nonPositiveInteger ) ).toBe( true );

			expect( XSD.DataType.nonPositiveInteger ).toBe( "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#nonPositiveInteger",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" ] ).toBe( "nonPositiveInteger" );
		} );

		it( hasProperty(
			STATIC,
			"positiveInteger",
			"string"
		), ():void => {
			expect( XSD.DataType.positiveInteger ).toBeDefined();
			expect( Utils.isString( XSD.DataType.positiveInteger ) ).toBe( true );

			expect( XSD.DataType.positiveInteger ).toBe( "http://www.w3.org/2001/XMLSchema#positiveInteger" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#positiveInteger",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#positiveInteger" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#positiveInteger" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#positiveInteger" ] ).toBe( "positiveInteger" );
		} );

		it( hasProperty(
			STATIC,
			"short",
			"string"
		), ():void => {
			expect( XSD.DataType.short ).toBeDefined();
			expect( Utils.isString( XSD.DataType.short ) ).toBe( true );

			expect( XSD.DataType.short ).toBe( "http://www.w3.org/2001/XMLSchema#short" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#short",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#short" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#short" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#short" ] ).toBe( "short" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedLong",
			"string"
		), ():void => {
			expect( XSD.DataType.unsignedLong ).toBeDefined();
			expect( Utils.isString( XSD.DataType.unsignedLong ) ).toBe( true );

			expect( XSD.DataType.unsignedLong ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedLong" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#unsignedLong",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedLong" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedLong" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedLong" ] ).toBe( "unsignedLong" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedInt",
			"string"
		), ():void => {
			expect( XSD.DataType.unsignedInt ).toBeDefined();
			expect( Utils.isString( XSD.DataType.unsignedInt ) ).toBe( true );

			expect( XSD.DataType.unsignedInt ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedInt" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#unsignedInt",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedInt" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedInt" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedInt" ] ).toBe( "unsignedInt" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedShort",
			"string"
		), ():void => {
			expect( XSD.DataType.unsignedShort ).toBeDefined();
			expect( Utils.isString( XSD.DataType.unsignedShort ) ).toBe( true );

			expect( XSD.DataType.unsignedShort ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedShort" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#unsignedShort",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedShort" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedShort" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedShort" ] ).toBe( "unsignedShort" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedByte",
			"string"
		), ():void => {
			expect( XSD.DataType.unsignedByte ).toBeDefined();
			expect( Utils.isString( XSD.DataType.unsignedByte ) ).toBe( true );

			expect( XSD.DataType.unsignedByte ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedByte" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#unsignedByte",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedByte" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedByte" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#unsignedByte" ] ).toBe( "unsignedByte" );
		} );

		it( hasProperty(
			STATIC,
			"double",
			"string"
		), ():void => {
			expect( XSD.DataType.double ).toBeDefined();
			expect( Utils.isString( XSD.DataType.double ) ).toBe( true );

			expect( XSD.DataType.double ).toBe( "http://www.w3.org/2001/XMLSchema#double" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#double",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#double" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#double" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#double" ] ).toBe( "double" );
		} );

		it( hasProperty(
			STATIC,
			"float",
			"string"
		), ():void => {
			expect( XSD.DataType.float ).toBeDefined();
			expect( Utils.isString( XSD.DataType.float ) ).toBe( true );

			expect( XSD.DataType.float ).toBe( "http://www.w3.org/2001/XMLSchema#float" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#float",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#float" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#float" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#float" ] ).toBe( "float" );
		} );

		it( hasProperty(
			STATIC,
			"boolean",
			"string"
		), ():void => {
			expect( XSD.DataType.boolean ).toBeDefined();
			expect( Utils.isString( XSD.DataType.boolean ) ).toBe( true );

			expect( XSD.DataType.boolean ).toBe( "http://www.w3.org/2001/XMLSchema#boolean" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#boolean",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#boolean" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#boolean" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#boolean" ] ).toBe( "boolean" );
		} );

		it( hasProperty(
			STATIC,
			"string",
			"string"
		), ():void => {
			expect( XSD.DataType.string ).toBeDefined();
			expect( Utils.isString( XSD.DataType.string ) ).toBe( true );

			expect( XSD.DataType.string ).toBe( "http://www.w3.org/2001/XMLSchema#string" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#string",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#string" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#string" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#string" ] ).toBe( "string" );
		} );

		it( hasProperty(
			STATIC,
			"object",
			"string"
		), ():void => {
			expect( XSD.DataType.object ).toBeDefined();
			expect( Utils.isString( XSD.DataType.object ) ).toBe( true );

			expect( XSD.DataType.object ).toBe( "http://www.w3.org/2001/XMLSchema#object" );
		} );

		it( hasProperty(
			STATIC,
			"http://www.w3.org/2001/XMLSchema#object",
			"string"
		), ():void => {
			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#object" ] ).toBeDefined();
			expect( Utils.isString( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#object" ] ) ).toBe( true );

			expect( XSD.DataType[ "http://www.w3.org/2001/XMLSchema#object" ] ).toBe( "object" );
		} );

	} );

} );