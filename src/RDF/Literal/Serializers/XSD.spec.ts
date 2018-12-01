import { IllegalArgumentError } from "../../../Errors/IllegalArgumentError";
import {
	BooleanSerializer,
	booleanSerializer,
	dateSerializer,
	DateSerializer,
	dateTimeSerializer,
	DateTimeSerializer,
	floatSerializer,
	FloatSerializer,
	integerSerializer,
	IntegerSerializer,
	LongSerializer,
	longSerializer,
	StringSerializer,
	stringSerializer,
	TimeSerializer,
	timeSerializer,
	UnsignedIntegerSerializer,
	unsignedIntegerSerializer,
	UnsignedLongSerializer,
	unsignedLongSerializer
} from "./XSD";


describe( "DateSerializer", () => {

	it( "should exist", () => {
		expect( DateSerializer ).toBeDefined();
		expect( DateSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:DateSerializer = new DateSerializer();
		expect( serializer ).toEqual( jasmine.any( DateSerializer ) );
	} );

	describe( "DateSerializer.serialize", () => {

		it( "should exist", () => {
			expect( DateSerializer.prototype.serialize ).toBeDefined();
			expect( DateSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return date string", () => {
			const serializer:DateSerializer = new DateSerializer();

			const date:Date = new Date( "05 October 2011 14:48 UTC" );
			expect( serializer.serialize( date ) ).toBe( "2011-10-05" );
		} );

		it( "should throw error when plain object", () => {
			const serializer:DateSerializer = new DateSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:DateSerializer = new DateSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:DateSerializer = new DateSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "dateSerializer", () => {

	it( "should exist", () => {
		expect( dateSerializer ).toBeDefined();
		expect( dateSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo DateSerializer", () => {
		expect( dateSerializer ).toEqual( jasmine.any( DateSerializer ) );
	} );

} );


describe( "DateTimeSerializer", () => {

	it( "should exist", () => {
		expect( DateTimeSerializer ).toBeDefined();
		expect( DateTimeSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:DateTimeSerializer = new DateTimeSerializer();
		expect( serializer ).toEqual( jasmine.any( DateTimeSerializer ) );
	} );

	describe( "DateTimeSerializer.serialize", () => {

		it( "should exist", () => {
			expect( DateTimeSerializer.prototype.serialize ).toBeDefined();
			expect( DateTimeSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return date-time string", () => {
			const serializer:DateTimeSerializer = new DateTimeSerializer();

			const date:Date = new Date( "05 October 2011 14:48 UTC" );
			expect( serializer.serialize( date ) ).toBe( "2011-10-05T14:48:00.000Z" );
		} );

		it( "should throw error when plain object", () => {
			const serializer:DateTimeSerializer = new DateTimeSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:DateTimeSerializer = new DateTimeSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:DateTimeSerializer = new DateTimeSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "dateTimeSerializer", () => {

	it( "should exist", () => {
		expect( dateTimeSerializer ).toBeDefined();
		expect( dateTimeSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo DateTimeSerializer", () => {
		expect( dateTimeSerializer ).toEqual( jasmine.any( DateTimeSerializer ) );
	} );

} );


describe( "TimeSerializer", () => {

	it( "should exist", () => {
		expect( TimeSerializer ).toBeDefined();
		expect( TimeSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:TimeSerializer = new TimeSerializer();
		expect( serializer ).toEqual( jasmine.any( TimeSerializer ) );
	} );

	describe( "TimeSerializer.serialize", () => {

		it( "should exist", () => {
			expect( TimeSerializer.prototype.serialize ).toBeDefined();
			expect( TimeSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return time string", () => {
			const serializer:TimeSerializer = new TimeSerializer();

			const date:Date = new Date( "05 October 2011 14:48 UTC" );
			expect( serializer.serialize( date ) ).toBe( "14:48:00.000Z" );
		} );

		it( "should throw error when plain object", () => {
			const serializer:TimeSerializer = new TimeSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:TimeSerializer = new TimeSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:TimeSerializer = new TimeSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "timeSerializer", () => {

	it( "should exist", () => {
		expect( timeSerializer ).toBeDefined();
		expect( timeSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo TimeSerializer", () => {
		expect( timeSerializer ).toEqual( jasmine.any( TimeSerializer ) );
	} );

} );


describe( "IntegerSerializer", () => {

	it( "should exist", () => {
		expect( IntegerSerializer ).toBeDefined();
		expect( IntegerSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:IntegerSerializer = new IntegerSerializer();
		expect( serializer ).toEqual( jasmine.any( IntegerSerializer ) );
	} );

	describe( "IntegerSerializer.serialize", () => {

		it( "should exist", () => {
			expect( IntegerSerializer.prototype.serialize ).toBeDefined();
			expect( IntegerSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return string from integer", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
		} );

		it( "should truncate float", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();

			expect( serializer.serialize( 100.123456789 ) ).toBe( "100" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "-100" );
		} );

		it( "should truncate zero float", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();

			expect( serializer.serialize( 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "0" );
		} );

		it( "should return zero string when NaN", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();

			expect( serializer.serialize( NaN ) ).toBe( "0" );
		} );

		it( "should return zero string when Infinity", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();

			expect( serializer.serialize( Infinity ) ).toBe( "0" );
			expect( serializer.serialize( - Infinity ) ).toBe( "0" );
		} );

		it( "should overflow if larger than 2^32 - 1", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();
			expect( serializer.serialize( Math.pow( 2, 32 ) ) ).not.toBe( "4294967296" );
		} );


		it( "should throw error when plain object", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:IntegerSerializer = new IntegerSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "integerSerializer", () => {

	it( "should exist", () => {
		expect( integerSerializer ).toBeDefined();
		expect( integerSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo IntegerSerializer", () => {
		expect( integerSerializer ).toEqual( jasmine.any( IntegerSerializer ) );
	} );

} );


describe( "UnsignedIntegerSerializer", () => {

	it( "should exist", () => {
		expect( UnsignedIntegerSerializer ).toBeDefined();
		expect( UnsignedIntegerSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();
		expect( serializer ).toEqual( jasmine.any( UnsignedIntegerSerializer ) );
	} );

	describe( "UnsignedIntegerSerializer.serialize", () => {

		it( "should exist", () => {
			expect( UnsignedIntegerSerializer.prototype.serialize ).toBeDefined();
			expect( UnsignedIntegerSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return string from integer", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "100" );
		} );

		it( "should truncate float", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

			expect( serializer.serialize( 100.123456789 ) ).toBe( "100" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "100" );
		} );

		it( "should truncate zero float", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

			expect( serializer.serialize( 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "0" );
		} );

		it( "should return zero string when NaN", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

			expect( serializer.serialize( NaN ) ).toBe( "0" );
		} );

		it( "should return zero string when Infinity", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();

			expect( serializer.serialize( Infinity ) ).toBe( "0" );
			expect( serializer.serialize( - Infinity ) ).toBe( "0" );
		} );

		it( "should overflow if larger than 2^32 - 1", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();
			expect( serializer.serialize( Math.pow( 2, 32 ) ) ).not.toBe( "4294967296" );
		} );


		it( "should throw error when plain object", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:UnsignedIntegerSerializer = new UnsignedIntegerSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "unsignedIntegerSerializer", () => {

	it( "should exist", () => {
		expect( unsignedIntegerSerializer ).toBeDefined();
		expect( unsignedIntegerSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo UnsignedIntegerSerializer", () => {
		expect( unsignedIntegerSerializer ).toEqual( jasmine.any( UnsignedIntegerSerializer ) );
	} );

} );


describe( "LongSerializer", () => {

	it( "should exist", () => {
		expect( LongSerializer ).toBeDefined();
		expect( LongSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:LongSerializer = new LongSerializer();
		expect( serializer ).toEqual( jasmine.any( LongSerializer ) );
	} );

	describe( "LongSerializer.serialize", () => {

		it( "should exist", () => {
			expect( LongSerializer.prototype.serialize ).toBeDefined();
			expect( LongSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return string from integer", () => {
			const serializer:LongSerializer = new LongSerializer();

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
		} );

		it( "should truncate float", () => {
			const serializer:LongSerializer = new LongSerializer();
			expect( serializer.serialize( 4294967296.45 ) ).toBe( "4294967296" );
			expect( serializer.serialize( 1099511627776.7632 ) ).toBe( "1099511627776" );
		} );

		it( "should truncate zero float", () => {
			const serializer:LongSerializer = new LongSerializer();

			expect( serializer.serialize( 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "0" );
		} );

		it( "should return zero string when NaN", () => {
			const serializer:LongSerializer = new LongSerializer();

			expect( serializer.serialize( NaN ) ).toBe( "0" );
		} );

		it( "should return zero string when Infinity", () => {
			const serializer:LongSerializer = new LongSerializer();

			expect( serializer.serialize( Infinity ) ).toBe( "0" );
			expect( serializer.serialize( - Infinity ) ).toBe( "0" );
		} );

		it( "should accept numbers larger than 2^32 - 1", () => {
			const serializer:LongSerializer = new LongSerializer();
			expect( serializer.serialize( Math.pow( 2, 32 ) ) ).toBe( "4294967296" );
			expect( serializer.serialize( - Math.pow( 2, 32 ) ) ).toBe( "-4294967296" );
		} );


		it( "should throw error when plain object", () => {
			const serializer:LongSerializer = new LongSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:LongSerializer = new LongSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:LongSerializer = new LongSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "longSerializer", () => {

	it( "should exist", () => {
		expect( longSerializer ).toBeDefined();
		expect( longSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo LongSerializer", () => {
		expect( longSerializer ).toEqual( jasmine.any( LongSerializer ) );
	} );

} );


describe( "UnsignedLongSerializer", () => {

	it( "should exist", () => {
		expect( UnsignedLongSerializer ).toBeDefined();
		expect( UnsignedLongSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();
		expect( serializer ).toEqual( jasmine.any( UnsignedLongSerializer ) );
	} );

	describe( "UnsignedLongSerializer.serialize", () => {

		it( "should exist", () => {
			expect( UnsignedLongSerializer.prototype.serialize ).toBeDefined();
			expect( UnsignedLongSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return string from integer", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "100" );
		} );

		it( "should truncate float", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();
			expect( serializer.serialize( 4294967296.45 ) ).toBe( "4294967296" );
			expect( serializer.serialize( 1099511627776.7632 ) ).toBe( "1099511627776" );
		} );

		it( "should truncate zero float", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();

			expect( serializer.serialize( 0.123456789 ) ).toBe( "0" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "0" );
		} );

		it( "should return zero string when NaN", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();

			expect( serializer.serialize( NaN ) ).toBe( "0" );
		} );

		it( "should return zero string when Infinity", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();

			expect( serializer.serialize( Infinity ) ).toBe( "0" );
			expect( serializer.serialize( - Infinity ) ).toBe( "0" );
		} );

		it( "should accept numbers larger than 2^32 - 1", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();
			expect( serializer.serialize( Math.pow( 2, 32 ) ) ).toBe( "4294967296" );
			expect( serializer.serialize( - Math.pow( 2, 32 ) ) ).toBe( "4294967296" );
		} );


		it( "should throw error when plain object", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:UnsignedLongSerializer = new UnsignedLongSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "unsignedLongSerializer", () => {

	it( "should exist", () => {
		expect( unsignedLongSerializer ).toBeDefined();
		expect( unsignedLongSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo UnsignedLongSerializer", () => {
		expect( unsignedLongSerializer ).toEqual( jasmine.any( UnsignedLongSerializer ) );
	} );

} );


describe( "FloatSerializer", () => {

	it( "should exist", () => {
		expect( FloatSerializer ).toBeDefined();
		expect( FloatSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:FloatSerializer = new FloatSerializer();
		expect( serializer ).toEqual( jasmine.any( FloatSerializer ) );
	} );

	describe( "FloatSerializer.serialize", () => {

		it( "should exist", () => {
			expect( FloatSerializer.prototype.serialize ).toBeDefined();
			expect( FloatSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return string from integer", () => {
			const serializer:FloatSerializer = new FloatSerializer();

			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
		} );

		it( "should not truncate float", () => {
			const serializer:FloatSerializer = new FloatSerializer();

			expect( serializer.serialize( 100.123456789 ) ).toBe( "100.123456789" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "-100.123456789" );
		} );

		it( "should truncate zero float", () => {
			const serializer:FloatSerializer = new FloatSerializer();

			expect( serializer.serialize( 0.123456789 ) ).toBe( "0.123456789" );
			expect( serializer.serialize( - 0.123456789 ) ).toBe( "-0.123456789" );
		} );

		it( "should return NaN string when NaN", () => {
			const serializer:FloatSerializer = new FloatSerializer();

			expect( serializer.serialize( NaN ) ).toBe( "NaN" );
		} );

		it( "should return INF string when Infinity", () => {
			const serializer:FloatSerializer = new FloatSerializer();

			expect( serializer.serialize( Infinity ) ).toBe( "INF" );
			expect( serializer.serialize( - Infinity ) ).toBe( "-INF" );
		} );


		it( "should throw error when plain object", () => {
			const serializer:FloatSerializer = new FloatSerializer();
			expect( () => serializer.serialize( {} ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when string", () => {
			const serializer:FloatSerializer = new FloatSerializer();
			expect( () => serializer.serialize( "a string" ) ).toThrowError( IllegalArgumentError );
		} );

		it( "should throw error when none existent value", () => {
			const serializer:FloatSerializer = new FloatSerializer();
			expect( () => serializer.serialize( null ) ).toThrowError( IllegalArgumentError );
			expect( () => serializer.serialize( undefined ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );

describe( "floatSerializer", () => {

	it( "should exist", () => {
		expect( floatSerializer ).toBeDefined();
		expect( floatSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo FloatSerializer", () => {
		expect( floatSerializer ).toEqual( jasmine.any( FloatSerializer ) );
	} );

} );


describe( "BooleanSerializer", () => {

	it( "should exist", () => {
		expect( BooleanSerializer ).toBeDefined();
		expect( BooleanSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:BooleanSerializer = new BooleanSerializer();
		expect( serializer ).toEqual( jasmine.any( BooleanSerializer ) );
	} );

	describe( "BooleanSerializer.serialize", () => {

		it( "should exist", () => {
			expect( BooleanSerializer.prototype.serialize ).toBeDefined();
			expect( BooleanSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true string from true", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( true ) ).toBe( "true" );
		} );

		it( "should return true string from non zero integer", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( 100 ) ).toBe( "true" );
			expect( serializer.serialize( - 100 ) ).toBe( "true" );
		} );

		it( "should return true string from non zero float", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( 100 ) ).toBe( "true" );
			expect( serializer.serialize( - 100 ) ).toBe( "true" );
		} );

		it( "should return true string from non Infinity", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( Infinity ) ).toBe( "true" );
			expect( serializer.serialize( - Infinity ) ).toBe( "true" );
		} );

		it( "should return true string from plain object", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( {} ) ).toBe( "true" );
		} );

		it( "should return true string from string with content", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( "a string" ) ).toBe( "true" );
		} );

		it( "should return true string from empty array", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( [] ) ).toBe( "true" );
		} );


		it( "should return false string from false", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( false ) ).toBe( "false" );
		} );

		it( "should return false string from zero integer", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( - 0 ) ).toBe( "false" );
			expect( serializer.serialize( 0 ) ).toBe( "false" );
		} );

		it( "should return false string from non existent value", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( null ) ).toBe( "false" );
			expect( serializer.serialize( undefined ) ).toBe( "false" );
		} );

		it( "should return false string from empty string", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( "" ) ).toBe( "false" );
		} );

		it( "should return false string from NaN", () => {
			const serializer:BooleanSerializer = new BooleanSerializer();
			expect( serializer.serialize( NaN ) ).toBe( "false" );
		} );

	} );

} );

describe( "booleanSerializer", () => {

	it( "should exist", () => {
		expect( booleanSerializer ).toBeDefined();
		expect( booleanSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo BooleanSerializer", () => {
		expect( booleanSerializer ).toEqual( jasmine.any( BooleanSerializer ) );
	} );

} );


describe( "StringSerializer", () => {

	it( "should exist", () => {
		expect( StringSerializer ).toBeDefined();
		expect( StringSerializer ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const serializer:StringSerializer = new StringSerializer();
		expect( serializer ).toEqual( jasmine.any( StringSerializer ) );
	} );

	describe( "StringSerializer.serialize", () => {

		it( "should exist", () => {
			expect( StringSerializer.prototype.serialize ).toBeDefined();
			expect( StringSerializer.prototype.serialize ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return string from zero float", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( - 0.0 ) ).toBe( "0" );
			expect( serializer.serialize( 0.0 ) ).toBe( "0" );
		} );

		it( "should return string from integer", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( 100 ) ).toBe( "100" );
			expect( serializer.serialize( - 100 ) ).toBe( "-100" );
		} );

		it( "should return string from float", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( 100.123456789 ) ).toBe( "100.123456789" );
			expect( serializer.serialize( - 100.123456789 ) ).toBe( "-100.123456789" );
		} );

		it( "should return string from NaN", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( NaN ) ).toBe( "NaN" );
		} );

		it( "should return string from Infinity", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( Infinity ) ).toBe( "Infinity" );
			expect( serializer.serialize( - Infinity ) ).toBe( "-Infinity" );
		} );

		it( "should return string from plain object", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( { an: "object" } ) ).toBe( "[object Object]" );
		} );

		it( "should return string from plain array", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( [ "an", "array" ] ) ).toBe( "an,array" );
		} );

		it( "should return string from string", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( "a string" ) ).toBe( "a string" );
		} );

		it( "should return string from boolean", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( true ) ).toBe( "true" );
			expect( serializer.serialize( false ) ).toBe( "false" );
		} );

		it( "should return string from function", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( function():string { return "some"; } ) ).toMatch( /function[^]*return.*some/ );
		} );

		it( "should return string from undefined", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( undefined ) ).toBe( "undefined" );
		} );

		it( "should return string from null", () => {
			const serializer:StringSerializer = new StringSerializer();
			expect( serializer.serialize( null ) ).toBe( "null" );
		} );

	} );

} );

describe( "stringSerializer", () => {

	it( "should exist", () => {
		expect( stringSerializer ).toBeDefined();
		expect( stringSerializer ).toEqual( jasmine.any( Object ) );
	} );

	it( "should be instance fo StringSerializer", () => {
		expect( stringSerializer ).toEqual( jasmine.any( StringSerializer ) );
	} );

} );
