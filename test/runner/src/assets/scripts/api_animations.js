jQuery( function( $ ) {

	$( document ).ready( function() {
		scrolling();
	} );
	function scrolling() {

		var offset = 220;
		var duration = 500;
		var scrollPos = 0;

		jQuery( window ).scroll( function() {
			scrollPos = $( document ).scrollTop();
			// Show back to top button
			if( jQuery( this ).scrollTop() > offset ) {
				jQuery( '.back-to-top' ).fadeIn( duration );
			} else {
				jQuery( '.back-to-top' ).fadeOut( duration );
			}
			// Set active suite (Module, Class or Interface)
			$( '.navigation-panel nav ul.side-nav li a' ).each( function() {
				var currLink = $( this );
				var refElement = $( currLink.attr( "href" ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
				//var refElement = $( '[href="' + currLink.attr( "href" ) + ']' );
				if( refElement.offset().top - 90 <= scrollPos && refElement.offset().top + refElement.height() + refElement.outerHeight() > scrollPos ) {
					$( '.navigation-panel nav ul.side-nav li a' ).removeClass( "active" );
					currLink.addClass( "active" );
				} else {
					currLink.removeClass( "active" );
				}
			} );
		} );

		jQuery( '.back-to-top' ).click( function( event ) {
			event.preventDefault();
			jQuery( 'html, body' ).animate( { scrollTop: 0 }, duration );
			return false;
		} );
	}
} );