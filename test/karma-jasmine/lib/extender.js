(function( window ) {
	var JasmineExtender = new function() {
		this.parse = function( descriptorString ) {
			if( descriptorString.lastIndexOf( "JSON", 0 ) === 0 ) {
				descriptorString = descriptorString.substr( 4, descriptorString.length );
				return JSON.parse( descriptorString );
			}
			else return descriptorString;
		};
		this.prettyPrint = function( descriptorString ) {
			var descriptor = this.parse( descriptorString );
			if( typeof descriptor === 'string' ) return descriptorString;
			if( typeof descriptor !== 'object' ) return descriptorString;
			if( ! descriptor.name ) return descriptorString;
			return descriptor.name;
		};
	};

	window.JE = JasmineExtender;
})( window );
