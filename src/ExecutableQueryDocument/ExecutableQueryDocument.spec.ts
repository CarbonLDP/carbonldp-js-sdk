import { createNonEnumerable } from "../../test/helpers/miscellaneous";

import { DocumentsContext } from "../Context/DocumentsContext";

import { Fragment } from "../Fragment/Fragment";

import { ModelDecorator } from "../Model/ModelDecorator";
import { BaseResolvableDocument } from "../Document/Document";
import { ExecutableQueryDocument } from "./ExecutableQueryDocument";

import { EventEmitterDocumentTrait } from "../Document/Traits/EventEmitterDocumentTrait";
import { QueryableDocumentTrait } from "../Document/Traits/QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "../Document/Traits/SPARQLDocumentTrait";
import { TransientDocument } from "../Document/TransientDocument";


describe( "ExecutableQueryDocument", () => {

	it( "should exist", () => {
		expect( ExecutableQueryDocument ).toBeDefined();
		expect( ExecutableQueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		function createMock<T extends object>( data?:T & Partial<ExecutableQueryDocument> ):T & ExecutableQueryDocument {
			const mock:T & ExecutableQueryDocument = ExecutableQueryDocument.decorate( Object.assign<BaseResolvableDocument, typeof data>( {
				$registry: context.registry,
				$repository: context.repository,
				$id: "https://example.com/",
			}, data ) );

			mock.$_normalize();

			return mock;
		}


		describe( "Document.$_syncSavedFragments", () => {

			it( "should exist", () => {
				const resource:ExecutableQueryDocument = createMock();

				expect( resource.$_syncSavedFragments ).toBeDefined();
				expect( resource.$_syncSavedFragments ).toEqual( jasmine.any( Function ) );
			} );


			// TODO: Test

		} );


		// TODO: Test .$_syncSnapshot

		describe( "Document.$isDirty", () => {

			it( "should exist", () => {
				const resource:ExecutableQueryDocument = createMock();

				expect( resource.$isDirty ).toBeDefined();
				expect( resource.$isDirty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true if self is dirty", () => {
				const resource:ExecutableQueryDocument = createMock( { newData: true } );

				const returned:boolean = resource.$isDirty();
				expect( returned ).toBe( true );
			} );


			it( "should return true when removed fragments", () => {
				const resource:ExecutableQueryDocument = createMock();
				resource.$createFragment( "_:1" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				resource.$removeFragment( "_:1" );
				expect( resource.$isDirty() ).toBe( true );
			} );

			it( "should return true when new fragments", () => {
				const resource:ExecutableQueryDocument = createMock();
				resource.$createFragment( "_:1" );

				expect( resource.$isDirty() ).toBe( true );
			} );

			it( "should return true when removed and new fragments", () => {
				const resource:ExecutableQueryDocument = createMock();
				resource.$createFragment( "_:1" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				resource.$removeFragment( "_:1" );
				resource.$createFragment( "_:2" );
				expect( resource.$isDirty() ).toBe( true );
			} );


			it( "should return true when any saved fragment is dirty", () => {
				const resource:ExecutableQueryDocument = createMock();

				resource.$createFragment( "_:1" );
				resource.$createFragment( "#fragment" );
				const target:{ newData?:boolean } = resource.$createFragment<{ newData?:boolean }>( {}, "_:2" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				target.newData = true;
				expect( resource.$isDirty() ).toBe( true );
			} );

		} );

		describe( "Document.$revert", () => {

			it( "should exist", () => {
				const resource:ExecutableQueryDocument = createMock( {} );

				expect( resource.$revert ).toBeDefined();
				expect( resource.$revert ).toEqual( jasmine.any( Function ) );
			} );


			it( "should revert self changes", () => {
				const resource:ExecutableQueryDocument = createMock( { newData: true } );

				resource.$revert();
				expect( resource as {} ).toEqual( {} );
			} );


			it( "should add deleted fragment", () => {
				const resource:ExecutableQueryDocument = createMock();
				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$_syncSavedFragments();

				resource.$removeFragment( "_:1" );
				resource.$revert();

				expect<{ the:string } | null>( resource.$getFragment<{ the:string }>( "_:1" ) ).toEqual( { the: "fragment" } );
			} );

			it( "should remove new fragments", () => {
				const resource:ExecutableQueryDocument = createMock();

				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$revert();

				expect( resource.$hasFragment( "_:1" ) ).toEqual( false );
			} );

			it( "should add deleted fragments and remove new ones", () => {
				const resource:ExecutableQueryDocument = createMock();
				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$_syncSavedFragments();

				resource.$removeFragment( "_:1" );
				resource.$createFragment( { the: "another-fragment" }, "_:2" );
				resource.$revert();

				expect<{ the:string } | null>( resource.$getFragment<{ the:string }>( "_:1" ) ).toEqual( { the: "fragment" } );
				expect( resource.$hasFragment( "_:2" ) ).toEqual( false );
			} );


			it( "should revert changes in fragments", () => {
				const resource:ExecutableQueryDocument = createMock();

				resource.$createFragment( "_:1" );
				resource.$createFragment( "#fragment" );
				const target:{ newData?:boolean } = resource.$createFragment<{ newData?:boolean }>( {}, "_:2" );
				resource.$_syncSavedFragments();

				target.newData = true;
				resource.$revert();

				expect( target ).toEqual( {} );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "Document.isDecorated", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocument.isDecorated ).toBeDefined();
				expect( ExecutableQueryDocument.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:typeof ExecutableQueryDocument.PROTOTYPE;
			beforeEach( () => {
				object = createNonEnumerable<typeof ExecutableQueryDocument.PROTOTYPE>( {
					created: undefined,
					modified: undefined,
					accessPoints: undefined,
					contains: undefined,

					$__savedFragments: [],
					$_syncSavedFragments: ():any => {},

					$_syncSnapshot: ():any => {},
					$isDirty: ():any => {},
					$revert: ():any => {},
				} );
			} );


			it( "should return false when `undefined`", () => {
				expect( ExecutableQueryDocument.isDecorated( void 0 as any ) ).toBe( false );
			} );

			it( "should return false when `null`", () => {
				expect( ExecutableQueryDocument.isDecorated( null as any ) ).toBe( false );
			} );

			it( "should return true when prototype properties", () => {
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( true );
			} );


			it( "should return true when no accessPoints", () => {
				delete object.accessPoints;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no contains", () => {
				delete object.contains;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no created", () => {
				delete object.created;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no modified", () => {
				delete object.modified;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( true );
			} );


			it( "should return false when no $__savedFragments", () => {
				delete object.$__savedFragments;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no $_syncSavedFragments", () => {
				delete object.$_syncSavedFragments;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( false );
			} );


			it( "should return false when no $_syncSnapshot", () => {
				delete object.$_syncSnapshot;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no $isDirty", () => {
				delete object.$isDirty;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no $revert", () => {
				delete object.$revert;
				expect( ExecutableQueryDocument.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( "Document.is", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocument.is ).toBeDefined();
				expect( ExecutableQueryDocument.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDocument:jasmine.Spy;
			let isQueryableDocumentTrait:jasmine.Spy;
			let isSPARQLDocumentTrait:jasmine.Spy;
			let isEventEmitterDocumentTrait:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( () => {
				isTransientDocument = spyOn( TransientDocument, "is" )
					.and.returnValue( true );
				isQueryableDocumentTrait = spyOn( QueryableDocumentTrait, "isDecorated" )
					.and.returnValue( true );
				isSPARQLDocumentTrait = spyOn( SPARQLDocumentTrait, "isDecorated" )
					.and.returnValue( true );
				isEventEmitterDocumentTrait = spyOn( EventEmitterDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				isSelfDecorated = spyOn( ExecutableQueryDocument, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a TransientDocument", () => {
				ExecutableQueryDocument.is( { the: "document" } );
				expect( isTransientDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a QueryableDocumentTrait", () => {
				ExecutableQueryDocument.is( { the: "document" } );
				expect( isQueryableDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a SPARQLDocumentTrait", () => {
				ExecutableQueryDocument.is( { the: "document" } );
				expect( isSPARQLDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a EventEmitterDocumentTrait", () => {
				ExecutableQueryDocument.is( { the: "document" } );
				expect( isEventEmitterDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert is decorated", () => {
				ExecutableQueryDocument.is( { the: "document" } );
				expect( isSelfDecorated ).toHaveBeenCalledWith( { the: "document" } );
			} );


			it( "should return true when all assertions", () => {
				const returned:boolean = ExecutableQueryDocument.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

			it( "should return false if not a TransientDocument", () => {
				isTransientDocument.and.returnValue( false );

				const returned:boolean = ExecutableQueryDocument.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a QueryableDocumentTrait", () => {
				isQueryableDocumentTrait.and.returnValue( false );

				const returned:boolean = ExecutableQueryDocument.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a SPARQLDocumentTrait", () => {
				isSPARQLDocumentTrait.and.returnValue( false );

				const returned:boolean = ExecutableQueryDocument.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a EventEmitterDocumentTrait", () => {
				isEventEmitterDocumentTrait.and.returnValue( false );

				const returned:boolean = ExecutableQueryDocument.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not decorated", () => {
				isSelfDecorated.and.returnValue( false );

				const returned:boolean = ExecutableQueryDocument.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

		} );

		describe( "Document.decorate", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocument.decorate ).toBeDefined();
				expect( ExecutableQueryDocument.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				ExecutableQueryDocument.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( ExecutableQueryDocument.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( ExecutableQueryDocument, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );

				ExecutableQueryDocument.decorate( {
					$repository: context.repository,
					$registry: context.registry,
				} );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with QueryableDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( QueryableDocumentTrait, "decorate" )
					.and.callThrough();

				ExecutableQueryDocument.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with SPARQLDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( SPARQLDocumentTrait, "decorate" )
					.and.callThrough();

				ExecutableQueryDocument.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with EventEmitterDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( EventEmitterDocumentTrait, "decorate" )
					.and.callThrough();

				ExecutableQueryDocument.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should add __modelDecorator as FragmentFactory", () => {
				const document:ExecutableQueryDocument = ExecutableQueryDocument.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( document.$__modelDecorator ).toBe( Fragment );
			} );

		} );

	} );

} );
