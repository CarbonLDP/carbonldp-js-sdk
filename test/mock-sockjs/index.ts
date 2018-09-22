import { WebSocket } from "mock-socket";


// TODO: Add implements SockJS.Socket when better TS support for types of mock-socket@8.x
class MockSTOMPSockJS extends WebSocket {

	constructor( url:string ) {
		super( url, "v12.stomp" );

		// TODO: thoov/mock-socket#143
		for( const eventName of [ "open", "message", "close", "error" ] ) {
			Object.defineProperty( this, `on${eventName}`, {
				configurable: true,
				enumerable: true,
				get():any {
					return this.listeners[ eventName ][ 0 ];
				},
				set( listener:any ):void {
					if( listener === null ) {
						this.listeners[ eventName ].length = 0;
					} else {
						this.listeners[ eventName ] = [ listener ];
					}
				},
			} );
		}
	}

}

export = MockSTOMPSockJS;
