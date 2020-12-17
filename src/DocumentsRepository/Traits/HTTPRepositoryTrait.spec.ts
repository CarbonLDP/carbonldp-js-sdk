import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";


describe( "HTTPRepositoryTrait", () => {

	it( "should exist", () => {
		expect( HTTPRepositoryTrait ).toBeDefined();
		expect( HTTPRepositoryTrait ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {

		// TODO: Test .get
		// TODO: Test .resolve
		// TODO: Test .exists
		// TODO: Test .execute

		// TODO: Test .refresh
		// TODO: Test .save
		// TODO: Test .saveAndRefresh

		// TODO: Test .delete

		// TODO: Test ._parseResponseData

	} );

	describe( "[[factory]]", () => {

		// TODO: Test

	} );

} );
