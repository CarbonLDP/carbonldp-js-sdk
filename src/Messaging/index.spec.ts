import { isDefined, module, reexports, STATIC } from "../test/JasmineExtender";

import * as AccessPointCreated from "./AccessPointCreated";
import * as ChildCreated from "./ChildCreated";
import * as Document from "./Document";
import * as DocumentCreated from "./DocumentCreated";
import * as DocumentCreatedDetails from "./DocumentCreatedDetails";
import * as DocumentDeleted from "./DocumentDeleted";
import * as DocumentModified from "./DocumentModified";
import { Event } from "./Event";
import * as Messaging from "./index";
import * as MemberAdded from "./MemberAdded";
import * as MemberAddedDetails from "./MemberAddedDetails";
import * as MemberDetails from "./MemberDetails";
import * as MemberRemoved from "./MemberRemoved";
import * as MemberRemovedDetails from "./MemberRemovedDetails";
import * as Message from "./Message";
import { Options } from "./Options";
import * as Service from "./Service";
import * as Utils from "./Utils";


describe( module( "Carbon/Messaging" ), ():void => {

	it( isDefined(), ():void => {
		expect( Messaging ).toBeDefined();
		expect( Messaging ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"AccessPointCreated",
		"Carbon/Messaging/AccessPointCreated"
	), ():void => {
		expect( Messaging.AccessPointCreated ).toBeDefined();
		expect( Messaging.AccessPointCreated ).toBe( AccessPointCreated );
	} );

	it( reexports(
		STATIC,
		"ChildCreated",
		"Carbon/Messaging/ChildCreated"
	), ():void => {
		expect( Messaging.ChildCreated ).toBeDefined();
		expect( Messaging.ChildCreated ).toBe( ChildCreated );
	} );

	it( reexports(
		STATIC,
		"Document",
		"Carbon/Messaging/Document"
	), ():void => {
		expect( Messaging.Document ).toBeDefined();
		expect( Messaging.Document ).toBe( Document );
	} );

	it( reexports(
		STATIC,
		"DocumentCreated",
		"Carbon/Messaging/DocumentCreated"
	), ():void => {
		expect( Messaging.DocumentCreated ).toBeDefined();
		expect( Messaging.DocumentCreated ).toBe( DocumentCreated );
	} );

	it( reexports(
		STATIC,
		"DocumentCreatedDetails",
		"Carbon/Messaging/DocumentCreatedDetails"
	), ():void => {
		expect( Messaging.DocumentCreatedDetails ).toBeDefined();
		expect( Messaging.DocumentCreatedDetails ).toBe( DocumentCreatedDetails );
	} );

	it( reexports(
		STATIC,
		"DocumentDeleted",
		"Carbon/Messaging/DocumentDeleted"
	), ():void => {
		expect( Messaging.DocumentDeleted ).toBeDefined();
		expect( Messaging.DocumentDeleted ).toBe( DocumentDeleted );
	} );

	it( reexports(
		STATIC,
		"DocumentModified",
		"Carbon/Messaging/DocumentModified"
	), ():void => {
		expect( Messaging.DocumentModified ).toBeDefined();
		expect( Messaging.DocumentModified ).toBe( DocumentModified );
	} );

	it( reexports(
		STATIC,
		"Event",
		"Carbon.Messaging.Event"
	), ():void => {
		expect( Messaging.Event ).toBeDefined();
		expect( Messaging.Event ).toBe( Event );
	} );

	it( reexports(
		STATIC,
		"MemberAdded",
		"Carbon.Messaging.MemberAdded"
	), ():void => {
		expect( Messaging.MemberAdded ).toBeDefined();
		expect( Messaging.MemberAdded ).toBe( MemberAdded );
	} );

	it( reexports(
		STATIC,
		"MemberAddedDetails",
		"Carbon.Messaging.MemberAddedDetails"
	), ():void => {
		expect( Messaging.MemberAddedDetails ).toBeDefined();
		expect( Messaging.MemberAddedDetails ).toBe( MemberAddedDetails );
	} );

	it( reexports(
		STATIC,
		"MemberDetails",
		"Carbon.Messaging.MemberDetails"
	), ():void => {
		expect( Messaging.MemberDetails ).toBeDefined();
		expect( Messaging.MemberDetails ).toBe( MemberDetails );
	} );

	it( reexports(
		STATIC,
		"MemberRemoved",
		"Carbon.Messaging.MemberRemoved"
	), ():void => {
		expect( Messaging.MemberRemoved ).toBeDefined();
		expect( Messaging.MemberRemoved ).toBe( MemberRemoved );
	} );

	it( reexports(
		STATIC,
		"MemberRemovedDetails",
		"Carbon.Messaging.MemberRemovedDetails"
	), ():void => {
		expect( Messaging.MemberRemovedDetails ).toBeDefined();
		expect( Messaging.MemberRemovedDetails ).toBe( MemberRemovedDetails );
	} );

	it( reexports(
		STATIC,
		"Message",
		"Carbon.Messaging.Message"
	), ():void => {
		expect( Messaging.Message ).toBeDefined();
		expect( Messaging.Message ).toBe( Message );
	} );

	it( reexports(
		STATIC,
		"Options",
		"Carbon.Messaging.Options"
	), ():void => {
		const target:Messaging.Options = {} as Options;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"Service",
		"Carbon/Messaging/Service"
	), ():void => {
		expect( Messaging.Service ).toBeDefined();
		expect( Messaging.Service ).toBe( Service );
	} );

	it( reexports(
		STATIC,
		"Utils",
		"Carbon/Messaging/Utils"
	), ():void => {
		expect( Messaging.Utils ).toBeDefined();
		expect( Messaging.Utils ).toBe( Utils );
	} );

} );
