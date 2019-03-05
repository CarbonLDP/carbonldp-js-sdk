import { DocumentsContext } from "../../Context/DocumentsContext";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { Event } from "../../Messaging/Event";

import { ModelDecorator } from "../../Model/ModelDecorator";

import { EventEmitterDocumentsRepositoryTrait } from "./EventEmitterDocumentsRepositoryTrait";


describe( "EventEmitterDocumentsRepositoryTrait", () => {

	it( "should exist", () => {
		expect( EventEmitterDocumentsRepositoryTrait ).toBeDefined();
		expect( EventEmitterDocumentsRepositoryTrait ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		function createMock():EventEmitterDocumentsRepositoryTrait {
			return EventEmitterDocumentsRepositoryTrait.decorate( { context } );
		}

		describe( "EventEmitterDocumentsRepositoryTrait.on", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.on ).toBeDefined();
				expect( resource.on ).toEqual( jasmine.any( Function ) );
			} );


			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.on( "*.*", "child/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.on( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent, onError );
				done();
			} );


			it( "should call onError when invalid event", ( done:DoneFn ) => {
				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				resource.on( "invalid.event", "child/!*", onEvent, ( error ) => {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, `Provided event type "invalid.event" is invalid.` );

					done();
				} );
			} );

			it( "should throw error when invalid event", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( () => resource.on( "invalid.event", "child/!*", onEvent ) )
					.toThrowError( IllegalArgumentError, `Provided event type "invalid.event" is invalid.` );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.off", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.off ).toBeDefined();
				expect( resource.off ).toEqual( jasmine.any( Function ) );
			} );


			it( "should unsubscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ) => {
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.off( "*.*", "child/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent );
				done();
			} );

			it( "should unsubscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ) => {
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.off( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent );
				done();
			} );


			it( "should call onError when invalid event", ( done:DoneFn ) => {
				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				resource.off( "invalid.event", "child/!*", onEvent, ( error ) => {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, `Provided event type "invalid.event" is invalid.` );

					done();
				} );
			} );

			it( "should throw error when invalid event", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( () => resource.off( "invalid.event", "child/!*", onEvent ) )
					.toThrowError( IllegalArgumentError, `Provided event type "invalid.event" is invalid.` );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.one", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.one ).toBeDefined();
				expect( resource.one ).toEqual( jasmine.any( Function ) );
			} );


			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "child/!*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", actualOnEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", actualOnEvent, onError );
				done();
			} );


			it( "should call user onEvent after message", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );


				const onEvent:jasmine.Spy = jasmine.createSpy( "onEvent" );
				const onError:( error:Error ) => void = () => {};

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "child/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, { the: "message" } );

				expect( onEvent ).not.toBe( actualOnEvent );
				expect( onEvent ).toHaveBeenCalledWith( { the: "message" } );

				done();
			} );


			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "child/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", actualOnEvent );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ) => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", actualOnEvent );
				done();
			} );


			it( "should call onError when invalid event", ( done:DoneFn ) => {
				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				resource.one( "invalid.event", "child/!*", onEvent, ( error ) => {
					expect( () => { throw error; } )
						.toThrowError( IllegalArgumentError, `Provided event type "invalid.event" is invalid.` );

					done();
				} );
			} );

			it( "should throw error when invalid event", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( () => resource.one( "invalid.event", "child/!*", onEvent ) )
					.toThrowError( IllegalArgumentError, `Provided event type "invalid.event" is invalid.` );
			} );

		} );


		describe( "EventEmitterDocumentsRepositoryTrait.onChildCreated", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onChildCreated ).toBeDefined();
				expect( resource.onChildCreated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onChildCreated( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.onDocumentModified", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onDocumentModified ).toBeDefined();
				expect( resource.onDocumentModified ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentModified( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.onDocumentDeleted", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onDocumentDeleted ).toBeDefined();
				expect( resource.onDocumentDeleted ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentDeleted( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.onMemberAdded", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onMemberAdded ).toBeDefined();
				expect( resource.onMemberAdded ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberAdded( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.onMemberRemoved", () => {

			it( "should exist", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onMemberRemoved ).toBeDefined();
				expect( resource.onMemberRemoved ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberRemoved( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "EventEmitterDocumentsRepositoryTrait.isDecorated", () => {

			it( "should exist", () => {
				expect( EventEmitterDocumentsRepositoryTrait.isDecorated ).toBeDefined();
				expect( EventEmitterDocumentsRepositoryTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				EventEmitterDocumentsRepositoryTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.decorate", () => {

			it( "should exist", () => {
				expect( EventEmitterDocumentsRepositoryTrait.decorate ).toBeDefined();
				expect( EventEmitterDocumentsRepositoryTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				EventEmitterDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( EventEmitterDocumentsRepositoryTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				EventEmitterDocumentsRepositoryTrait.decorate( { context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRepository", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				EventEmitterDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );
