const { WebSocket: WebSocket_ } = require( "mock-socket" );

module.exports = function( ...args ) {
	const ws = new global.WebSocket( ...args );

	// TODO: thoov/mock-socket#143
	if( ws instanceof WebSocket_ ) {
		for( const eventName of [ "open", "message", "close", "error" ] ) {
			Object.defineProperty( ws, `on${eventName}`, {
				configurable: true,
				enumerable: true,
				get() {
					return this.listeners[ eventName ][ 0 ]
				},
				set( listener ) {
					if( listener === null ) {
						this.listeners[ eventName ].length = 0;
					} else {
						this.listeners[ eventName ] = [ listener ];
					}
				},
			} );
		}
	}

	return ws;
};
