define(
	[
		'Squire', 'src/utils/JSLogger'
	], function( Squire, JSLogger ) {

		var injector = new Squire();
		var windowMocker = injector.mock('src/utils/window', 'src/utils/window-mock');

		describe(
			'JSLogger', function() {

				it(
					'is available',
					function() {
						expect( JSLogger ).not.toBeNull();
					}
				);

				it(
					'detects when log is available',
					function() {
						expect( JSLogger.canShowLog ).toBe( true );
					}
				);

				it(
					'detects when log is not available',
					windowMocker.run( ['src/utils/JSLogger'], function( JSLogger ) {
						expect( JSLogger.canShowLog ).toBe( false );
					})
				);
			}
		);
	}
);
