(function( carbon, product ) {
	carbon.extendObjectSchema( "ex:Product", {
		"price": {
			"@id": "ex:price",
			"@type": "xsd:float"
		}
	} );

	// ...

	product.price = 12.5;

	product.save().then( function( processedResult ) {
		// Product updated in the server
	} ).catch( function( error ) {
		// There was an error saving the document
	} );

	// ...

})( carbon, {} );