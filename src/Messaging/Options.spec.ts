import { hasDefaultExport, hasProperty, interfaze, isDefined, module, OPTIONAL } from "../test/JasmineExtender";
import * as MessagingOptions from "./Options";
import DefaultExport from "./Options";

describe( module( "Carbon/Messaging/Options" ), ():void => {

	it( isDefined(), ():void => {
		expect( MessagingOptions ).toBeDefined();
		expect( MessagingOptions ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"Carbon.Messaging.Options",
		"Options to configure the messaging service"
	), ():void => {

		it( isDefined(), ():void => {
			const target:MessagingOptions.Options = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"maxReconnectAttempts",
			"number",
			"The maximum numbers of reconnect attempts. Set to `null` of you don't want to set a limit."
		), ():void => {
			const target:MessagingOptions.Options[ "maxReconnectAttempts" ] = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"reconnectDelay",
			"number",
			"The milliseconds of wait to the next reconnecting attempt."
		), ():void => {
			const target:MessagingOptions.Options[ "reconnectDelay" ] = {} as any;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.Options" ), ():void => {
		const target:MessagingOptions.Options = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
