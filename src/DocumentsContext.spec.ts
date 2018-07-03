import * as CarbonLDP from "./CarbonLDP";
import { DocumentsContext } from "./DocumentsContext";
import * as Messaging from "./Messaging";
import { MessagingService } from "./Messaging";
import {
	constructor,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	module
} from "./test/JasmineExtender";

describe( module( "carbonldp/DocumentsContext" ), () => {

	describe( interfaze(
		"CarbonLDP.DocumentsContext",
		"Context that manages the `CarbonLDP.Documents` objects."
	), () => {

		it( hasProperty(
			INSTANCE,
			"messaging",
			"CarbonLDP.Messaging.MessagingService",
			"Service that contains the RAW methods to manage the messaging/real-time features."
		), ():void => {
			const target:DocumentsContext[ "messaging" ] = {} as MessagingService;
			expect( target ).toBeDefined();
		} );


		describe( constructor(), () => {

			it( hasSignature(
				[
					{ name: "url", type: "string", description: "The base URL of the context." },
					{ name: "settings", type: "CarbonLDP.ContextSettings", optional: true, description: "Customizable settings of the context" },
				]
			), () => {} );

			it( "should be instantiable", () => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
				expect( context ).toEqual( jasmine.any( DocumentsContext ) );
			} );


			it( "should initialize CarbonLDP.messaging", ():void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
				expect( context.messaging ).toEqual( jasmine.any( Messaging.MessagingService ) );
			} );

		} );

	} );

} );
