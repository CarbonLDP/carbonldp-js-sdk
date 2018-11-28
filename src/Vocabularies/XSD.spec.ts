import { XSD } from "./XSD";


describe( "XSD", ():void => {

	it( "should exist", ():void => {
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
