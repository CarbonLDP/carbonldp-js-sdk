define(
	[
		'Carbon/REST'
	], function( REST ) {
		describe(
			'REST', function() {

				it(
					'is defined',
					function() {
						expect( REST ).not.toBeNull();
					}
				);
				it(
					'can get an api description',
					function( done ) {
						REST.get( 'https://carbonldp.com/api' ).then(
							function( api ) {
								expect( api ).not.toBeNull();
								done();
							}
						);
					}
				);
			}
		);
	}
);
