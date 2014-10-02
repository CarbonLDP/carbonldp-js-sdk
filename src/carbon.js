(function(global, $, jsonld, Map) {
	if ( ! $ ) {
		console.error( "The Carbon LDP JavaScript library depends on jQuery. Please include it on the source code." );
		return null;
	}

	if ( ! jsonld ) {
		console.error( "The Carbon LDP JavaScript library depends on JSON-LD. Please include it on the source code." );
		return null;
	}
	if ( ! Map ) {
		console.error( "The Carbon LDP JavaScript library depends on the Map library. Please include it on the source code." );
		return null;
	}

	var _private = {};

	// INSERT MODULES HERE

}(this, $, jsonld, Map));