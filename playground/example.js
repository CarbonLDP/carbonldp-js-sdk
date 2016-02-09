(function() {

	var carbon = new Carbon();

	// Define classes and properties
	carbon.extendObjectSchema( "ex:BlogPost", {
		"title": {
			"@id": "ex:title",
			"@type": "xsd:string"
		}
	});

	var username = $( "input[name=username]" ).val();
	var password = $( "input[name=password]" ).val();

	var myBlog;
	var blogPosts;

	carbon.Auth.authenticate( username, password ).then( function() {
		// Authenticated

		return carbon.apps.get( "my-blog" );
	} ).then( function( processedResult ) {
		myBlog = processedResult.result;

		return myBlog.Documents.get( "blogPosts/" );
	} ).then( function( processedResult ) {
		var blogPostsContainer = processedResult.result;

		blogPosts = blogPostsContainer.members;
		var promises = [];
		blogPosts.forEach( function( blogPost ) {
			promises.push( blogPost.fetch() );
		} );

		return Promise.all( promises );
	} ).then( function() {
		blogPosts.forEach( function( blogPost ) {
			new XWidget({
				data: blogPost,
				// ...
			} ).render();
		});
	} );

})();