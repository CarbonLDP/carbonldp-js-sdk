import {
	hasProperty,
	module,
	namespaze,
	STATIC
} from "../test/JasmineExtender";

import { XSD } from "./XSD";

describe( module( "carbonldp/Vocabularies/XSD" ), ():void => {

	describe( namespaze( "CarbonLDP.Vocabularies.XSD", "Vocabulary that contains data-types defined in the XML Schema Definition Language (XSD)." ), ():void => {

		it( "should exists", ():void => {
			expect( XSD ).toBeDefined();
			expect( XSD ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( XSD ).length ).toBe( 29 );
		} );

		it( hasProperty(
			STATIC,
			"namespace",
			"string"
		), ():void => {
			expect( XSD.namespace ).toEqual( jasmine.any( String ) );
			expect( XSD.namespace ).toBe( "http://www.w3.org/2001/XMLSchema#" );
		} );

		it( hasProperty(
			STATIC,
			"date",
			"string"
		), ():void => {
			expect( XSD.date ).toEqual( jasmine.any( String ) );
			expect( XSD.date ).toBe( "http://www.w3.org/2001/XMLSchema#date" );
		} );

		it( hasProperty(
			STATIC,
			"dateTime",
			"string"
		), ():void => {
			expect( XSD.dateTime ).toEqual( jasmine.any( String ) );
			expect( XSD.dateTime ).toBe( "http://www.w3.org/2001/XMLSchema#dateTime" );
		} );

		it( hasProperty(
			STATIC,
			"duration",
			"string"
		), ():void => {
			expect( XSD.duration ).toEqual( jasmine.any( String ) );
			expect( XSD.duration ).toBe( "http://www.w3.org/2001/XMLSchema#duration" );
		} );

		it( hasProperty(
			STATIC,
			"gDay",
			"string"
		), ():void => {
			expect( XSD.gDay ).toEqual( jasmine.any( String ) );
			expect( XSD.gDay ).toBe( "http://www.w3.org/2001/XMLSchema#gDay" );
		} );

		it( hasProperty(
			STATIC,
			"gMonth",
			"string"
		), ():void => {
			expect( XSD.gMonth ).toEqual( jasmine.any( String ) );
			expect( XSD.gMonth ).toBe( "http://www.w3.org/2001/XMLSchema#gMonth" );
		} );

		it( hasProperty(
			STATIC,
			"gMonthDay",
			"string"
		), ():void => {
			expect( XSD.gMonthDay ).toEqual( jasmine.any( String ) );
			expect( XSD.gMonthDay ).toBe( "http://www.w3.org/2001/XMLSchema#gMonthDay" );
		} );

		it( hasProperty(
			STATIC,
			"gYear",
			"string"
		), ():void => {
			expect( XSD.gYear ).toEqual( jasmine.any( String ) );
			expect( XSD.gYear ).toBe( "http://www.w3.org/2001/XMLSchema#gYear" );
		} );

		it( hasProperty(
			STATIC,
			"gYearMonth",
			"string"
		), ():void => {
			expect( XSD.gYearMonth ).toEqual( jasmine.any( String ) );
			expect( XSD.gYearMonth ).toBe( "http://www.w3.org/2001/XMLSchema#gYearMonth" );
		} );

		it( hasProperty(
			STATIC,
			"time",
			"string"
		), ():void => {
			expect( XSD.time ).toEqual( jasmine.any( String ) );
			expect( XSD.time ).toBe( "http://www.w3.org/2001/XMLSchema#time" );
		} );

		it( hasProperty(
			STATIC,
			"byte",
			"string"
		), ():void => {
			expect( XSD.byte ).toEqual( jasmine.any( String ) );
			expect( XSD.byte ).toBe( "http://www.w3.org/2001/XMLSchema#byte" );
		} );

		it( hasProperty(
			STATIC,
			"decimal",
			"string"
		), ():void => {
			expect( XSD.decimal ).toEqual( jasmine.any( String ) );
			expect( XSD.decimal ).toBe( "http://www.w3.org/2001/XMLSchema#decimal" );
		} );

		it( hasProperty(
			STATIC,
			"int",
			"string"
		), ():void => {
			expect( XSD.int ).toEqual( jasmine.any( String ) );
			expect( XSD.int ).toBe( "http://www.w3.org/2001/XMLSchema#int" );
		} );

		it( hasProperty(
			STATIC,
			"integer",
			"string"
		), ():void => {
			expect( XSD.integer ).toEqual( jasmine.any( String ) );
			expect( XSD.integer ).toBe( "http://www.w3.org/2001/XMLSchema#integer" );
		} );

		it( hasProperty(
			STATIC,
			"long",
			"string"
		), ():void => {
			expect( XSD.long ).toEqual( jasmine.any( String ) );
			expect( XSD.long ).toBe( "http://www.w3.org/2001/XMLSchema#long" );
		} );

		it( hasProperty(
			STATIC,
			"negativeInteger",
			"string"
		), ():void => {
			expect( XSD.negativeInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.negativeInteger ).toBe( "http://www.w3.org/2001/XMLSchema#negativeInteger" );
		} );

		it( hasProperty(
			STATIC,
			"nonNegativeInteger",
			"string"
		), ():void => {
			expect( XSD.nonNegativeInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.nonNegativeInteger ).toBe( "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" );
		} );

		it( hasProperty(
			STATIC,
			"nonPositiveInteger",
			"string"
		), ():void => {
			expect( XSD.nonPositiveInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.nonPositiveInteger ).toBe( "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" );
		} );

		it( hasProperty(
			STATIC,
			"positiveInteger",
			"string"
		), ():void => {
			expect( XSD.positiveInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.positiveInteger ).toBe( "http://www.w3.org/2001/XMLSchema#positiveInteger" );
		} );

		it( hasProperty(
			STATIC,
			"short",
			"string"
		), ():void => {
			expect( XSD.short ).toEqual( jasmine.any( String ) );
			expect( XSD.short ).toBe( "http://www.w3.org/2001/XMLSchema#short" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedLong",
			"string"
		), ():void => {
			expect( XSD.unsignedLong ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedLong ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedLong" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedInt",
			"string"
		), ():void => {
			expect( XSD.unsignedInt ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedInt ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedInt" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedShort",
			"string"
		), ():void => {
			expect( XSD.unsignedShort ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedShort ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedShort" );
		} );

		it( hasProperty(
			STATIC,
			"unsignedByte",
			"string"
		), ():void => {
			expect( XSD.unsignedByte ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedByte ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedByte" );
		} );

		it( hasProperty(
			STATIC,
			"double",
			"string"
		), ():void => {
			expect( XSD.double ).toEqual( jasmine.any( String ) );
			expect( XSD.double ).toBe( "http://www.w3.org/2001/XMLSchema#double" );
		} );

		it( hasProperty(
			STATIC,
			"float",
			"string"
		), ():void => {
			expect( XSD.float ).toEqual( jasmine.any( String ) );
			expect( XSD.float ).toBe( "http://www.w3.org/2001/XMLSchema#float" );
		} );

		it( hasProperty(
			STATIC,
			"boolean",
			"string"
		), ():void => {
			expect( XSD.boolean ).toEqual( jasmine.any( String ) );
			expect( XSD.boolean ).toBe( "http://www.w3.org/2001/XMLSchema#boolean" );
		} );

		it( hasProperty(
			STATIC,
			"string",
			"string"
		), ():void => {
			expect( XSD.string ).toEqual( jasmine.any( String ) );
			expect( XSD.string ).toBe( "http://www.w3.org/2001/XMLSchema#string" );
		} );

		it( hasProperty(
			STATIC,
			"object",
			"string"
		), ():void => {
			expect( XSD.object ).toEqual( jasmine.any( String ) );
			expect( XSD.object ).toBe( "http://www.w3.org/2001/XMLSchema#object" );
		} );

	} );

} );
