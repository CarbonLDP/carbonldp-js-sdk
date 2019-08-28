$( document ).ready( function() {

	// Sidebar behaviour
	$( ".js-sidebar-toggler" ).click( function() {
		if( $( window ).width() <= 768 ) {
			$( ".main-container__menu" )
				.toggleClass( "in-mobile" )
				.addClass( "visible" )
			;
		} else {
			$( ".main-container__menu" )
				.toggleClass( "visible" )
				.addClass( "in-mobile" )
			;
		}
	} );

	// Search behaviour
	$( ".js-search" )
		.search( {
			source: window._searchSource,
			searchFields: [
				"title"
			],
			selectFirstResult: true,
			searchFullText: false,
			regExp: {
				escape: /[\-\[\]\/{}()*+?.\\^$|]/g,
				beginsWith: "(.*)"
			},
			onSelect: function( result ) {
				window.location = result.url;
			}
		} );
} );