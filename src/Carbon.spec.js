define(
	[
		'Carbon'
	], function( Carbon ) {
		describe(
			'Carbon', function() {

				it(
					'is defined',
					function() {
						expect( Carbon ).not.toBeNull();
					}
				);
			}
		);
	}
);
