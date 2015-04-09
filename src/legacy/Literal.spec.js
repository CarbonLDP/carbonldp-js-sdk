define(
	[
		'Carbon/utils', 'Carbon/Literal'
	], function( utils, Literal ) {
		describe(
			'Literal', function() {
				it(
					'is defined',
					function() {
						expect( Literal ).toBeDefined();
						expect( Literal ).not.toBeNull();
					}
				);

				it(
					'has property, DataTypes, which is an object that maps xsd datatype names to their URIs',
					function() {
						expect( Literal.DataTypes ).toBeDefined();
						expect( Literal.DataTypes ).not.toBeNull();
					}
				);
				it(
					'has property, InvertedDataTypes, which is an object that maps xsd datatype URIs to their names',
					function() {
						expect( Literal.InvertedDataTypes ).toBeDefined();
						expect( Literal.InvertedDataTypes ).not.toBeNull();
					}
				);

				it(
					'has method, toLiteral( value ), which creates a JSON-LD Literal based on the value type',
					function() {
						expect( Literal.toLiteral ).toBeDefined();
						expect( Literal.toLiteral ).not.toBeNull();

						expect( utils.isFunction( Literal.toLiteral ) ).toBe( true );

						// TODO: FT
					}
				);

				it(
					'has method, parseLiteral( value ), which casts JSON-LD Literal into a javascript value',
					function() {
						expect( Literal.parseLiteral ).toBeDefined();
						expect( Literal.parseLiteral ).not.toBeNull();

						expect( utils.isFunction( Literal.parseLiteral ) ).toBe( true );

						// TODO: FT
					}
				);

				it(
					'has method, isLiteral( value ), which returns true if the value is a JSON-LD Literal',
					function() {
						expect( Literal.isLiteral ).toBeDefined();
						expect( Literal.isLiteral ).not.toBeNull();

						expect( utils.isFunction( Literal.isLiteral ) ).toBe( true );

						// TODO: FT
					}
				);
			}
		);
	}
);
