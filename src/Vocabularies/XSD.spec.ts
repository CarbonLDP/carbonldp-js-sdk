import { hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../test/JasmineExtender";

import { XSD } from "./XSD";


describe( module( "carbonldp/Vocabularies/XSD" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Vocabularies.XSD",
		"Interface that defined the used vocabulary of the data-types defined in the XML Schema Definition Language (XSD)."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"namespace",
			"string"
		), ():void => {
			const target:XSD[ "namespace" ] = "http://www.w3.org/2001/XMLSchema#";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"date",
			"string"
		), ():void => {
			const target:XSD[ "date" ] = "http://www.w3.org/2001/XMLSchema#date";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"dateTime",
			"string"
		), ():void => {
			const target:XSD[ "dateTime" ] = "http://www.w3.org/2001/XMLSchema#dateTime";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"duration",
			"string"
		), ():void => {
			const target:XSD[ "duration" ] = "http://www.w3.org/2001/XMLSchema#duration";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"gDay",
			"string"
		), ():void => {
			const target:XSD[ "gDay" ] = "http://www.w3.org/2001/XMLSchema#gDay";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"gMonth",
			"string"
		), ():void => {
			const target:XSD[ "gMonth" ] = "http://www.w3.org/2001/XMLSchema#gMonth";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"gMonthDay",
			"string"
		), ():void => {
			const target:XSD[ "gMonthDay" ] = "http://www.w3.org/2001/XMLSchema#gMonthDay";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"gYear",
			"string"
		), ():void => {
			const target:XSD[ "gYear" ] = "http://www.w3.org/2001/XMLSchema#gYear";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"gYearMonth",
			"string"
		), ():void => {
			const target:XSD[ "gYearMonth" ] = "http://www.w3.org/2001/XMLSchema#gYearMonth";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"time",
			"string"
		), ():void => {
			const target:XSD[ "time" ] = "http://www.w3.org/2001/XMLSchema#time";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"byte",
			"string"
		), ():void => {
			const target:XSD[ "byte" ] = "http://www.w3.org/2001/XMLSchema#byte";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"decimal",
			"string"
		), ():void => {
			const target:XSD[ "decimal" ] = "http://www.w3.org/2001/XMLSchema#decimal";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"int",
			"string"
		), ():void => {
			const target:XSD[ "int" ] = "http://www.w3.org/2001/XMLSchema#int";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"integer",
			"string"
		), ():void => {
			const target:XSD[ "integer" ] = "http://www.w3.org/2001/XMLSchema#integer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"long",
			"string"
		), ():void => {
			const target:XSD[ "long" ] = "http://www.w3.org/2001/XMLSchema#long";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"negativeInteger",
			"string"
		), ():void => {
			const target:XSD[ "negativeInteger" ] = "http://www.w3.org/2001/XMLSchema#negativeInteger";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"nonNegativeInteger",
			"string"
		), ():void => {
			const target:XSD[ "nonNegativeInteger" ] = "http://www.w3.org/2001/XMLSchema#nonNegativeInteger";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"nonPositiveInteger",
			"string"
		), ():void => {
			const target:XSD[ "nonPositiveInteger" ] = "http://www.w3.org/2001/XMLSchema#nonPositiveInteger";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"positiveInteger",
			"string"
		), ():void => {
			const target:XSD[ "positiveInteger" ] = "http://www.w3.org/2001/XMLSchema#positiveInteger";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"short",
			"string"
		), ():void => {
			const target:XSD[ "short" ] = "http://www.w3.org/2001/XMLSchema#short";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"unsignedLong",
			"string"
		), ():void => {
			const target:XSD[ "unsignedLong" ] = "http://www.w3.org/2001/XMLSchema#unsignedLong";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"unsignedInt",
			"string"
		), ():void => {
			const target:XSD[ "unsignedInt" ] = "http://www.w3.org/2001/XMLSchema#unsignedInt";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"unsignedShort",
			"string"
		), ():void => {
			const target:XSD[ "unsignedShort" ] = "http://www.w3.org/2001/XMLSchema#unsignedShort";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"unsignedByte",
			"string"
		), ():void => {
			const target:XSD[ "unsignedByte" ] = "http://www.w3.org/2001/XMLSchema#unsignedByte";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"double",
			"string"
		), ():void => {
			const target:XSD[ "double" ] = "http://www.w3.org/2001/XMLSchema#double";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"float",
			"string"
		), ():void => {
			const target:XSD[ "float" ] = "http://www.w3.org/2001/XMLSchema#float";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"boolean",
			"string"
		), ():void => {
			const target:XSD[ "boolean" ] = "http://www.w3.org/2001/XMLSchema#boolean";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"string",
			"string"
		), ():void => {
			const target:XSD[ "string" ] = "http://www.w3.org/2001/XMLSchema#string";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"object",
			"string"
		), ():void => {
			const target:XSD[ "object" ] = "http://www.w3.org/2001/XMLSchema#object";
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"XSD",
		"CarbonLDP.Vocabularies.XSD",
		"Constant that implements the used vocabulary of the data-types defined in the XML Schema Definition Language (XSD)."
	), ():void => {

		it( "should exists", ():void => {
			expect( XSD ).toBeDefined();
			expect( XSD ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( XSD ).length ).toBe( 29 );
		} );

		it( "XSD.namespace", ():void => {
			expect( XSD.namespace ).toEqual( jasmine.any( String ) );
			expect( XSD.namespace ).toBe( "http://www.w3.org/2001/XMLSchema#" );
		} );

		it( "XSD.date", ():void => {
			expect( XSD.date ).toEqual( jasmine.any( String ) );
			expect( XSD.date ).toBe( "http://www.w3.org/2001/XMLSchema#date" );
		} );

		it( "XSD.dateTime", ():void => {
			expect( XSD.dateTime ).toEqual( jasmine.any( String ) );
			expect( XSD.dateTime ).toBe( "http://www.w3.org/2001/XMLSchema#dateTime" );
		} );

		it( "XSD.duration", ():void => {
			expect( XSD.duration ).toEqual( jasmine.any( String ) );
			expect( XSD.duration ).toBe( "http://www.w3.org/2001/XMLSchema#duration" );
		} );

		it( "XSD.gDay", ():void => {
			expect( XSD.gDay ).toEqual( jasmine.any( String ) );
			expect( XSD.gDay ).toBe( "http://www.w3.org/2001/XMLSchema#gDay" );
		} );

		it( "XSD.gMonth", ():void => {
			expect( XSD.gMonth ).toEqual( jasmine.any( String ) );
			expect( XSD.gMonth ).toBe( "http://www.w3.org/2001/XMLSchema#gMonth" );
		} );

		it( "XSD.gMonthDay", ():void => {
			expect( XSD.gMonthDay ).toEqual( jasmine.any( String ) );
			expect( XSD.gMonthDay ).toBe( "http://www.w3.org/2001/XMLSchema#gMonthDay" );
		} );

		it( "XSD.gYear", ():void => {
			expect( XSD.gYear ).toEqual( jasmine.any( String ) );
			expect( XSD.gYear ).toBe( "http://www.w3.org/2001/XMLSchema#gYear" );
		} );

		it( "XSD.gYearMonth", ():void => {
			expect( XSD.gYearMonth ).toEqual( jasmine.any( String ) );
			expect( XSD.gYearMonth ).toBe( "http://www.w3.org/2001/XMLSchema#gYearMonth" );
		} );

		it( "XSD.time", ():void => {
			expect( XSD.time ).toEqual( jasmine.any( String ) );
			expect( XSD.time ).toBe( "http://www.w3.org/2001/XMLSchema#time" );
		} );

		it( "XSD.byte", ():void => {
			expect( XSD.byte ).toEqual( jasmine.any( String ) );
			expect( XSD.byte ).toBe( "http://www.w3.org/2001/XMLSchema#byte" );
		} );

		it( "XSD.decimal", ():void => {
			expect( XSD.decimal ).toEqual( jasmine.any( String ) );
			expect( XSD.decimal ).toBe( "http://www.w3.org/2001/XMLSchema#decimal" );
		} );

		it( "XSD.int", ():void => {
			expect( XSD.int ).toEqual( jasmine.any( String ) );
			expect( XSD.int ).toBe( "http://www.w3.org/2001/XMLSchema#int" );
		} );

		it( "XSD.integer", ():void => {
			expect( XSD.integer ).toEqual( jasmine.any( String ) );
			expect( XSD.integer ).toBe( "http://www.w3.org/2001/XMLSchema#integer" );
		} );

		it( "XSD.long", ():void => {
			expect( XSD.long ).toEqual( jasmine.any( String ) );
			expect( XSD.long ).toBe( "http://www.w3.org/2001/XMLSchema#long" );
		} );

		it( "XSD.negativeInteger", ():void => {
			expect( XSD.negativeInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.negativeInteger ).toBe( "http://www.w3.org/2001/XMLSchema#negativeInteger" );
		} );

		it( "XSD.nonNegativeInteger", ():void => {
			expect( XSD.nonNegativeInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.nonNegativeInteger ).toBe( "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" );
		} );

		it( "XSD.nonPositiveInteger", ():void => {
			expect( XSD.nonPositiveInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.nonPositiveInteger ).toBe( "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" );
		} );

		it( "XSD.positiveInteger", ():void => {
			expect( XSD.positiveInteger ).toEqual( jasmine.any( String ) );
			expect( XSD.positiveInteger ).toBe( "http://www.w3.org/2001/XMLSchema#positiveInteger" );
		} );

		it( "XSD.short", ():void => {
			expect( XSD.short ).toEqual( jasmine.any( String ) );
			expect( XSD.short ).toBe( "http://www.w3.org/2001/XMLSchema#short" );
		} );

		it( "XSD.unsignedLong", ():void => {
			expect( XSD.unsignedLong ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedLong ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedLong" );
		} );

		it( "XSD.unsignedInt", ():void => {
			expect( XSD.unsignedInt ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedInt ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedInt" );
		} );

		it( "XSD.unsignedShort", ():void => {
			expect( XSD.unsignedShort ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedShort ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedShort" );
		} );

		it( "XSD.unsignedByte", ():void => {
			expect( XSD.unsignedByte ).toEqual( jasmine.any( String ) );
			expect( XSD.unsignedByte ).toBe( "http://www.w3.org/2001/XMLSchema#unsignedByte" );
		} );

		it( "XSD.double", ():void => {
			expect( XSD.double ).toEqual( jasmine.any( String ) );
			expect( XSD.double ).toBe( "http://www.w3.org/2001/XMLSchema#double" );
		} );

		it( "XSD.float", ():void => {
			expect( XSD.float ).toEqual( jasmine.any( String ) );
			expect( XSD.float ).toBe( "http://www.w3.org/2001/XMLSchema#float" );
		} );

		it( "XSD.boolean", ():void => {
			expect( XSD.boolean ).toEqual( jasmine.any( String ) );
			expect( XSD.boolean ).toBe( "http://www.w3.org/2001/XMLSchema#boolean" );
		} );

		it( "XSD.string", ():void => {
			expect( XSD.string ).toEqual( jasmine.any( String ) );
			expect( XSD.string ).toBe( "http://www.w3.org/2001/XMLSchema#string" );
		} );

		it( "XSD.object", ():void => {
			expect( XSD.object ).toEqual( jasmine.any( String ) );
			expect( XSD.object ).toBe( "http://www.w3.org/2001/XMLSchema#object" );
		} );

	} );

} );
