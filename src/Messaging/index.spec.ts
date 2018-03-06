import {
	isDefined,
	module,
	reexports,
	STATIC
} from "../test/JasmineExtender";

import * as Messaging from "./";

import * as AccessPointCreated from "./AccessPointCreated";
import * as ChildCreated from "./ChildCreated";
import * as Document from "./Document";
import * as DocumentCreated from "./DocumentCreated";
import * as DocumentCreatedDetails from "./DocumentCreatedDetails";
import * as DocumentDeleted from "./DocumentDeleted";
import * as DocumentModified from "./DocumentModified";
import { Event } from "./Event";
import * as EventMessage from "./EventMessage";
import * as MemberAdded from "./MemberAdded";
import * as MemberAddedDetails from "./MemberAddedDetails";
import * as MemberDetails from "./MemberDetails";
import * as MemberRemoved from "./MemberRemoved";
import * as MemberRemovedDetails from "./MemberRemovedDetails";
import * as Options from "./Options";
import * as Service from "./Service";
import * as Utils from "./Utils";


describe( module( "CarbonLDP/Messaging" ), ():void => {

	it( isDefined(), ():void => {
		expect( Messaging ).toBeDefined();
		expect( Messaging ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"AccessPointCreated",
		"CarbonLDP/Messaging/AccessPointCreated"
	), ():void => {
		expect( Messaging.AccessPointCreated ).toBeDefined();
		expect( Messaging.AccessPointCreated ).toBe( AccessPointCreated );
	} );

	it( reexports(
		STATIC,
		"ChildCreated",
		"CarbonLDP/Messaging/ChildCreated"
	), ():void => {
		expect( Messaging.ChildCreated ).toBeDefined();
		expect( Messaging.ChildCreated ).toBe( ChildCreated );
	} );

	it( reexports(
		STATIC,
		"Document",
		"CarbonLDP/Messaging/Document"
	), ():void => {
		expect( Messaging.Document ).toBeDefined();
		expect( Messaging.Document ).toBe( Document );
	} );

	it( reexports(
		STATIC,
		"DocumentCreated",
		"CarbonLDP/Messaging/DocumentCreated"
	), ():void => {
		expect( Messaging.DocumentCreated ).toBeDefined();
		expect( Messaging.DocumentCreated ).toBe( DocumentCreated );
	} );

	it( reexports(
		STATIC,
		"DocumentCreatedDetails",
		"CarbonLDP/Messaging/DocumentCreatedDetails"
	), ():void => {
		expect( Messaging.DocumentCreatedDetails ).toBeDefined();
		expect( Messaging.DocumentCreatedDetails ).toBe( DocumentCreatedDetails );
	} );

	it( reexports(
		STATIC,
		"DocumentDeleted",
		"CarbonLDP/Messaging/DocumentDeleted"
	), ():void => {
		expect( Messaging.DocumentDeleted ).toBeDefined();
		expect( Messaging.DocumentDeleted ).toBe( DocumentDeleted );
	} );

	it( reexports(
		STATIC,
		"DocumentModified",
		"CarbonLDP/Messaging/DocumentModified"
	), ():void => {
		expect( Messaging.DocumentModified ).toBeDefined();
		expect( Messaging.DocumentModified ).toBe( DocumentModified );
	} );

	it( reexports(
		STATIC,
		"Event",
		"CarbonLDP.Messaging.Event"
	), ():void => {
		expect( Messaging.Event ).toBeDefined();
		expect( Messaging.Event ).toBe( Event );
	} );

	it( reexports(
		STATIC,
		"MemberAdded",
		"CarbonLDP/Messaging/MemberAdded"
	), ():void => {
		expect( Messaging.MemberAdded ).toBeDefined();
		expect( Messaging.MemberAdded ).toBe( MemberAdded );
	} );

	it( reexports(
		STATIC,
		"MemberAddedDetails",
		"CarbonLDP/Messaging/MemberAddedDetails"
	), ():void => {
		expect( Messaging.MemberAddedDetails ).toBeDefined();
		expect( Messaging.MemberAddedDetails ).toBe( MemberAddedDetails );
	} );

	it( reexports(
		STATIC,
		"MemberDetails",
		"CarbonLDP/Messaging/MemberDetails"
	), ():void => {
		expect( Messaging.MemberDetails ).toBeDefined();
		expect( Messaging.MemberDetails ).toBe( MemberDetails );
	} );

	it( reexports(
		STATIC,
		"MemberRemoved",
		"CarbonLDP/Messaging/MemberRemoved"
	), ():void => {
		expect( Messaging.MemberRemoved ).toBeDefined();
		expect( Messaging.MemberRemoved ).toBe( MemberRemoved );
	} );

	it( reexports(
		STATIC,
		"MemberRemovedDetails",
		"CarbonLDP/Messaging/MemberRemovedDetails"
	), ():void => {
		expect( Messaging.MemberRemovedDetails ).toBeDefined();
		expect( Messaging.MemberRemovedDetails ).toBe( MemberRemovedDetails );
	} );

	it( reexports(
		STATIC,
		"EventMessage",
		"CarbonLDP/Messaging/EventMessage"
	), ():void => {
		expect( Messaging.EventMessage ).toBeDefined();
		expect( Messaging.EventMessage ).toBe( EventMessage );
	} );

	it( reexports(
		STATIC,
		"Options",
		"CarbonLDP/Messaging/Options"
	), ():void => {
		expect( Messaging.Options ).toBeDefined();
		expect( Messaging.Options ).toBe( Options );
	} );

	it( reexports(
		STATIC,
		"Service",
		"CarbonLDP/Messaging/Service"
	), ():void => {
		expect( Messaging.Service ).toBeDefined();
		expect( Messaging.Service ).toBe( Service );
	} );

	it( reexports(
		STATIC,
		"Utils",
		"CarbonLDP/Messaging/Utils"
	), ():void => {
		expect( Messaging.Utils ).toBeDefined();
		expect( Messaging.Utils ).toBe( Utils );
	} );

} );
