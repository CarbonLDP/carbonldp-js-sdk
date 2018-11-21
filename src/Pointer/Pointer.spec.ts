import { createNonEnumerable } from "../../test/helpers/miscellaneous";

import { Pointer, PointerFactory } from "./Pointer";


describe( "Pointer", () => {

	it( "should exist", () => {
		expect( Pointer ).toBeDefined();
		expect( Pointer ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "Pointer.isDecorated", () => {

			it( "should exist", () => {
				expect( Pointer.isDecorated ).toBeDefined();
				expect( Pointer.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			let mockObject:PointerFactory[ "PROTOTYPE" ];
			beforeEach( () => {
				mockObject = createNonEnumerable( {
					$id: null,
				} );
			} );


			it( "should return true when all properties", () => {
				expect( Pointer.isDecorated( mockObject ) ).toBe( true );
			} );

			it( "should return false when no `$id`", () => {
				delete mockObject.$id;
				expect( Pointer.isDecorated( mockObject ) ).toBe( false );
				mockObject.$id = null;
			} );

		} );

		describe( "Pointer.is", () => {

			it( "should exist", () => {
				expect( Pointer.is ).toBeDefined();
				expect( Pointer.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when undefined", () => {
				expect( Pointer.is( undefined ) ).toBe( false );
				expect( Pointer.is( null ) ).toBe( false );
			} );

			it( "should return false when empty", () => {
				expect( Pointer.is( {} ) ).toBe( false );
			} );

			it( "should return true when non-enumerable properties", () => {
				const target:Pointer = createNonEnumerable( {
					$id: null,
				} );

				expect( Pointer.is( target ) ).toBe( true );
			} );

		} );

		describe( "Pointer.create", () => {

			it( "should exist", () => {
				expect( Pointer.create ).toBeDefined();
				expect( Pointer.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should maintain the `$id` in `Pointer.$id`", () => {
				const pointer:Pointer = Pointer.create( { $id: "https://example.com/pointer/" } );
				expect( pointer.$id ).toBe( "https://example.com/pointer/" );
			} );

			it( "should set empty string in `Pointer.$id` if no `$id` provided", () => {
				const pointer:Pointer = Pointer.create( {} );
				expect( pointer.$id ).toBe( "" );
			} );

			it( "should set empty string in `Pointer.$id` none provided", () => {
				const pointer:Pointer = Pointer.create();
				expect( pointer.$id ).toBe( "" );
			} );


			it( "should return different reference", () => {
				const object:{} = {};
				const returned:Pointer = Pointer.create( {} );

				expect( object ).not.toBe( returned );
			} );

			it( "should call Pointer.createFrom", () => {
				const spy:jasmine.Spy = spyOn( Pointer, "createFrom" );

				Pointer.create( { the: "data", $id: "" } );
				expect( spy ).toHaveBeenCalledWith( { the: "data", $id: "" } );
			} );

		} );

		describe( "Pointer.createFrom", () => {

			it( "should exist", () => {
				expect( Pointer.createFrom ).toBeDefined();
				expect( Pointer.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should assign the `$id` in `Pointer.$id`", () => {
				const pointer:Pointer = Pointer.createFrom( { $id: "https://example.com/pointer/" } );
				expect( pointer.$id ).toBe( "https://example.com/pointer/" );
			} );

			it( "should set empty string in `Pointer.$id` if no `$id` provided", () => {
				const pointer:Pointer = Pointer.createFrom( {} );
				expect( pointer.$id ).toBe( "" );
			} );


			it( "should return same reference", () => {
				const object:{} = {};
				const returned:Pointer = Pointer.createFrom( object );

				expect( object ).toBe( returned );
			} );

			it( "should call Pointer.decorate", () => {
				const spy:jasmine.Spy = spyOn( Pointer, "decorate" );

				Pointer.create( { the: "data", $id: "" } );
				expect( spy ).toHaveBeenCalledWith( { the: "data", $id: "" } );
			} );

		} );

		describe( "Pointer.decorate", () => {

			it( "should exist", () => {
				expect( Pointer.decorate ).toBeDefined();
				expect( Pointer.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should work with Pointer.isDecorated", () => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( Pointer.isDecorated( pointer ) ).toBe( true );
			} );


			it( "should assign empty string to `Pointer.$id` when not exists", () => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( pointer.$id ).toBe( "" );
			} );

			it( "should keep ID in `Pointer.$id` when `$id` already exists", () => {
				const pointer:Pointer = Pointer.decorate( { $id: "https://example.com/pointer/" } );
				expect( pointer.$id ).toBe( "https://example.com/pointer/" );
			} );

		} );

		describe( "Pointer.areEqual", () => {

			it( "should exist", () => {
				expect( Pointer.areEqual ).toBeDefined();
				expect( Pointer.areEqual ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return true when same ID", () => {
				const returned:boolean = Pointer.areEqual(
					Pointer.create( { $id: "the-same-id/" } ),
					Pointer.create( { $id: "the-same-id/" } )
				);

				expect( returned ).toBe( true );
			} );

			it( "should return false when different ID", () => {
				const returned:boolean = Pointer.areEqual(
					Pointer.create( { $id: "different-id-1/" } ),
					Pointer.create( { $id: "different-id-2/" } )
				);

				expect( returned ).toBe( false );
			} );

		} );

		describe( "Pointer.getIDs", () => {

			it( "should exist", () => {
				expect( Pointer.getIDs ).toBeDefined();
				expect( Pointer.getIDs ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the IDs", () => {
				const pointers:Pointer[] = [
					Pointer.create( { $id: "http://example.com/resource-1/" } ),
					Pointer.create( { $id: "http://example.com/resource-2/" } ),
					Pointer.create( { $id: "http://example.com/resource-3/" } ),
				];

				const ids:string[] = Pointer.getIDs( pointers );
				expect( ids.length ).toBe( 3 );
				expect( ids ).toContain( "http://example.com/resource-1/" );
				expect( ids ).toContain( "http://example.com/resource-2/" );
				expect( ids ).toContain( "http://example.com/resource-3/" );
			} );

		} );

	} );

} );
