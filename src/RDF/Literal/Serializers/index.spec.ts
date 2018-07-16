import { isDefined, module, reexports, STATIC } from "../../../test/JasmineExtender";

import * as Utils from "../../../Utils";

import * as Serializers from "./";

import {
	BooleanSerializer,
	booleanSerializer,
	DateSerializer,
	dateSerializer,
	DateTimeSerializer,
	dateTimeSerializer,
	FloatSerializer,
	floatSerializer,
	IntegerSerializer,
	integerSerializer,
	LongSerializer,
	longSerializer,
	StringSerializer,
	stringSerializer,
	TimeSerializer,
	timeSerializer,
	UnsignedIntegerSerializer,
	unsignedIntegerSerializer,
	UnsignedLongSerializer,
	unsignedLongSerializer,
} from "./XSD";


describe( module(
	"carbonldp/RDF/Literal/Serializers"
), ():void => {

	it( isDefined(), ():void => {
		expect( Serializers ).toBeDefined();
		expect( Utils.isObject( Serializers ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"BooleanSerializer",
		"CarbonLDP.RDF.Literal.Serializers.BooleanSerializer"
	), ():void => {
		expect( Serializers.BooleanSerializer ).toBeDefined();
		expect( Serializers.BooleanSerializer ).toBe( BooleanSerializer  );
	} );

	it( reexports(
		STATIC,
		"DateSerializer",
		"CarbonLDP.RDF.Literal.Serializers.DateSerializer"
	), ():void => {
		expect( Serializers.DateSerializer ).toBeDefined();
		expect( Serializers.DateSerializer ).toBe( DateSerializer  );
	} );

	it( reexports(
		STATIC,
		"DateTimeSerializer",
		"CarbonLDP.RDF.Literal.Serializers.DateTimeSerializer"
	), ():void => {
		expect( Serializers.DateTimeSerializer ).toBeDefined();
		expect( Serializers.DateTimeSerializer ).toBe( DateTimeSerializer  );
	} );

	it( reexports(
		STATIC,
		"FloatSerializer",
		"CarbonLDP.RDF.Literal.Serializers.FloatSerializer"
	), ():void => {
		expect( Serializers.FloatSerializer ).toBeDefined();
		expect( Serializers.FloatSerializer ).toBe( FloatSerializer  );
	} );

	it( reexports(
		STATIC,
		"IntegerSerializer",
		"CarbonLDP.RDF.Literal.Serializers.IntegerSerializer"
	), ():void => {
		expect( Serializers.IntegerSerializer ).toBeDefined();
		expect( Serializers.IntegerSerializer ).toBe( IntegerSerializer  );
	} );

	it( reexports(
		STATIC,
		"StringSerializer",
		"CarbonLDP.RDF.Literal.Serializers.StringSerializer"
	), ():void => {
		expect( Serializers.StringSerializer ).toBeDefined();
		expect( Serializers.StringSerializer ).toBe( StringSerializer  );
	} );

	it( reexports(
		STATIC,
		"LongSerializer",
		"CarbonLDP.RDF.Literal.Serializers.LongSerializer"
	), ():void => {
		expect( Serializers.LongSerializer ).toBeDefined();
		expect( Serializers.LongSerializer ).toBe( LongSerializer  );
	} );

	it( reexports(
		STATIC,
		"TimeSerializer",
		"CarbonLDP.RDF.Literal.Serializers.TimeSerializer"
	), ():void => {
		expect( Serializers.TimeSerializer ).toBeDefined();
		expect( Serializers.TimeSerializer ).toBe( TimeSerializer  );
	} );

	it( reexports(
		STATIC,
		"UnsignedIntegerSerializer",
		"CarbonLDP.RDF.Literal.Serializers.UnsignedIntegerSerializer"
	), ():void => {
		expect( Serializers.UnsignedIntegerSerializer ).toBeDefined();
		expect( Serializers.UnsignedIntegerSerializer ).toBe( UnsignedIntegerSerializer  );
	} );

	it( reexports(
		STATIC,
		"UnsignedLongSerializer",
		"CarbonLDP.RDF.Literal.Serializers.UnsignedLongSerializer"
	), ():void => {
		expect( Serializers.UnsignedLongSerializer ).toBeDefined();
		expect( Serializers.UnsignedLongSerializer ).toBe( UnsignedLongSerializer  );
	} );

	it( reexports(
		STATIC,
		"booleanSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#booleanSerializer"
	), ():void => {
		expect( Serializers.booleanSerializer ).toBeDefined();
		expect( Serializers.booleanSerializer ).toBe( booleanSerializer  );
	} );

	it( reexports(
		STATIC,
		"dateSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#dateSerializer"
	), ():void => {
		expect( Serializers.dateSerializer ).toBeDefined();
		expect( Serializers.dateSerializer ).toBe( dateSerializer  );
	} );

	it( reexports(
		STATIC,
		"dateTimeSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#dateTimeSerializer"
	), ():void => {
		expect( Serializers.dateTimeSerializer ).toBeDefined();
		expect( Serializers.dateTimeSerializer ).toBe( dateTimeSerializer  );
	} );

	it( reexports(
		STATIC,
		"floatSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#floatSerializer"
	), ():void => {
		expect( Serializers.floatSerializer ).toBeDefined();
		expect( Serializers.floatSerializer ).toBe( floatSerializer  );
	} );

	it( reexports(
		STATIC,
		"integerSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#integerSerializer"
	), ():void => {
		expect( Serializers.integerSerializer ).toBeDefined();
		expect( Serializers.integerSerializer ).toBe( integerSerializer  );
	} );

	it( reexports(
		STATIC,
		"stringSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#stringSerializer"
	), ():void => {
		expect( Serializers.stringSerializer ).toBeDefined();
		expect( Serializers.stringSerializer ).toBe( stringSerializer  );
	} );

	it( reexports(
		STATIC,
		"longSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#longSerializer"
	), ():void => {
		expect( Serializers.longSerializer ).toBeDefined();
		expect( Serializers.longSerializer ).toBe( longSerializer  );
	} );

	it( reexports(
		STATIC,
		"timeSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#timeSerializer"
	), ():void => {
		expect( Serializers.timeSerializer ).toBeDefined();
		expect( Serializers.timeSerializer ).toBe( timeSerializer  );
	} );

	it( reexports(
		STATIC,
		"unsignedIntegerSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#unsignedIntegerSerializer"
	), ():void => {
		expect( Serializers.unsignedIntegerSerializer ).toBeDefined();
		expect( Serializers.unsignedIntegerSerializer ).toBe( unsignedIntegerSerializer  );
	} );

	it( reexports(
		STATIC,
		"unsignedLongSerializer",
		"carbonldp/RDF/Literal/Serializers/XSD#unsignedLongSerializer"
	), ():void => {
		expect( Serializers.unsignedLongSerializer ).toBeDefined();
		expect( Serializers.unsignedLongSerializer ).toBe( unsignedLongSerializer  );
	} );

} );
