import * as Module from "./index";
import * as XSD from "./XSD";

describe( "RDF/Literal/Serializers/index", () => {

	it( "should reexport unsignedIntegerSerializer", () => {
		expect( Module.unsignedIntegerSerializer ).toBeDefined();
		expect( Module.unsignedIntegerSerializer ).toBe( XSD.unsignedIntegerSerializer );
	} );

	it( "should reexport UnsignedIntegerSerializer", () => {
		expect( Module.UnsignedIntegerSerializer ).toBeDefined();
		expect( Module.UnsignedIntegerSerializer ).toBe( XSD.UnsignedIntegerSerializer );
	} );

	it( "should reexport timeSerializer", () => {
		expect( Module.timeSerializer ).toBeDefined();
		expect( Module.timeSerializer ).toBe( XSD.timeSerializer );
	} );

	it( "should reexport TimeSerializer", () => {
		expect( Module.TimeSerializer ).toBeDefined();
		expect( Module.TimeSerializer ).toBe( XSD.TimeSerializer );
	} );

	it( "should reexport stringSerializer", () => {
		expect( Module.stringSerializer ).toBeDefined();
		expect( Module.stringSerializer ).toBe( XSD.stringSerializer );
	} );

	it( "should reexport StringSerializer", () => {
		expect( Module.StringSerializer ).toBeDefined();
		expect( Module.StringSerializer ).toBe( XSD.StringSerializer );
	} );

	it( "should reexport longSerializer", () => {
		expect( Module.longSerializer ).toBeDefined();
		expect( Module.longSerializer ).toBe( XSD.longSerializer );
	} );

	it( "should reexport LongSerializer", () => {
		expect( Module.LongSerializer ).toBeDefined();
		expect( Module.LongSerializer ).toBe( XSD.LongSerializer );
	} );

	it( "should reexport integerSerializer", () => {
		expect( Module.integerSerializer ).toBeDefined();
		expect( Module.integerSerializer ).toBe( XSD.integerSerializer );
	} );

	it( "should reexport IntegerSerializer", () => {
		expect( Module.IntegerSerializer ).toBeDefined();
		expect( Module.IntegerSerializer ).toBe( XSD.IntegerSerializer );
	} );

	it( "should reexport floatSerializer", () => {
		expect( Module.floatSerializer ).toBeDefined();
		expect( Module.floatSerializer ).toBe( XSD.floatSerializer );
	} );

	it( "should reexport FloatSerializer", () => {
		expect( Module.FloatSerializer ).toBeDefined();
		expect( Module.FloatSerializer ).toBe( XSD.FloatSerializer );
	} );

	it( "should reexport dateTimeSerializer", () => {
		expect( Module.dateTimeSerializer ).toBeDefined();
		expect( Module.dateTimeSerializer ).toBe( XSD.dateTimeSerializer );
	} );

	it( "should reexport DateTimeSerializer", () => {
		expect( Module.DateTimeSerializer ).toBeDefined();
		expect( Module.DateTimeSerializer ).toBe( XSD.DateTimeSerializer );
	} );

	it( "should reexport BooleanSerializer", () => {
		expect( Module.BooleanSerializer ).toBeDefined();
		expect( Module.BooleanSerializer ).toBe( XSD.BooleanSerializer );
	} );

	it( "should reexport booleanSerializer", () => {
		expect( Module.booleanSerializer ).toBeDefined();
		expect( Module.booleanSerializer ).toBe( XSD.booleanSerializer );
	} );

	it( "should reexport DateSerializer", () => {
		expect( Module.DateSerializer ).toBeDefined();
		expect( Module.DateSerializer ).toBe( XSD.DateSerializer );
	} );

	it( "should reexport dateSerializer", () => {
		expect( Module.dateSerializer ).toBeDefined();
		expect( Module.dateSerializer ).toBe( XSD.dateSerializer );
	} );

	it( "should reexport UnsignedLongSerializer", () => {
		expect( Module.UnsignedLongSerializer ).toBeDefined();
		expect( Module.UnsignedLongSerializer ).toBe( XSD.UnsignedLongSerializer );
	} );

	it( "should reexport unsignedLongSerializer", () => {
		expect( Module.unsignedLongSerializer ).toBeDefined();
		expect( Module.unsignedLongSerializer ).toBe( XSD.unsignedLongSerializer );
	} );

} );

