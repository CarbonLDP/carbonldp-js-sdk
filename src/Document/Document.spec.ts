import { createNonEnumerable } from "../../test/helpers/miscellaneous";

import { DocumentsContext } from "../Context/DocumentsContext";

import { Fragment } from "../Fragment/Fragment";

import { ModelDecorator } from "../Model/ModelDecorator";
import { BaseResolvableDocument, Document } from "./Document";

import { EventEmitterDocumentTrait } from "./Traits/EventEmitterDocumentTrait";
import { QueryableDocumentTrait } from "./Traits/QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "./Traits/SPARQLDocumentTrait";
import { TransientDocument } from "./TransientDocument";


describe( "Document", () => {

	it( "should exists", () => {
		expect( Document ).toBeDefined();
		expect( Document ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		function createMock<T extends object>( data?:T & Partial<Document> ):T & Document {
			const mock:T & Document = Document.decorate( Object.assign<BaseResolvableDocument, typeof data>( {
				$registry: context.registry,
				$repository: context.repository,
				$id: "https://example.com/",
			}, data ) );

			mock.$_normalize();

			return mock;
		}


		describe( "Document.$_syncSavedFragments", () => {

			it( "should exists", () => {
				const resource:Document = createMock();

				expect( resource.$_syncSavedFragments ).toBeDefined();
				expect( resource.$_syncSavedFragments ).toEqual( jasmine.any( Function ) );
			} );


			// TODO: Test

		} );


		// TODO: Test .$_syncSnapshot

		describe( "Document.$isDirty", () => {

			it( "should exists", () => {
				const resource:Document = createMock();

				expect( resource.$isDirty ).toBeDefined();
				expect( resource.$isDirty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true if self is dirty", () => {
				const resource:Document = createMock( { newData: true } );

				const returned:boolean = resource.$isDirty();
				expect( returned ).toBe( true );
			} );


			it( "should return true when removed fragments", () => {
				const resource:Document = createMock();
				resource.$createFragment( "_:1" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				resource.$removeFragment( "_:1" );
				expect( resource.$isDirty() ).toBe( true );
			} );

			it( "should return true when new fragments", () => {
				const resource:Document = createMock();
				resource.$createFragment( "_:1" );

				expect( resource.$isDirty() ).toBe( true );
			} );

			it( "should return true when removed and new fragments", () => {
				const resource:Document = createMock();
				resource.$createFragment( "_:1" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				resource.$removeFragment( "_:1" );
				resource.$createFragment( "_:2" );
				expect( resource.$isDirty() ).toBe( true );
			} );


			it( "should return true when any saved fragment is dirty", () => {
				const resource:Document = createMock();

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

			it( "should exists", () => {
				const resource:Document = createMock( {} );

				expect( resource.$revert ).toBeDefined();
				expect( resource.$revert ).toEqual( jasmine.any( Function ) );
			} );


			it( "should revert self changes", () => {
				const resource:Document = createMock( { newData: true } );

				resource.$revert();
				expect( resource as {} ).toEqual( {} );
			} );


			it( "should add deleted fragment", () => {
				const resource:Document = createMock();
				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$_syncSavedFragments();

				resource.$removeFragment( "_:1" );
				resource.$revert();

				expect( resource.$getFragment( "_:1" ) ).toEqual( { the: "fragment" } );
			} );

			it( "should remove new fragments", () => {
				const resource:Document = createMock();

				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$revert();

				expect( resource.$hasFragment( "_:1" ) ).toEqual( false );
			} );

			it( "should add deleted fragments and remove new ones", () => {
				const resource:Document = createMock();
				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$_syncSavedFragments();

				resource.$removeFragment( "_:1" );
				resource.$createFragment( { the: "another-fragment" }, "_:2" );
				resource.$revert();

				expect( resource.$getFragment( "_:1" ) ).toEqual( { the: "fragment" } );
				expect( resource.$hasFragment( "_:2" ) ).toEqual( false );
			} );


			it( "should revert changes in fragments", () => {
				const resource:Document = createMock();

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

			it( "should exists", () => {
				expect( Document.isDecorated ).toBeDefined();
				expect( Document.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:typeof Document.PROTOTYPE;
			beforeEach( () => {
				object = createNonEnumerable<typeof Document.PROTOTYPE>( {
					created: null,
					modified: null,
					accessPoints: null,
					contains: null,

					$__savedFragments: [],
					$_syncSavedFragments: ():any => {},

					$_syncSnapshot: ():any => {},
					$isDirty: ():any => {},
					$revert: ():any => {},
				} );
			} );


			it( "should return false when `undefined`", () => {
				expect( Document.isDecorated( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", () => {
				expect( Document.isDecorated( null ) ).toBe( false );
			} );

			it( "should return true when prototype properties", () => {
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return true when no accessPoints", () => {
				delete object.accessPoints;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no contains", () => {
				delete object.contains;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no created", () => {
				delete object.created;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no modified", () => {
				delete object.modified;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return false when no $__savedFragments", () => {
				delete object.$__savedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no $_syncSavedFragments", () => {
				delete object.$_syncSavedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );


			it( "should return false when no $_syncSnapshot", () => {
				delete object.$_syncSnapshot;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no $isDirty", () => {
				delete object.$isDirty;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no $revert", () => {
				delete object.$revert;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( "Document.is", () => {

			it( "should exists", () => {
				expect( Document.is ).toBeDefined();
				expect( Document.is ).toEqual( jasmine.any( Function ) );
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

				isSelfDecorated = spyOn( Document, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a TransientDocument", () => {
				Document.is( { the: "document" } );
				expect( isTransientDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a QueryableDocumentTrait", () => {
				Document.is( { the: "document" } );
				expect( isQueryableDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a SPARQLDocumentTrait", () => {
				Document.is( { the: "document" } );
				expect( isSPARQLDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a EventEmitterDocumentTrait", () => {
				Document.is( { the: "document" } );
				expect( isEventEmitterDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert is decorated", () => {
				Document.is( { the: "document" } );
				expect( isSelfDecorated ).toHaveBeenCalledWith( { the: "document" } );
			} );


			it( "should return true when all assertions", () => {
				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

			it( "should return false if not a TransientDocument", () => {
				isTransientDocument.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a QueryableDocumentTrait", () => {
				isQueryableDocumentTrait.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a SPARQLDocumentTrait", () => {
				isSPARQLDocumentTrait.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a EventEmitterDocumentTrait", () => {
				isEventEmitterDocumentTrait.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not decorated", () => {
				isSelfDecorated.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

		} );

		describe( "Document.decorate", () => {

			it( "should exists", () => {
				expect( Document.decorate ).toBeDefined();
				expect( Document.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				Document.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( Document.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( Document, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );

				Document.decorate( {
					$repository: context.repository,
					$registry: context.registry,
				} );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with QueryableDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( QueryableDocumentTrait, "decorate" )
					.and.callThrough();

				Document.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with SPARQLDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( SPARQLDocumentTrait, "decorate" )
					.and.callThrough();

				Document.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with EventEmitterDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( EventEmitterDocumentTrait, "decorate" )
					.and.callThrough();

				Document.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should add __modelDecorator as FragmentFactory", () => {
				const document:Document = Document.decorate( {
					$repository: context.repository,
					$registry: context.registry,
					the: "object",
				} );

				expect( document.$__modelDecorator ).toBe( Fragment );
			} );

		} );

	} );

} );
