import { WebSocket } from "mock-socket";


class MockSTOMPSockJS extends WebSocket {

	constructor( url:string ) {
		url = url.startsWith( "https" )
			? `wss${ url.substr( 5 ) }`
			: url.startsWith( "http" )
				? `ws${ url.substr( 4 ) }`
				: url;

		super( url, "v12.stomp" );
	}

}

export = MockSTOMPSockJS;
