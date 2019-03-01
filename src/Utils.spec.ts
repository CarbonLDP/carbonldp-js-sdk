import {
	ArrayUtils,
	hasFunction,
	hasProperty,
	hasPropertyDefined,
	isArray,
	isBoolean,
	isDate,
	isDefined,
	isDouble,
	isFunction,
	isInteger,
	isMap,
	isNull,
	isNumber,
	isObject,
	isString,
	MapUtils,
	ObjectUtils,
	parseBoolean,
	StringUtils,
	UUIDUtils
} from "./Utils";


describe( "hasFunction", ():void => {

	it( "should exist", () => {
		expect( hasFunction ).toBeDefined();
		expect( hasFunction ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true when has function exists", () => {
		const object:object = { property: () => {} };
		expect( hasFunction( object, "property" ) ).toBe( true );
	} );

	it( "should return false if property is not function", () => {
		const object:object = { property: null };
		expect( hasFunction( object, "property" ) ).toBe( false );
	} );

} );

describe( "hasProperty", ():void => {

	it( "should exist", () => {
		expect( hasProperty ).toBeDefined();
		expect( hasProperty ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true when property exists", () => {
		const object:object = { property: null };
		expect( hasProperty( object, "property" ) ).toBe( true );
	} );

	it( "should return true whe property in prototype", () => {
		const object:object = Object.create( { property: null } );
		expect( hasProperty( object, "property" ) ).toBe( true );
	} );

	it( "should return false if property doesn't exist", () => {
		const object:object = {};
		expect( hasProperty( object, "property" ) ).toBe( false );
	} );

} );

describe( "hasPropertyDefined", ():void => {

	it( "should exist", () => {
		expect( hasPropertyDefined ).toBeDefined();
		expect( hasPropertyDefined ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true when property exists", () => {
		const object:object = { property: null };
		expect( hasPropertyDefined( object, "property" ) ).toBe( true );
	} );

	it( "should return false when property in prototype", () => {
		const object:object = Object.create( { property: null } );
		expect( hasPropertyDefined( object, "property" ) ).toBe( false );
	} );

	it( "should return false if property doesn't exist", () => {
		const object:object = {};
		expect( hasPropertyDefined( object, "property" ) ).toBe( false );
	} );

} );

describe( "isDefined", ():void => {

	it( "should exist", () => {
		expect( isDefined ).toBeDefined();
		expect( isDefined ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if null", () => {
		expect( isDefined( null ) ).toBe( true );
	} );

	it( "should return true if string", () => {
		expect( isDefined( "a string" ) ).toBe( true );
	} );

	it( "should return true if boolean", () => {
		expect( isDefined( true ) ).toBe( true );
	} );

	it( "should return true if number", () => {
		expect( isDefined( 10 ) ).toBe( true );
	} );

	it( "should return true if object", () => {
		expect( isDefined( {} ) ).toBe( true );
	} );

	it( "should return true if array", () => {
		expect( isDefined( [] ) ).toBe( true );
	} );


	it( "should return false if undefined", () => {
		expect( isDefined( void 0 ) ).toBe( false );
	} );

} );

describe( "isNull", ():void => {

	it( "should exist", () => {
		expect( isNull ).toBeDefined();
		expect( isNull ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if null", () => {
		expect( isNull( null ) ).toBe( true );
	} );


	it( "should return false if string", () => {
		expect( isNull( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isNull( false ) ).toBe( false );
	} );

	it( "should return false if number", () => {
		expect( isNull( 10 ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isNull( {} ) ).toBe( false );
	} );

	it( "should return false if array", () => {
		expect( isNull( [] ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isNull( void 0 ) ).toBe( false );
	} );

} );

describe( "isArray", ():void => {

	it( "should exist", () => {
		expect( isArray ).toBeDefined();
		expect( isArray ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if array", () => {
		expect( isArray( [] ) ).toBe( true );
	} );


	it( "should return false if string", () => {
		expect( isArray( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isArray( false ) ).toBe( false );
	} );

	it( "should return false if number", () => {
		expect( isArray( 10 ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isArray( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isArray( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isArray( void 0 ) ).toBe( false );
	} );

} );

describe( "isString", ():void => {

	it( "should exist", () => {
		expect( isString ).toBeDefined();
		expect( isString ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if string", () => {
		expect( isString( "a string" ) ).toBe( true );
	} );


	it( "should return false if array", () => {
		expect( isString( [] ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isString( false ) ).toBe( false );
	} );

	it( "should return false if number", () => {
		expect( isString( 10 ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isString( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isString( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isString( void 0 ) ).toBe( false );
	} );

} );

describe( "isBoolean", ():void => {

	it( "should exist", () => {
		expect( isBoolean ).toBeDefined();
		expect( isBoolean ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if boolean", () => {
		expect( isBoolean( true ) ).toBe( true );
		expect( isBoolean( false ) ).toBe( true );
	} );


	it( "should return false if array", () => {
		expect( isBoolean( [] ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isBoolean( "a string" ) ).toBe( false );
	} );

	it( "should return false if number", () => {
		expect( isBoolean( 10 ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isBoolean( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isBoolean( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isBoolean( void 0 ) ).toBe( false );
	} );

} );

describe( "isNumber", ():void => {

	it( "should exist", () => {
		expect( isNumber ).toBeDefined();
		expect( isNumber ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if positive integer", () => {
		expect( isNumber( 10 ) ).toBe( true );
	} );

	it( "should return true if positive float", () => {
		expect( isNumber( 10.01 ) ).toBe( true );
	} );

	it( "should return true if negative integer", () => {
		expect( isNumber( - 10 ) ).toBe( true );
	} );

	it( "should return true if negative float", () => {
		expect( isNumber( - 10.01 ) ).toBe( true );
	} );


	it( "should return false if array", () => {
		expect( isNumber( [] ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isNumber( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isNumber( true ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isNumber( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isNumber( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isNumber( void 0 ) ).toBe( false );
	} );

} );

describe( "isInteger", ():void => {

	it( "should exist", () => {
		expect( isInteger ).toBeDefined();
		expect( isInteger ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if positive integer", () => {
		expect( isInteger( 10 ) ).toBe( true );
	} );

	it( "should return true if negative integer", () => {
		expect( isInteger( - 10 ) ).toBe( true );
	} );


	it( "should return false if positive float", () => {
		expect( isInteger( 10.01 ) ).toBe( false );
	} );

	it( "should return false if negative float", () => {
		expect( isInteger( - 10.01 ) ).toBe( false );
	} );


	it( "should return false if array", () => {
		expect( isInteger( [] ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isInteger( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isInteger( true ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isInteger( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isInteger( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isInteger( void 0 ) ).toBe( false );
	} );

} );

describe( "isDouble", ():void => {

	it( "should exist", () => {
		expect( isDouble ).toBeDefined();
		expect( isDouble ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if positive float", () => {
		expect( isDouble( 10.01 ) ).toBe( true );
	} );

	it( "should return true if negative float", () => {
		expect( isDouble( - 10.01 ) ).toBe( true );
	} );


	it( "should return false if positive integer", () => {
		expect( isDouble( 10 ) ).toBe( false );
	} );

	it( "should return false if negative integer", () => {
		expect( isDouble( - 10 ) ).toBe( false );
	} );

	it( "should return false if array", () => {
		expect( isDouble( [] ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isDouble( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isDouble( true ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isDouble( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isDouble( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isDouble( void 0 ) ).toBe( false );
	} );

} );

describe( "isDate", ():void => {

	it( "should exist", () => {
		expect( isDate ).toBeDefined();
		expect( isDate ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if Date object", () => {
		expect( isDate( new Date() ) ).toBe( true );
	} );


	it( "should return false if number", () => {
		expect( isDate( 10 ) ).toBe( false );
	} );

	it( "should return false if array", () => {
		expect( isDate( [] ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isDate( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isDate( true ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isDate( {} ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isDate( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isDate( void 0 ) ).toBe( false );
	} );

} );

describe( "isObject", ():void => {

	it( "should exist", () => {
		expect( isObject ).toBeDefined();
		expect( isObject ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if object", () => {
		expect( isObject( {} ) ).toBe( true );
	} );

	it( "should return true if array", () => {
		expect( isObject( [] ) ).toBe( true );
	} );


	it( "should return false if number", () => {
		expect( isObject( 10 ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isObject( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isObject( true ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isObject( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isObject( void 0 ) ).toBe( false );
	} );

} );

describe( "isFunction", ():void => {

	it( "should exist", () => {
		expect( isFunction ).toBeDefined();
		expect( isFunction ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if function", () => {
		expect( isFunction( ():void => {} ) ).toBe( true );
	} );


	it( "should return false if number", () => {
		expect( isFunction( 10 ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isFunction( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isFunction( true ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isFunction( {} ) ).toBe( false );
	} );

	it( "should return false if array", () => {
		expect( isFunction( [] ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isFunction( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isFunction( void 0 ) ).toBe( false );
	} );

} );

describe( "isMap", ():void => {

	it( "should exist", () => {
		expect( isMap ).toBeDefined();
		expect( isMap ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true if Map object", () => {
		expect( isMap( new Map<any, any>() ) ).toBe( true );
	} );


	it( "should return false if number", () => {
		expect( isMap( 10 ) ).toBe( false );
	} );

	it( "should return false if string", () => {
		expect( isMap( "a string" ) ).toBe( false );
	} );

	it( "should return false if boolean", () => {
		expect( isMap( true ) ).toBe( false );
	} );

	it( "should return false if object", () => {
		expect( isMap( {} ) ).toBe( false );
	} );

	it( "should return false if array", () => {
		expect( isMap( [] ) ).toBe( false );
	} );

	it( "should return false if null", () => {
		expect( isMap( null ) ).toBe( false );
	} );

	it( "should return false if undefined", () => {
		expect( isMap( void 0 ) ).toBe( false );
	} );

} );


describe( "parseBoolean", ():void => {

	it( "should exist", () => {
		expect( parseBoolean ).toBeDefined();
		expect( parseBoolean ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true when `true`", () => {
		expect( parseBoolean( "true" ) ).toBe( true );
	} );

	it( "should return true when `yes`", () => {
		expect( parseBoolean( "yes" ) ).toBe( true );
	} );

	it( "should return true when `y`", () => {
		expect( parseBoolean( "y" ) ).toBe( true );
	} );

	it( "should return true when `1`", () => {
		expect( parseBoolean( "1" ) ).toBe( true );
	} );


	it( "should return false when `false`", () => {
		expect( parseBoolean( "false" ) ).toBe( false );
	} );

	it( "should return false when `no`", () => {
		expect( parseBoolean( "no" ) ).toBe( false );
	} );

	it( "should return false when `n`", () => {
		expect( parseBoolean( "n" ) ).toBe( false );
	} );

	it( "should return false when `0`", () => {
		expect( parseBoolean( "0" ) ).toBe( false );
	} );


	it( "should return false when invalid string", () => {
		expect( parseBoolean( "An invalid string" ) ).toBe( false );
	} );

	it( "should return false when not a string", () => {
		expect( parseBoolean( {} as any ) ).toBe( false );
	} );

} );


describe( "ObjectUtils", ():void => {

	it( "should exist", () => {
		expect( ObjectUtils ).toBeDefined();
		expect( ObjectUtils ).toEqual( jasmine.any( Function ) );
	} );


	describe( "ObjectUtils.extend", () => {

		it( "should exist", () => {
			expect( ObjectUtils.extend ).toBeDefined();
			expect( ObjectUtils.extend ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return return target", () => {
			const target:object = {};
			const extended:object = ObjectUtils.extend( target, {} )!;

			expect( extended ).toBe( target );
		} );

		it( "should return empty when empty", () => {
			const extended:object = ObjectUtils.extend( {}, {} )!;

			expect( extended ).toEqual( {} );
		} );


		it( "should maintain target properties", () => {
			const extended:object = ObjectUtils.extend( { inTarget: true }, {} )!;

			expect( extended ).toEqual( {
				inTarget: true,
			} );
		} );

		it( "should merge source properties", () => {
			const extended:object = ObjectUtils.extend( { inTarget: true }, { inSource: true } )!;

			expect( extended ).toEqual( {
				inTarget: true,
				inSource: true,
			} );
		} );

		it( "should keep reference of object properties", () => {
			const source:object = { inSource: {} };
			const extended:object = ObjectUtils.extend( { inTarget: true }, source )!;

			expect( extended[ "inSource" ] ).toBe( source[ "inSource" ] );
		} );

		it( "should keep reference of array properties", () => {
			const source:object = { inSource: [] };
			const extended:object = ObjectUtils.extend( { inTarget: true }, source )!;

			expect( extended[ "inSource" ] ).toBe( source[ "inSource" ] );
		} );

		it( "should copy of object properties when option set", () => {
			const source:object = { inSource: { inSubProperty: true } };
			const extended:object = ObjectUtils.extend( { inTarget: true }, source, { objects: true } )!;

			expect( extended[ "inSource" ] ).not.toBe( source[ "inSource" ] );
			expect( extended[ "inSource" ] ).toEqual( source[ "inSource" ] );
		} );

		it( "should copy of array properties when option set", () => {
			const source:object = { inSource: [ "in sub-property" ] };
			const extended:object = ObjectUtils.extend( { inTarget: true }, source, { arrays: true } )!;

			expect( extended[ "inSource" ] ).not.toBe( source[ "inSource" ] );
			expect( extended[ "inSource" ] ).toEqual( source[ "inSource" ] );
		} );

		it( "should copy of array and object properties when options set", () => {
			const source:object = { inSource1: { inSubProperty: true }, inSource2: [ "in sub-property" ] };
			const extended:object = ObjectUtils.extend( { inTarget: true }, source, { objects: true, arrays: true } )!;

			expect( extended[ "inSource1" ] ).not.toBe( source[ "inSource1" ] );
			expect( extended[ "inSource1" ] ).toEqual( source[ "inSource1" ] );

			expect( extended[ "inSource2" ] ).not.toBe( source[ "inSource2" ] );
			expect( extended[ "inSource2" ] ).toEqual( source[ "inSource2" ] );
		} );

	} );

	describe( "ObjectUtils.clone", () => {

		it( "should exist", () => {
			expect( ObjectUtils.clone ).toBeDefined();
			expect( ObjectUtils.clone ).toEqual( jasmine.any( Function ) );
		} );


		it( "should not return source", () => {
			const source:object = {};
			const extended:object = ObjectUtils.clone( source )!;

			expect( extended ).not.toBe( source );
		} );

		it( "should return undefined if not plain object", () => {
			const extended:unknown = ObjectUtils.clone( new Map() );
			expect( extended ).toBeUndefined();
		} );

		it( "should copy source properties", () => {
			const extended:object = ObjectUtils.clone( { inSource: true } )!;

			expect( extended ).toEqual( {
				inSource: true,
			} );
		} );

		it( "should keep reference of object properties", () => {
			const source:object = { inSource: {} };
			const extended:object = ObjectUtils.clone( source )!;

			expect( extended[ "inSource" ] ).toBe( source[ "inSource" ] );
		} );

		it( "should keep reference of array properties", () => {
			const source:object = { inSource: [] };
			const extended:object = ObjectUtils.clone( source )!;

			expect( extended[ "inSource" ] ).toBe( source[ "inSource" ] );
		} );

		it( "should copy of object properties when option set", () => {
			const source:object = { inSource: { inSubProperty: true } };
			const extended:object = ObjectUtils.clone( source, { objects: true } )!;

			expect( extended[ "inSource" ] ).not.toBe( source[ "inSource" ] );
			expect( extended[ "inSource" ] ).toEqual( source[ "inSource" ] );
		} );

		it( "should copy of array properties when option set", () => {
			const source:object = { inSource: [ "in sub-property" ] };
			const extended:object = ObjectUtils.clone( source, { arrays: true } )!;

			expect( extended[ "inSource" ] ).not.toBe( source[ "inSource" ] );
			expect( extended[ "inSource" ] ).toEqual( source[ "inSource" ] );
		} );

		it( "should copy of array and object properties when options set", () => {
			const source:object = { inSource1: { inSubProperty: true }, inSource2: [ "in sub-property" ] };
			const extended:object = ObjectUtils.clone( source, { objects: true, arrays: true } )!;

			expect( extended[ "inSource1" ] ).not.toBe( source[ "inSource1" ] );
			expect( extended[ "inSource1" ] ).toEqual( source[ "inSource1" ] );

			expect( extended[ "inSource2" ] ).not.toBe( source[ "inSource2" ] );
			expect( extended[ "inSource2" ] ).toEqual( source[ "inSource2" ] );
		} );

	} );

	describe( "ObjectUtils.areEqual", ():void => {

		it( "should exist", () => {
			expect( ObjectUtils.areEqual ).toBeDefined();
			expect( ObjectUtils.areEqual ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when both same", () => {
			const object:{} = {};
			const result:boolean = ObjectUtils.areEqual( object, object );
			expect( result ).toBe( true );
		} );

		it( "should return false when first not object", () => {
			const result:boolean = ObjectUtils.areEqual( "string", {} );
			expect( result ).toBe( false );
		} );

		it( "should return false when second not object", () => {
			const result:boolean = ObjectUtils.areEqual( {}, "string" );
			expect( result ).toBe( false );
		} );

		it( "should return false when none is object", () => {
			const result:boolean = ObjectUtils.areEqual( "string 1", "string 2" );
			expect( result ).toBe( false );
		} );

		it( "should return true when same dates from different objects", () => {
			const result:boolean = ObjectUtils.areEqual( new Date( "2000/01/01" ), new Date( "2000/01/01" ) );
			expect( result ).toBe( true );
		} );

		it( "should ignore functions", () => {
			const result:boolean = ObjectUtils.areEqual( {
				functionName():void {},
			}, {
				functionName():void {},
			} );
			expect( result ).toBe( true );
		} );

		it( "should ignore provided key", () => {
			const result:boolean = ObjectUtils.areEqual( {
				functionName():void {},
				another: "value",
			}, {
				functionName():void {},
			}, {
				arrays: undefined,
				objects: undefined,
			}, {
				another: true,
			} );
			expect( result ).toBe( true );
		} );


		it( "should return true when both empty", () => {
			const result:boolean = ObjectUtils.areEqual( {}, {} );
			expect( result ).toBe( true );
		} );

		it( "should return true when both have same properties", () => {
			const firstObject:object = { property: "Property 1" };
			const secondObject:object = { property: "Property 1" };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject );
			expect( result ).toBe( true );
		} );

		it( "should return false when equal array but different reference", () => {
			const firstObject:object = { property: [ 1, 2, 3 ] };
			const secondObject:object = { property: [ 1, 2, 3 ] };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject );
			expect( result ).toBe( false );
		} );

		it( "should return true when equal array but different reference and option set", () => {
			const firstObject:object = { property: [ 1, 2, 3 ] };
			const secondObject:object = { property: [ 1, 2, 3 ] };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject, { arrays: true } );
			expect( result ).toBe( true );
		} );

		it( "should return false when equal object but different reference", () => {
			const firstObject:object = { property: { inSubProperty: true } };
			const secondObject:object = { property: { inSubProperty: true } };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject );
			expect( result ).toBe( false );
		} );

		it( "should return true when equal object but different reference and option set", () => {
			const firstObject:object = { property: { inSubProperty: true } };
			const secondObject:object = { property: { inSubProperty: true } };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject, { objects: true } );
			expect( result ).toBe( true );
		} );


		it( "should return true when equal object and array but different reference and options set", () => {
			const firstObject:object = { property1: [ 1, 2, 3 ], property2: { inSubProperty: true } };
			const secondObject:object = { property1: [ 1, 2, 3 ], property2: { inSubProperty: true } };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject, { arrays: true, objects: true } );
			expect( result ).toBe( true );
		} );

		it( "should return false when equal object and array but different reference and only array set", () => {
			const firstObject:object = { property1: [ 1, 2, 3 ], property2: { inSubProperty: true } };
			const secondObject:object = { property1: [ 1, 2, 3 ], property2: { inSubProperty: true } };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject, { arrays: true } );
			expect( result ).toBe( false );
		} );

		it( "should return false when equal object and array but different reference and only object set", () => {
			const firstObject:object = { property1: [ 1, 2, 3 ], property2: { inSubProperty: true } };
			const secondObject:object = { property1: [ 1, 2, 3 ], property2: { inSubProperty: true } };

			const result:boolean = ObjectUtils.areEqual( firstObject, secondObject, { objects: true } );
			expect( result ).toBe( false );
		} );

	} );

	describe( "ObjectUtils.areShallowlyEqual", ():void => {

		it( "should exist", () => {
			expect( ObjectUtils.areShallowlyEqual ).toBeDefined();
			expect( ObjectUtils.areShallowlyEqual ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when both same", () => {
			const object:{} = {};
			const result:boolean = ObjectUtils.areShallowlyEqual( object, object );
			expect( result ).toBe( true );
		} );

		it( "should return false when first not object", () => {
			const result:boolean = ObjectUtils.areShallowlyEqual( "string", {} );
			expect( result ).toBe( false );
		} );

		it( "should return false when second not object", () => {
			const result:boolean = ObjectUtils.areShallowlyEqual( {}, "string" );
			expect( result ).toBe( false );
		} );

		it( "should return false when none is object", () => {
			const result:boolean = ObjectUtils.areShallowlyEqual( "string 1", "string 2" );
			expect( result ).toBe( false );
		} );

		it( "should return true when both empty", () => {
			expect( ObjectUtils.areShallowlyEqual( {}, {} ) ).toBe( true );
		} );

		it( "should return true when both have same reference properties", () => {
			const sharedObject:object = {};

			expect( ObjectUtils.areShallowlyEqual( {
					stringProperty: "something",
					numberProperty: 1,
					objectProperty: sharedObject,
				}, {
					stringProperty: "something",
					numberProperty: 1,
					objectProperty: sharedObject,
				} )
			).toBe( true );
		} );

		it( "should return true by ignoring functions", () => {
			expect( ObjectUtils.areShallowlyEqual( {
					functionProperty: () => "different function 1",
				}, {
					functionProperty: () => "different function 2",
				} )
			).toBe( true );
		} );

		it( "should return false when different reference properties", () => {
			expect( ObjectUtils.areShallowlyEqual( {
					objectProperty: {},
				}, {
					objectProperty: {},
				} )
			).toBe( false );
		} );

		it( "should return false when missing property in first object", () => {
			expect( ObjectUtils.areShallowlyEqual( {
					numberProperty: 1,
				}, {
					stringProperty: "something",
					numberProperty: 1,
				} )
			).toBe( false );
		} );

		it( "should return false when missing property in second object", () => {
			expect( ObjectUtils.areShallowlyEqual( {
					stringProperty: "something",
					numberProperty: 1,
				}, {
					numberProperty: 1,
				} )
			).toBe( false );
		} );

	} );

} );

describe( "StringUtils", ():void => {

	it( "should exist", () => {
		expect( StringUtils ).toBeDefined();
		expect( StringUtils ).toEqual( jasmine.any( Function ) );
	} );


	describe( "StringUtils.startsWith", ():void => {

		it( "should exist", () => {
			expect( StringUtils.startsWith ).toBeDefined();
			expect( StringUtils.startsWith ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when first letter", () => {
			expect( StringUtils.startsWith( "hello", "h" ) ).toBe( true );
		} );

		it( "should return true when first two letters", () => {
			expect( StringUtils.startsWith( "hello", "he" ) ).toBe( true );
		} );

		it( "should return true when same string", () => {
			expect( StringUtils.startsWith( "hello", "hello" ) ).toBe( true );
		} );


		it( "should return false when last letter", () => {
			expect( StringUtils.startsWith( "hello", "o" ) ).toBe( false );
		} );

		it( "should return false when last two letters", () => {
			expect( StringUtils.startsWith( "hello", "lo" ) ).toBe( false );
		} );

		it( "should return false when second letter", () => {
			expect( StringUtils.startsWith( "hello", "e" ) ).toBe( false );
		} );

		it( "should return false when second and third letters", () => {
			expect( StringUtils.startsWith( "hello", "el" ) ).toBe( false );
		} );

		it( "should return false when any different letter", () => {
			expect( StringUtils.startsWith( "hello", "a" ) ).toBe( false );
		} );

	} );

	describe( "StringUtils.endsWith", ():void => {

		it( "should exist", () => {
			expect( StringUtils.endsWith ).toBeDefined();
			expect( StringUtils.endsWith ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when last letter", () => {
			expect( StringUtils.endsWith( "hello", "o" ) ).toBe( true );
		} );

		it( "should return true when last two letters", () => {
			expect( StringUtils.endsWith( "hello", "lo" ) ).toBe( true );
		} );

		it( "should return true when same string", () => {
			expect( StringUtils.endsWith( "hello", "hello" ) ).toBe( true );
		} );


		it( "should return false when first letter", () => {
			expect( StringUtils.endsWith( "hello", "h" ) ).toBe( false );
		} );

		it( "should return false when first two letters", () => {
			expect( StringUtils.endsWith( "hello", "he" ) ).toBe( false );
		} );

		it( "should return false when last second letter", () => {
			expect( StringUtils.endsWith( "hello", "l" ) ).toBe( false );
		} );

		it( "should return false when last second and third letters", () => {
			expect( StringUtils.endsWith( "hello", "ll" ) ).toBe( false );
		} );

		it( "should return false when any different letter", () => {
			expect( StringUtils.endsWith( "hello", "a" ) ).toBe( false );
		} );

	} );

	describe( "StringUtils.contains", ():void => {

		it( "should exist", () => {
			expect( StringUtils.contains ).toBeDefined();
			expect( StringUtils.contains ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when last letter", () => {
			expect( StringUtils.contains( "hello", "o" ) ).toBe( true );
		} );

		it( "should return true when last two letters", () => {
			expect( StringUtils.contains( "hello", "lo" ) ).toBe( true );
		} );

		it( "should return true when first letter", () => {
			expect( StringUtils.contains( "hello", "h" ) ).toBe( true );
		} );

		it( "should return true when first two letters", () => {
			expect( StringUtils.contains( "hello", "he" ) ).toBe( true );
		} );

		it( "should return true when second letter", () => {
			expect( StringUtils.contains( "hello", "e" ) ).toBe( true );
		} );

		it( "should return true when second and third letters", () => {
			expect( StringUtils.contains( "hello", "el" ) ).toBe( true );
		} );

		it( "should return true when last second letter", () => {
			expect( StringUtils.contains( "hello", "l" ) ).toBe( true );
		} );

		it( "should return true when last second and third letters", () => {
			expect( StringUtils.contains( "hello", "ll" ) ).toBe( true );
		} );

		it( "should return true when same string", () => {
			expect( StringUtils.contains( "hello", "hello" ) ).toBe( true );
		} );


		it( "should return false when any different letter", () => {
			expect( StringUtils.contains( "hello", "a" ) ).toBe( false );
		} );

		it( "should return false when only one different letter", () => {
			expect( StringUtils.contains( "hello", "hallo" ) ).toBe( false );
		} );

	} );

} );

describe( "ArrayUtils", ():void => {

	it( "should exist", () => {
		expect( ArrayUtils ).toBeDefined();
		expect( ArrayUtils ).toEqual( jasmine.any( Function ) );
	} );


	describe( "ArrayUtils.from", ():void => {

		it( "should exist", () => {
			expect( ArrayUtils.from ).toBeDefined();
			expect( ArrayUtils.from ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return array from mock iterator", () => {
			const values:string[] = [ "one", "two", "three", "four", "five" ];

			const iterator:Iterator<string> & { current:number } = {
				current: 0,
				next: function():IteratorResult<string> {
					let value:IteratorResult<string>;
					if( this.current < values.length ) {
						value = {
							done: false,
							value: values[ this.current ],
						};
						this.current ++;
					} else {
						value = {
							done: true,
							value: null as any,
						};
					}
					return value;
				},
			};

			const array:string[] = ArrayUtils.from<string>( iterator );

			expect( array ).not.toBe( values );
			expect( array ).toEqual( values );
		} );

	} );

	describe( "ArrayUtils.joinWithoutDuplicates", ():void => {

		it( "should exist", () => {
			expect( ArrayUtils.joinWithoutDuplicates ).toBeDefined();
			expect( ArrayUtils.joinWithoutDuplicates ).toEqual( jasmine.any( Function ) );
		} );


		it( "should remove duplicated from three arrays", () => {
			const array1:number[] = [ 5, 3, 1 ];
			const array2:number[] = [ 45, 3, 9 ];
			const array3:number[] = [ 6, 4, 9 ];

			const result:number[] = ArrayUtils.joinWithoutDuplicates( array1, array2, array3 );

			expect( result ).toEqual( [ 5, 3, 1, 45, 9, 6, 4 ] );
		} );

	} );

} );

describe( "MapUtils", ():void => {

	it( "should exist", () => {
		expect( MapUtils ).toBeDefined();
		expect( MapUtils ).toEqual( jasmine.any( Function ) );
	} );


	describe( "MapUtils.from", ():void => {

		it( "should exist", () => {
			expect( MapUtils.from ).toBeDefined();
			expect( MapUtils.from ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return Map from object", () => {
			const returned:Map<string, number> = MapUtils.from( {
				one: 1,
				two: 2,
				three: 3,
			} );

			expect( returned ).toEqual( new Map( [
				[ "one", 1 ],
				[ "two", 2 ],
				[ "three", 3 ],
			] ) );
		} );

	} );

	describe( "MapUtils.extend", ():void => {

		it( "should exist", () => {
			expect( MapUtils.extend ).toBeDefined();
			expect( MapUtils.extend ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return target when no sources", () => {
			const target:Map<string, number> = new Map();
			const result:Map<string, number> = MapUtils.extend<string, number>( target );

			expect( result ).toBe( target );
		} );

		it( "should return target when one source", () => {
			const target:Map<string, number> = new Map();
			const result:Map<string, number> = MapUtils.extend<string, number>( target, new Map() );

			expect( result ).toBe( target );
		} );

		it( "should return target when one source", () => {
			const target:Map<string, number> = new Map();
			const result:Map<string, number> = MapUtils.extend<string, number>( target, new Map() );

			expect( result ).toBe( target );
		} );


		it( "should return empty when empty target and source", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map(),
				new Map()
			);

			expect( result ).toEqual( new Map() );
		} );

		it( "should return empty when undefined source", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map(),
				undefined as any
			);

			expect( result ).toEqual( new Map() );
		} );

		it( "should return extended when source has values", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map(),
				new Map( [ [ "source", 1 ] ] )
			);

			expect( result ).toEqual( new Map( [
				[ "source", 1 ],
			] ) );
		} );

		it( "should return extended when two sources have values", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map(),
				new Map( [ [ "source-1", 1 ], [ "source-2", 2 ] ] ),
				new Map( [ [ "source-3", 3 ] ] )
			);

			expect( result ).toEqual( new Map( [
				[ "source-1", 1 ],
				[ "source-2", 2 ],
				[ "source-3", 3 ],
			] ) );
		} );

		it( "should return extended when target and two sources have values", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map( [ [ "target-0", 0 ] ] ),
				new Map( [ [ "source-1", 1 ], [ "source-2", 2 ] ] ),
				new Map( [ [ "source-3", 3 ] ] )
			);

			expect( result ).toEqual( new Map( [
				[ "target-0", 0 ],
				[ "source-1", 1 ],
				[ "source-2", 2 ],
				[ "source-3", 3 ],
			] ) );
		} );

		it( "should return replace values when target and source have same values", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map( [ [ "target-0", 0 ] ] ),
				new Map( [ [ "target-0", 100 ], [ "source-1", 1 ] ] )
			);

			expect( result ).toEqual( new Map( [
				[ "target-0", 100 ],
				[ "source-1", 1 ],
			] ) );
		} );

		it( "should return replace last values when target and sources have same values", () => {
			const result:Map<string, number> = MapUtils.extend<string, number>(
				new Map( [ [ "target-0", 0 ] ] ),
				new Map( [ [ "target-0", 100 ], [ "source-1", 1 ] ] ),
				new Map( [ [ "target-0", 10000 ], [ "source-2", 2 ] ] )
			);

			expect( result ).toEqual( new Map( [
				[ "target-0", 10000 ],
				[ "source-1", 1 ],
				[ "source-2", 2 ],
			] ) );
		} );

	} );

} );

describe( "UUIDUtils", ():void => {

	it( "should exist", () => {
		expect( UUIDUtils ).toBeDefined();
		expect( UUIDUtils ).toEqual( jasmine.any( Function ) );
	} );


	describe( "UUIDUtils.is", ():void => {

		it( "should exist", () => {
			expect( UUIDUtils.is ).toBeDefined();
			expect( UUIDUtils.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should false when null", () => {
			expect( UUIDUtils.is( null as any ) ).toEqual( false );
		} );

		it( "should false when string without separations", () => {
			expect( UUIDUtils.is( "8cef9ec932b64bebba11fb8a1d8f67cd" ) ).toEqual( false );
		} );

		it( "should true when string with correct separations", () => {
			expect( UUIDUtils.is( "8cef9ec9-32b6-4beb-ba11-fb8a1d8f67cd" ) ).toEqual( true );
		} );

	} );

	describe( "UUIDUtils.generate", ():void => {

		it( "should exist", () => {
			expect( UUIDUtils.generate ).toBeDefined();
			expect( UUIDUtils.generate ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return a string", () => {
			const uuid:string = UUIDUtils.generate();
			expect( uuid ).toEqual( jasmine.any( String ) );
		} );

		it( "should return a format working with UUIDUtils.is", () => {
			const uuid:string = UUIDUtils.generate();
			expect( UUIDUtils.is( uuid ) ).toBe( true );
		} );

	} );

} );
