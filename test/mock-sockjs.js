const { WebSocket } = require( "mock-socket" );

function MockSTOMPSockJS( url ) {
	if( url.startsWith( "https" ) ) url = "wss" + url.substr( 5 );
	else if( url.startsWith( "http" ) ) url = "ws" + url.substr( 4 );

	return new WebSocket( url, "v12.stomp" );
}

module.exports = MockSTOMPSockJS;
