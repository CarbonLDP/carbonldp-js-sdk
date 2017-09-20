import * as Document from "../Document";
import * as DocumentedDocument from "../DocumentedDocument";
import * as Documents from "../Documents";
import { clazz, extendsClass, hasDefaultExport, hasMethod, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";
import * as MessagingDocument from "./Document";
import DefaultExport from "./Document";

describe( module( "Carbon/Messaging/Document" ), ():void => {

	it( isDefined(), ():void => {
		expect( MessagingDocument ).toBeDefined();
		expect( MessagingDocument ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"Carbon.Messaging.Document.Class",
		"Interface with the methods required to have messaging/real-time capabilities."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MessagingDocument.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.DocumentedDocument.Class" ), ():void => {
			const target:DocumentedDocument.Class = {} as MessagingDocument.Class;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"on",
			"Subscribe to the specified document event notifications.",
			[
				{ name: "event", type: "Carbon.Messaging.Event", description: "The event to subscribe for its notifications." },
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "on" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"off",
			"Remove a subscription that contains the document event and onEvent callback provided.",
			[
				{ name: "event", type: "Carbon.Messaging.Event", description: "The event of the subscription to remove." },
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "off" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"one",
			"Subscribe to only one notification to the document event provided",
			[
				{ name: "event", type: "Carbon.Messaging.Event", description: "The event to subscribe for one notification." },
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "one" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onDocumentCreated",
			"Subscribe to the `Carbon.Messaging.Event.DOCUMENT_CREATED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onDocumentCreated" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );
		it( hasMethod(
			OBLIGATORY,
			"onChildCreated",
			"Subscribe to the `Carbon.Messaging.Event.CHILD_CREATED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onChildCreated" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );
		it( hasMethod(
			OBLIGATORY,
			"onAccessPointCreated",
			"Subscribe to the `Carbon.Messaging.Event.ACCESS_POINT_CREATED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onAccessPointCreated" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );
		it( hasMethod(
			OBLIGATORY,
			"onDocumentModified",
			"Subscribe to the `Carbon.Messaging.Event.DOCUMENT_MODIFIED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onDocumentModified" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );
		it( hasMethod(
			OBLIGATORY,
			"onDocumentDeleted",
			"Subscribe to the `Carbon.Messaging.Event.DOCUMENT_DELETED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onDocumentDeleted" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );
		it( hasMethod(
			OBLIGATORY,
			"onMemberAdded",
			"Subscribe to the `Carbon.Messaging.Event.MEMBER_ADDED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onMemberAdded" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );
		it( hasMethod(
			OBLIGATORY,
			"onMemberRemoved",
			"Subscribe to the `Carbon.Messaging.Event.MEMBER_REMOVED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( data:Carbon.RDF.Node.Class[] ) => void", description: "Callback that receives the data from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument.Class[ "onMemberRemoved" ] = ( ...params:any[] ) => void 0;
			expect( target ).toBeDefined();
		} );

	} );

	describe( clazz(
		"Carbon.Messaging.Document.Factory",
		"Factory class for `Carbon.Messaging.Document.Class` objects."
	), ():void => {

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the specific properties of the `Carbon.Messaging.Document.Class` interface.",
			[
				{ name: "object", type: "object", description: "The object to be tested." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( MessagingDocument.Factory.hasClassProperties ).toBeDefined();
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.DocumentedDocument.Class" ],
			"Decorates the provided document with the properties od the `Carbon.Messaging.Document.Class` interface",
			[
				{ name: "object", type: "T", description: "Object to be decorated" },
			],
			{ type: "T & Carbon.Messaging.Document.Class" }
		), ():void => {
			expect( MessagingDocument.Factory.decorate ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.Document.Class" ), ():void => {
		const target:MessagingDocument.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

describe( "Carbon.Messaging.Document.Factory", ():void => {

	it( "should exists", ():void => {
		expect( MessagingDocument.Factory ).toBeDefined();
		expect( MessagingDocument.Factory ).toEqual( jasmine.any( Function ) );
	} );

	describe( "hasClassProperties", ():void => {

		it( "should exists", ():void => {
			expect( DocumentedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( DocumentedDocument.Factory.hasClassProperties ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return false if falsy is provided", ():void => {
			expect( MessagingDocument.Factory.hasClassProperties( void 0 ) ).toBe( false );
			expect( MessagingDocument.Factory.hasClassProperties( null ) ).toBe( false );
		} );

		it( "should return false if has a missing class property", ():void => {
			const object:Partial<MessagingDocument.Class> = {
				on: () => {},
				off: () => {},
				one: () => {},
				onDocumentCreated: () => {},
				onChildCreated: () => {},
				onAccessPointCreated: () => {},
				onDocumentModified: () => {},
				onDocumentDeleted: () => {},
				onMemberAdded: () => {},
				onMemberRemoved: () => {},
			};

			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.on;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.on = ():void => {};

			delete object.off;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.off = ():void => {};

			delete object.one;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.one = ():void => {};

			delete object.onDocumentCreated;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onDocumentCreated = ():void => {};

			delete object.onChildCreated;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onChildCreated = ():void => {};

			delete object.onAccessPointCreated;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onAccessPointCreated = ():void => {};

			delete object.onDocumentModified;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onDocumentModified = ():void => {};

			delete object.onDocumentDeleted;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onDocumentDeleted = ():void => {};

			delete object.onMemberAdded;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onMemberAdded = ():void => {};

			delete object.onMemberRemoved;
			expect( MessagingDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.onMemberRemoved = ():void => {};
		} );

	} );

	describe( "decorate", ():void => {

		it( "should exists", ():void => {
			expect( MessagingDocument.Factory.decorate ).toBeDefined();
			expect( MessagingDocument.Factory.decorate ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the same reference of the object provided", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const base:DocumentedDocument.Class = DocumentedDocument.Factory.decorate( Document.Factory.create(), documents );

			const target:MessagingDocument.Class = MessagingDocument.Factory.decorate( base );
			expect( base ).toBe( target );
		} );

		it( "should not decorate if already has the specific properties", ():void => {
			const documents:Documents.Class = new Documents.Class();

			const methodsFunction:() => void = () => {};
			const base:DocumentedDocument.Class = DocumentedDocument.Factory.decorate( Document.Factory.createFrom( {
				on: methodsFunction,
				off: methodsFunction,
				one: methodsFunction,
				onDocumentCreated: methodsFunction,
				onChildCreated: methodsFunction,
				onAccessPointCreated: methodsFunction,
				onDocumentModified: methodsFunction,
				onDocumentDeleted: methodsFunction,
				onMemberAdded: methodsFunction,
				onMemberRemoved: methodsFunction,
			} ), documents );

			const target:MessagingDocument.Class = MessagingDocument.Factory.decorate( base );
			expect( target ).toEqual( jasmine.objectContaining( {
				on: methodsFunction,
				off: methodsFunction,
				one: methodsFunction,
				onDocumentCreated: methodsFunction,
				onChildCreated: methodsFunction,
				onAccessPointCreated: methodsFunction,
				onDocumentModified: methodsFunction,
				onDocumentDeleted: methodsFunction,
				onMemberAdded: methodsFunction,
				onMemberRemoved: methodsFunction,
			} ) );
		} );

		it( "should add the new properties", ():void => {
			const documents:Documents.Class = new Documents.Class();
			const base:DocumentedDocument.Class = DocumentedDocument.Factory.decorate( Document.Factory.create(), documents );

			const target:MessagingDocument.Class = MessagingDocument.Factory.decorate( base );
			expect( target ).toEqual( jasmine.objectContaining( {
				on: jasmine.any( Function ),
				off: jasmine.any( Function ),
				one: jasmine.any( Function ),
				onDocumentCreated: jasmine.any( Function ),
				onChildCreated: jasmine.any( Function ),
				onAccessPointCreated: jasmine.any( Function ),
				onDocumentModified: jasmine.any( Function ),
				onDocumentDeleted: jasmine.any( Function ),
				onMemberAdded: jasmine.any( Function ),
				onMemberRemoved: jasmine.any( Function ),
			} ) );
		} );

	} );

} );
