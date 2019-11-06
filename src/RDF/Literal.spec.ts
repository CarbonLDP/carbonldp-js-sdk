import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { XSD } from "../Vocabularies/XSD";

import { RDFLiteral } from "./Literal";


describe( "RDFLiteral", () => {

	it( "should exist", () => {
		expect( RDFLiteral ).toBeDefined();
		expect( RDFLiteral ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "RDFLiteral.from", () => {

			it( "should exist", () => {
				expect( RDFLiteral.from ).toBeDefined();
				expect( RDFLiteral.from ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return literal from Date", () => {
				const value:any = new Date( "05 October 2011 14:48 UTC" );
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "2011-10-05T14:48:00.000Z",
					"@type": XSD.dateTime,
				} );
			} );

			it( "should return literal from positive integer", () => {
				const value:any = 100;
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "100",
					"@type": XSD.integer,
				} );
			} );
			it( "should return literal from negative integer", () => {
				const value:any = - 100;
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "-100",
					"@type": XSD.integer,
				} );
			} );

			it( "should return literal from positive float", () => {
				const value:any = 100.987654321;
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "100.987654321",
					"@type": XSD.double,
				} );
			} );

			it( "should return literal from negative float", () => {
				const value:any = - 100.987654321;
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "-100.987654321",
					"@type": XSD.double,
				} );
			} );

			it( "should return literal from string", () => {
				const value:any = "a string";
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "a string",
					"@type": XSD.string,
				} );
			} );

			it( "should return literal from boolean", () => {
				const value:any = true;
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "true",
					"@type": XSD.boolean,
				} );
			} );

			it( "should return literal from object", () => {
				const value:any = {};
				const literal:RDFLiteral = RDFLiteral.from( value );

				expect( literal ).toEqual( {
					"@value": "{}",
					"@type": XSD.object,
				} );
			} );

			it( "should throw error when null", () => {
				expect( () => RDFLiteral.from( null ) ).toThrowError( IllegalArgumentError );
			} );

			it( "should throw error when undefined", () => {
				expect( () => RDFLiteral.from( undefined ) ).toThrowError( IllegalArgumentError );
			} );

		} );

		describe( "RDFLiteral.parse", () => {

			it( "should exist", () => {
				expect( RDFLiteral.parse ).toBeDefined();
				expect( RDFLiteral.parse ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return null when empty object", () => {
				const literal:RDFLiteral = <RDFLiteral> {};
				expect( RDFLiteral.parse( literal ) ).toBeNull();
			} );

			it( "should return null when null", () => {
				const literal:RDFLiteral = null as any;
				expect( RDFLiteral.parse( literal ) ).toBeNull();
			} );

			it( "should return null when undefined", () => {
				const literal:RDFLiteral = undefined as any;
				expect( RDFLiteral.parse( literal ) ).toBeNull();
			} );


			it( "should return string from not typed", () => {
				const literal:RDFLiteral = { "@value": "a string" };
				expect( RDFLiteral.parse( literal ) ).toEqual( "a string" );
			} );

			it( "should return string from string literal", () => {
				const literal:RDFLiteral = { "@value": "a string", "@type": XSD.string };
				expect( RDFLiteral.parse( literal ) ).toEqual( "a string" );
			} );

			it( "should return date from date literal", () => {
				const literal:RDFLiteral = { "@value": "2011-10-05", "@type": XSD.date };
				expect( RDFLiteral.parse( literal ) ).toEqual( new Date( "2011-10-05T00:00:00.000Z" ) );
			} );

			it( "should return date from dateTime literal", () => {
				const literal:RDFLiteral = { "@value": "2011-10-05T14:48:00.000Z", "@type": XSD.dateTime };
				expect( RDFLiteral.parse( literal ) ).toEqual( new Date( "2011-10-05T14:48:00.000Z" ) );
			} );

			it( "should return date from time literal", () => {
				const literal:RDFLiteral = { "@value": "14:48:00.000Z", "@type": XSD.time };
				const returned:any = RDFLiteral.parse( literal );

				expect( returned ).toEqual( jasmine.any( Date ) );
				expect( returned.toISOString().split( "T" )[ 1 ] ).toEqual( "14:48:00.000Z" );
			} );

			it( "should return date from byte literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.byte };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from decimal literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.decimal };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from int literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.int };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from integer literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.integer };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from long literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.long };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from negativeInteger literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.negativeInteger };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from nonNegativeInteger literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.nonNegativeInteger };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from nonPositiveInteger literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.nonPositiveInteger };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from positiveInteger literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.positiveInteger };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from short literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.short };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from unsignedLong literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.unsignedLong };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from unsignedInt literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.unsignedInt };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from unsignedShort literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.unsignedShort };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from unsignedByte literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.unsignedByte };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from double literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.double };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from float literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.float };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from float literal", () => {
				const literal:RDFLiteral = { "@value": "100.00", "@type": XSD.float };
				expect( RDFLiteral.parse( literal ) ).toEqual( 100 );
			} );

			it( "should return date from boolean literal", () => {
				const literal:RDFLiteral = { "@value": "true", "@type": XSD.boolean };
				expect( RDFLiteral.parse( literal ) ).toEqual( true );
			} );

			it( "should return date from object literal", () => {
				const literal:RDFLiteral = { "@value": "{ \"a\": \"object\" }", "@type": XSD.object };
				expect( RDFLiteral.parse( literal ) ).toEqual( { a: "object" } );
			} );

			it( "should return date from object array literal", () => {
				const literal:RDFLiteral = { "@value": "[ \"a\", \"array\" ]", "@type": XSD.object };
				expect( RDFLiteral.parse( literal ) ).toEqual( [ "a", "array" ] );
			} );

			// TODO wait implementation
			/*  - duration
			    - gDay
			    - gMoth
			    - gMonthDay
			    - gYear
			    - gYearMonth
			*/

		} );

		describe( "RDFLiteral.is", () => {

			it( "should exist", () => {
				expect( RDFLiteral.is ).toBeDefined();
				expect( RDFLiteral.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when empty object", () => {
				expect( RDFLiteral.is( {} ) ).toBe( false );
			} );

			it( "should return false when only @type", () => {
				expect( RDFLiteral.is( { "@type": "some" } ) ).toBe( false );
			} );

			it( "should return true when only @value", () => {
				expect( RDFLiteral.is( { "@value": "some" } ) ).toBe( true );
			} );

			it( "should return true when all properties", () => {
				expect( RDFLiteral.is( { "@value": "some", "@type": "some" } ) ).toBe( true );
			} );

		} );

		describe( "RDFLiteral.hasType", () => {

			it( "should exist", () => {
				expect( RDFLiteral.hasType ).toBeDefined();
				expect( RDFLiteral.hasType ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when no type when requested for string", () => {
				expect( RDFLiteral.hasType( { "@value": "some" }, XSD.string ) ).toBe( true );
			} );

			it( "should return false when no type when requested for NON string", () => {
				expect( RDFLiteral.hasType( { "@value": "some" }, XSD.integer ) ).toBe( false );
			} );

			it( "should return true when type is the requested one", () => {
				expect( RDFLiteral.hasType( { "@value": "some value", "@type": XSD.date }, XSD.date ) ).toBe( true );
			} );

			it( "should return false whe type isn't the requested one", () => {
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

	} );

} );
