import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
import { createNonEnumerable } from "../../test/helpers/miscellaneous";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { Pointer } from "../Pointer/Pointer";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { BaseResolvablePointer } from "./BaseResolvablePointer";
import { Repository } from "./Repository";
import { ResolvablePointer, ResolvablePointerFactory } from "./ResolvablePointer";


describe( module( "carbonldp/Repository" ), () => {

	describe( interfaze(
		"CarbonLDP.ResolvablePointer",
		"Interface that describes the basic methods of any resolvable pointer."
	), () => {


		let $repository:Repository;
		beforeEach( ():void => {
			$repository = Repository.decorate( {} );
		} );

		function createMock<T extends object>( data?:T & Partial<ResolvablePointer> ):T & ResolvablePointer {
			return ResolvablePointer.decorate( Object.assign( { $repository }, data ) );
		}


		it( hasProperty(
			OBLIGATORY,
			"$repository",
			"CarbonLDP.Repository",
			"The repository associated which the pointer can be resolved with."
		), () => {
			const target:ResolvablePointer[ "$repository" ] = {} as Repository;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_eTag",
			"string | undefined",
			"The identifier that describes the state of the last data retrieved for the current pointer."
		), ():void => {
			const target:ResolvablePointer[ "$eTag" ] = "" as string | undefined;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"_resolved",
			"boolean | undefined"
		), ():void => {
			const target:ResolvablePointer[ "_resolved" ] = true as boolean | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_snapshot",
			"object",
			"The shallow copy of the pointer, which is used to track its changes."
		), ():void => {
			const target:ResolvablePointer[ "_snapshot" ] = {} as object;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "isResolved" ), ():void => {

			it( hasSignature(
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:ResolvablePointer = createMock();

				expect( resource.isResolved ).toBeDefined();
				expect( resource.isResolved ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when _resolved undefined", ():void => {
				const resource:ResolvablePointer = createMock();

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( false );
			} );

			it( "should return false when _resolved false", ():void => {
				const resource:ResolvablePointer = createMock( { _resolved: false } );

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( false );
			} );

			it( "should return true when _resolved true", ():void => {
				const resource:ResolvablePointer = createMock( { _resolved: true } );

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( true );
			} );

		} );


		describe( method( OBLIGATORY, "_syncSnapshot" ), ():void => {

			it( hasSignature(
				"Updates the snapshot with the data of the resource."
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:ResolvablePointer = createMock();

				expect( resource._syncSnapshot ).toBeDefined();
				expect( resource._syncSnapshot ).toEqual( jasmine.any( Function ) );
			} );


			it( "should not alter previous snapshot", ():void => {
				const resource:ResolvablePointer = createMock();

				const previous:{} = resource._snapshot;

				Object.assign( resource, { the: "new property" } );
				resource._syncSnapshot();

				expect( resource._snapshot ).not.toBe( previous );
			} );

			it( "should not assign itself as snapshot", ():void => {
				const resource:ResolvablePointer = createMock();
				resource._syncSnapshot();

				expect( resource._snapshot ).not.toBe( resource );
			} );

			it( "should sync new property", ():void => {
				const resource:ResolvablePointer = createMock();

				Object.assign( resource, { the: "new property" } );
				resource._syncSnapshot();

				expect( resource._snapshot ).toEqual( jasmine.objectContaining( { the: "new property" } ) );
			} );

			it( "should sync types (non-enumerable)", ():void => {
				const resource:ResolvablePointer & { types:string[] } = createMock( { types: [] } );
				createNonEnumerable( resource );

				resource.types.push( "https://example.com/ns#Type" );
				resource._syncSnapshot();

				expect( resource._snapshot ).toEqual( jasmine.objectContaining( {
					types: [ "https://example.com/ns#Type" ],
				} ) );
			} );

			it( "should not sync ID", ():void => {
				const resource:ResolvablePointer = createMock();

				resource.$id = "https://example.com/resource/";
				resource._syncSnapshot();

				expect( resource._snapshot ).not.toEqual( jasmine.objectContaining( {
					id: "https://example.com/resource/",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "isDirty" ), ():void => {

			it( hasSignature(
				"Returns true if the resource presents differences from its snapshot.",
				{ type: "boolean" }
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:ResolvablePointer = createMock();

				expect( resource.isDirty ).toBeDefined();
				expect( resource.isDirty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false if synced", ():void => {
				const resource:ResolvablePointer = createMock( { the: "resource" } );
				resource._syncSnapshot();

				expect( resource.isDirty() ).toBe( false );
			} );

			it( "should return true if new property", ():void => {
				const resource:ResolvablePointer = createMock();
				resource._syncSnapshot();

				Object.assign( resource, { the: "new property" } );

				expect( resource.isDirty() ).toBe( true );
			} );

			it( "should return true if deleted property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( { the: "old property" } );
				resource._syncSnapshot();

				delete resource.the;

				expect( resource.isDirty() ).toBe( true );
			} );

			it( "should return true if null property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( { the: "old property" } );
				resource._syncSnapshot();

				resource.the = null;

				expect( resource.isDirty() ).toBe( true );
			} );

			it( "should return true if altered property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( { the: "old property value" } );
				resource._syncSnapshot();

				resource.the = "new property value";

				expect( resource.isDirty() ).toBe( true );
			} );


			it( "should return true if new type", ():void => {
				const resource:ResolvablePointer & { types:string[] } = createMock( { types: [] } );
				createNonEnumerable( resource );
				resource._syncSnapshot();

				resource.types.push( "https://example.com/ns#Type" );

				expect( resource.isDirty() ).toBe( true );
			} );

			it( "should return true if deleted type", ():void => {
				const resource:ResolvablePointer & { types:string[] } = createMock( {
					types: [ "https://example.com/ns#Type", "https://example.com/ns#Type-2" ],
				} );
				createNonEnumerable( resource );
				resource._syncSnapshot();

				resource.types.splice( 1, 1 );

				expect( resource.isDirty() ).toBe( true );
			} );


			it( "should return false even if ID changed", ():void => {
				const resource:ResolvablePointer = createMock( {
					id: "https://example.com/resource/",
				} );
				resource._syncSnapshot();

				resource.$id = "https://exampple.com/another-resource/";

				expect( resource.isDirty() ).toBe( false );
			} );

			it( "should return false if related resource content altered", ():void => {
				const relatedResource:ResolvablePointer = createMock( { $id: "https://example.com/realted/resource/" } );

				const resource:ResolvablePointer = createMock( {
					relation: relatedResource,
				} );

				resource._syncSnapshot();
				Object.assign( relatedResource, { the: "change in content" } );

				expect( resource.isDirty() ).toBe( false );
			} );

		} );

		describe( method( OBLIGATORY, "revert" ), ():void => {

			it( hasSignature(
				"Revert the changes made to the resource into the state of the snapshot."
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:ResolvablePointer = createMock( {} );

				expect( resource.revert ).toBeDefined();
				expect( resource.revert ).toEqual( jasmine.any( Function ) );
			} );


			it( "should revert change in property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( { the: "old property value" } );
				resource._syncSnapshot();

				resource.the = "new property value";
				resource.revert();

				expect( resource ).toEqual( jasmine.objectContaining( {
					the: "old property value",
				} ) );
			} );

			it( "should revert add deleted property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( { the: "old property" } );
				resource._syncSnapshot();

				delete resource.the;
				resource.revert();

				expect( resource ).toEqual( jasmine.objectContaining( {
					the: "old property",
				} ) );
			} );

			it( "should revert add null-ed property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( { the: "old property" } );
				resource._syncSnapshot();

				resource.the = null;
				resource.revert();

				expect( resource ).toEqual( jasmine.objectContaining( {
					the: "old property",
				} ) );
			} );

			it( "should revert remove new property", ():void => {
				const resource:ResolvablePointer & { the?:string } = createMock( {} );
				resource._syncSnapshot();

				resource.the = "new property";
				resource.revert();

				expect( resource ).not.toEqual( jasmine.objectContaining( {
					the: "new property",
				} ) );
			} );


			it( "should remove new type", ():void => {
				const resource:ResolvablePointer & { types:string[] } = createMock( {
					types: [ "https://example.com/ns#Type" ],
				} );
				createNonEnumerable( resource );
				resource._syncSnapshot();

				resource.types.push( "https://example.com/ns#Type-2" );
				resource.revert();

				expect( resource ).toEqual( jasmine.objectContaining( {
					types: [ "https://example.com/ns#Type" ],
				} ) );
			} );

			it( "should add deleted type", ():void => {
				const resource:ResolvablePointer & { types:string[] } = createMock( {
					types: [ "https://example.com/ns#Type", "https://example.com/ns#Type-2" ],
				} );
				createNonEnumerable( resource );
				resource._syncSnapshot();

				resource.types.splice( 1, 1 );
				resource.revert();

				expect( resource ).toEqual( jasmine.objectContaining( {
					types: [ "https://example.com/ns#Type", "https://example.com/ns#Type-2" ],
				} ) );
			} );


			it( "should not revert changed ID", ():void => {
				const resource:ResolvablePointer = createMock( {
					id: "https://example.com/resource/",
				} );
				resource._syncSnapshot();

				resource.$id = "https://exampple.com/another-resource/";
				resource.revert();

				expect( resource ).toEqual( jasmine.objectContaining( {
					$id: "https://exampple.com/another-resource/",
				} ) );
			} );

			it( "should revert related resource content altered", ():void => {
				const relatedResource:ResolvablePointer & { the?:string } = createMock( { $id: "https://example.com/realted/resource/" } );

				const resource:ResolvablePointer = createMock( {
					relation: relatedResource,
				} );

				resource._syncSnapshot();
				Object.assign( relatedResource, { the: "change in content" } );
				resource.revert();

				expect( relatedResource ).toEqual( jasmine.objectContaining( {
					the: "change in content",
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "get" ), () => {
			// TODO: Document

			it( "should send to $id when no provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "get" )
					.and.returnValue( Promise.resolve() );

				await resource.get();

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should resolve relative with $id when provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "get" )
					.and.returnValue( Promise.resolve() );

				await resource.get( "relative/" );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should pass absolute when provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "get" )
					.and.returnValue( Promise.resolve() );

				await resource.get( "https://example.com/another-resource/" );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );


			it( "should pass params when no URI", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "get" )
					.and.returnValue( Promise.resolve() );

				await resource.get( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when URI", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "get" )
					.and.returnValue( Promise.resolve() );

				await resource.get( "relative/", { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { object: "1" }, { object: "2" } );
			} );

		} );

		describe( method( OBLIGATORY, "resolve" ), () => {
			// TODO: Document

			it( "should send to self when no provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "resolve" )
					.and.returnValue( Promise.resolve() );

				await resource.resolve();

				expect( spy ).toHaveBeenCalledWith( resource );
			} );

			it( "should pass resource when provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "resolve" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.resolve( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );


			it( "should pass params when no resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "resolve" )
					.and.returnValue( Promise.resolve() );

				await resource.resolve( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( resource, { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "resolve" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.resolve( target, { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( target, { object: "1" }, { object: "2" } );
			} );

		} );

		describe( method( OBLIGATORY, "exists" ), () => {
			// TODO: Document

			it( "should send to $id when no provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "exists" )
					.and.returnValue( Promise.resolve() );

				await resource.exists();

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should resolve relative with $id when provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "exists" )
					.and.returnValue( Promise.resolve() );

				await resource.exists( "relative/" );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should pass absolute when provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "exists" )
					.and.returnValue( Promise.resolve() );

				await resource.exists( "https://example.com/another-resource/" );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );


			it( "should pass params when no URI", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "exists" )
					.and.returnValue( Promise.resolve() );

				await resource.exists( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when URI", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "exists" )
					.and.returnValue( Promise.resolve() );

				await resource.exists( "relative/", { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { object: "1" }, { object: "2" } );
			} );

		} );


		describe( method( OBLIGATORY, "refresh" ), () => {
			// TODO: Document

			it( "should send to self when no provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "refresh" )
					.and.returnValue( Promise.resolve() );

				await resource.refresh();

				expect( spy ).toHaveBeenCalledWith( resource );
			} );

			it( "should pass resource when provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "refresh" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.refresh( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );


			it( "should pass params when no resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "refresh" )
					.and.returnValue( Promise.resolve() );

				await resource.refresh( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( resource, { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "refresh" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.refresh( target, { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( target, { object: "1" }, { object: "2" } );
			} );

		} );

		describe( method( OBLIGATORY, "save" ), () => {
			// TODO: Document

			it( "should send to self when no provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "save" )
					.and.returnValue( Promise.resolve() );

				await resource.save();

				expect( spy ).toHaveBeenCalledWith( resource );
			} );

			it( "should pass resource when provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "save" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.save( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );


			it( "should pass params when no resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "save" )
					.and.returnValue( Promise.resolve() );

				await resource.save( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( resource, { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "save" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.save( target, { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( target, { object: "1" }, { object: "2" } );
			} );

		} );

		describe( method( OBLIGATORY, "saveAndRefresh" ), () => {
			// TODO: Document

			it( "should send to self when no provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "saveAndRefresh" )
					.and.returnValue( Promise.resolve() );

				await resource.saveAndRefresh();

				expect( spy ).toHaveBeenCalledWith( resource );
			} );

			it( "should pass resource when provided", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "saveAndRefresh" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.saveAndRefresh( target );

				expect( spy ).toHaveBeenCalledWith( target );
			} );


			it( "should pass params when no resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "saveAndRefresh" )
					.and.returnValue( Promise.resolve() );

				await resource.saveAndRefresh( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( resource, { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when resource", async () => {
				const resource:ResolvablePointer = createMock( { the: "object" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "saveAndRefresh" )
					.and.returnValue( Promise.resolve() );

				const target:ResolvablePointer = createMock( { another: "object" } );
				await resource.saveAndRefresh( target, { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( target, { object: "1" }, { object: "2" } );
			} );

		} );


		describe( method( OBLIGATORY, "delete" ), () => {
			// TODO: Document

			it( "should send to $id when no provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "delete" )
					.and.returnValue( Promise.resolve() );

				await resource.delete();

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should resolve relative with $id when provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "delete" )
					.and.returnValue( Promise.resolve() );

				await resource.delete( "relative/" );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should pass absolute when provided", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "delete" )
					.and.returnValue( Promise.resolve() );

				await resource.delete( "https://example.com/another-resource/" );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );


			it( "should pass params when no URI", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "delete" )
					.and.returnValue( Promise.resolve() );

				await resource.delete( { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { object: "1" }, { object: "2" } );
			} );

			it( "should pass params when URI", async () => {
				const resource:ResolvablePointer = createMock( { $id: "https://example.com/resource/" } );

				const spy:jasmine.Spy = spyOnDecorated( $repository, "delete" )
					.and.returnValue( Promise.resolve() );

				await resource.delete( "relative/", { object: "1" }, { object: "2" } );

				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { object: "1" }, { object: "2" } );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.ResolvablePointerFactory",
		"Interface with the factory, decorate and utils of a `CarbonLDP.ResolvablePointer` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.ResolvablePointer, CarbonLDP.Pointer>" ), () => {
			const target:ModelPrototype<ResolvablePointer, Pointer> = {} as ResolvablePointerFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.ResolvablePointer, CarbonLDP.BaseResolvablePointer>" ), () => {
			const target:ModelDecorator<ResolvablePointer, BaseResolvablePointer> = {} as ResolvablePointerFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelTypeGuard<CarbonLDP.ResolvablePointer>" ), () => {
			const target:ModelTypeGuard<ResolvablePointer> = {} as ResolvablePointerFactory;
			expect( target ).toBeDefined();
		} );


		describe( "ResolvablePointer.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( ResolvablePointer.isDecorated ).toBeDefined();
				expect( ResolvablePointer.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should verify members from PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" )
					.and.returnValue( true );

				const returned:boolean = ResolvablePointer.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( ResolvablePointer.PROTOTYPE, { the: "object" } );
				expect( returned ).toBe( true, "Not returning value from ModelDecorator.hasPropertiesFrom" );
			} );

		} );

		describe( "ResolvablePointer.decorate", ():void => {

			it( "should exists", ():void => {
				expect( ResolvablePointer.decorate ).toBeDefined();
				expect( ResolvablePointer.decorate ).toEqual( jasmine.any( Function ) );
			} );

			let $repository:Repository;
			beforeEach( ():void => {
				$repository = Repository.decorate( {} );
			} );


			it( "should decorate with Pointer", () => {
				const spy:jasmine.Spy = spyOn( Pointer, "decorate" );

				ResolvablePointer.decorate( { $repository } );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add PROTOTYPE", () => {
				const pointer:ResolvablePointer = ResolvablePointer.decorate( { $repository } );
				expect( ResolvablePointer.isDecorated( pointer ) ).toBe( true, "Not adding PROTOTYPE members" );
			} );


			it( "should maintain $repository value", () => {
				const pointer:ResolvablePointer = ResolvablePointer.decorate( { $repository } );
				expect( pointer.$repository ).toBe( $repository );
			} );

			it( "should throw error when no $repository", () => {
				expect( () => {
					ResolvablePointer.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "$repository" is required.` );
			} );


			it( "should set $eTag to undefined by default", () => {
				const pointer:ResolvablePointer = ResolvablePointer.decorate( { $repository } );
				expect( pointer.$eTag ).toBe( void 0 );
			} );

			it( "should set _resolve to false by default", () => {
				const pointer:ResolvablePointer = ResolvablePointer.decorate( { $repository } );
				expect( pointer._resolved ).toBe( false );
			} );

			it( "should set _resolve to {} by default", () => {
				const pointer:ResolvablePointer = ResolvablePointer.decorate( { $repository } );
				expect( pointer._snapshot ).toEqual( {} );
			} );

		} );


		describe( "ResolvablePointer.is", ():void => {

			it( "should exists", ():void => {
				expect( ResolvablePointer.is ).toBeDefined();
				expect( ResolvablePointer.is ).toEqual( jasmine.any( Function ) );
			} );


			let isPointer:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( ():void => {
				isPointer = spyOn( Pointer, "is" )
					.and.returnValue( true );
				isSelfDecorated = spyOn( ResolvablePointer, "isDecorated" )
					.and.returnValue( true );
			} );


			it( "should verify is Pointer", () => {
				ResolvablePointer.is( { the: "object" } );
				expect( isPointer ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should verify is decorated", () => {
				ResolvablePointer.is( { the: "object" } );
				expect( isSelfDecorated ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should return true when all assertions", () => {
				const returned:boolean = ResolvablePointer.is( {} );
				expect( returned ).toBe( true, "Not returning value from all assertions" );
			} );

			it( "should return false when is not Pointer", () => {
				isPointer.and.returnValue( false );

				const returned:boolean = ResolvablePointer.is( {} );
				expect( returned ).toBe( false );
			} );

			it( "should return false when no decorated", () => {
				isSelfDecorated.and.returnValue( false );

				const returned:boolean = ResolvablePointer.is( {} );
				expect( returned ).toBe( false );
			} );

		} );

	} );


	describe( property(
		STATIC,
		"ResolvablePointer",
		"CarbonLDP.ResolvablePointerFactory"
	), () => {

		it( "should exists", ():void => {
			expect( ResolvablePointer ).toBeDefined();
			expect( ResolvablePointer ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
