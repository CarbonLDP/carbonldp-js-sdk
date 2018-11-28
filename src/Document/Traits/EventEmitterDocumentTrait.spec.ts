import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { EventEmitterDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/EventEmitterDocumentsRepositoryTrait";

import { Event } from "../../Messaging/Event";

import { ModelDecorator } from "../../Model/ModelDecorator";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";


import { TransientDocument } from "../TransientDocument";

import { EventEmitterDocumentTrait } from "./EventEmitterDocumentTrait";


describe( "EventEmitterDocumentTrait", () => {

	it( "should exist", () => {
		expect( EventEmitterDocumentTrait ).toBeDefined();
		expect( EventEmitterDocumentTrait ).toEqual( jasmine.any( Object ) );
	} );


	let context:DocumentsContext;
	let $repository:EventEmitterDocumentsRepositoryTrait;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
		$repository = EventEmitterDocumentsRepositoryTrait.decorate( { context } );
	} );


	describe( "[[interface impl]]", () => {

		let resource:EventEmitterDocumentTrait;
		beforeEach( () => {
			resource = EventEmitterDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
		} );

		describe( "EventEmitterDocumentTrait.$on", () => {

			it( "should exist", () => {
				expect( resource.$on ).toBeDefined();
				expect( resource.$on ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$on( Event.CHILD_CREATED, onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$on( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$on( Event.CHILD_CREATED, "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

		describe( "EventEmitterDocumentTrait.$off", () => {

			it( "should exist", () => {
				expect( resource.$off ).toBeDefined();
				expect( resource.$off ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "off" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$off( Event.CHILD_CREATED, onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$off( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$off( Event.CHILD_CREATED, "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
			} );


		} );

		describe( "EventEmitterDocumentTrait.$one", () => {

			it( "should exist", () => {
				expect( resource.$one ).toBeDefined();
				expect( resource.$one ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "one" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$one( Event.CHILD_CREATED, onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$one( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$one( Event.CHILD_CREATED, "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
			} );


		} );


		describe( "EventEmitterDocumentTrait.$onChildCreated", () => {

			it( "should exist", () => {
				expect( resource.$onChildCreated ).toBeDefined();
				expect( resource.$onChildCreated ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onChildCreated( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onChildCreated( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onChildCreated( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

		describe( "EventEmitterDocumentTrait.$onDocumentModified", () => {

			it( "should exist", () => {
				expect( resource.$onDocumentModified ).toBeDefined();
				expect( resource.$onDocumentModified ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onDocumentModified( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onDocumentModified( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onDocumentModified( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

		describe( "EventEmitterDocumentTrait.$onDocumentDeleted", () => {

			it( "should exist", () => {
				expect( resource.$onDocumentDeleted ).toBeDefined();
				expect( resource.$onDocumentDeleted ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onDocumentDeleted( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onDocumentDeleted( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onDocumentDeleted( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

		describe( "EventEmitterDocumentTrait.$onMemberAdded", () => {

			it( "should exist", () => {
				expect( resource.$onMemberAdded ).toBeDefined();
				expect( resource.$onMemberAdded ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onMemberAdded( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onMemberAdded( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onMemberAdded( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

		describe( "EventEmitterDocumentTrait.$onMemberRemoved", () => {

			it( "should exist", () => {
				expect( resource.$onMemberRemoved ).toBeDefined();
				expect( resource.$onMemberRemoved ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onMemberRemoved( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onMemberRemoved( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.$onMemberRemoved( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "EventEmitterDocumentTrait.isDecorated", () => {

			it( "should exist", () => {
				expect( EventEmitterDocumentTrait.isDecorated ).toBeDefined();
				expect( EventEmitterDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				EventEmitterDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "EventEmitterDocumentTrait.decorate", () => {

			it( "should exist", () => {
				expect( EventEmitterDocumentTrait.decorate ).toBeDefined();
				expect( EventEmitterDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				EventEmitterDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( EventEmitterDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				EventEmitterDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with TransientDocument", () => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" )
					.and.callThrough();

				EventEmitterDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ResolvablePointer", () => {
				const spy:jasmine.Spy = spyOn( ResolvablePointer, "decorate" )
					.and.callThrough();

				EventEmitterDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );

