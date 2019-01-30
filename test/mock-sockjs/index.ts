import { WebSocket } from "mock-socket";


// TODO: Add implements SockJS.Socket when better TS support for types of mock-socket@8.x
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
