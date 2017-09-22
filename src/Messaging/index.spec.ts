import { isDefined, module, reexports, STATIC } from "../test/JasmineExtender";
import * as Document from "./Document";
import { Event } from "./Event";
import * as Messaging from "./index";
import { Options } from "./Options";
import * as Service from "./Service";

describe( module( "Carbon/Messaging" ), ():void => {

	it( isDefined(), ():void => {
		expect( Messaging ).toBeDefined();
		expect( Messaging ).toEqual( jasmine.any( Object ) );
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
		"Event",
		"Carbon.Messaging.Event"
	), ():void => {
		expect( Messaging.Event ).toBeDefined();
		expect( Messaging.Event ).toBe( Event );
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

} );
