define(
	[
		'Carbon/Resource'
	], function( Resource ) {
		describe(
			'Resource', function() {
				it(
					'is defined',
					function() {
						expect( Resource ).toBeDefined();
						expect( Resource ).not.toBeNull();
					}
				);
			}
		);
	}
);
