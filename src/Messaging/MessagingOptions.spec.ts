import { hasProperty, interfaze, isDefined, module, OPTIONAL } from "../test/JasmineExtender";

import { MessagingOptions } from "./MessagingOptions";


describe( module( "carbonldp/Messaging/MessagingOptions" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MessagingOptions",
		"Options to configure the messaging service"
	), ():void => {

		it( isDefined(), ():void => {
			const target:MessagingOptions = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"maxReconnectAttempts",
			"number",
			"The maximum numbers of reconnect attempts. Set to `null` of you don't want to set a limit."
		), ():void => {
			const target:MessagingOptions[ "maxReconnectAttempts" ] = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"reconnectDelay",
			"number",
			"The milliseconds of wait to the next reconnecting attempt."
		), ():void => {
			const target:MessagingOptions[ "reconnectDelay" ] = {} as any;
			expect( target ).toBeDefined();
		} );

	} );

} );