import { Context } from "../../Context/Context";

import { RegisteredPointer } from "../../Registry/RegisteredPointer";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../../test/JasmineExtender";

import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/HTTPRepositoryTrait" ), () => {

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.HTTPRepositoryTrait",
		[ "MODEL extends ResolvablePointer = ResolvablePointer" ],
		"Repository trait with general HTTP requests"
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"$context",
			"CarbonLDP.Context<MODEL & RegisteredPointer, MODEL>"
		), ():void => {
			const target:HTTPRepositoryTrait[ "context" ] = {} as Context<ResolvablePointer & RegisteredPointer, ResolvablePointer>;
			expect( target ).toBeDefined();
		} );


		// TODO: Test .get
		// TODO: Test .resolve
		// TODO: Test .exists

		// TODO: Test .refresh
		// TODO: Test .save
		// TODO: Test .saveAndRefresh

		// TODO: Test .delete

		// TODO: Test ._parseResponseData

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.HTTPRepositoryTraitFactory",
		"Interface with the factory for `CarbonLDP.DocumentsRepository.Traits.HTTPRepositoryTrait` objects."
	), () => {

		// TODO: Test

	} );

	describe( property(
		STATIC,
		"HTTPRepositoryTrait",
		"CarbonLDP.DocumentsRepository.Traits.HTTPRepositoryTraitFactory"
	), () => {


		it( "should exists", ():void => {
			expect( HTTPRepositoryTrait ).toBeDefined();
			expect( HTTPRepositoryTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
