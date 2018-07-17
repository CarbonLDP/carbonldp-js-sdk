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
			const target:HTTPRepositoryTrait[ "$context" ] = {} as Context<ResolvablePointer & RegisteredPointer, ResolvablePointer>;
			expect( target ).toBeDefined();
		} );


		// TODO: Document & Test .$get
		// TODO: Document & Test .$resolve
		// TODO: Document & Test .$exists

		// TODO: Document & Test .$refresh
		// TODO: Document & Test .$save
		// TODO: Document & Test .$saveAndRefresh

		// TODO: Document & Test .$delete

		// TODO: Document & Test ._parseResponseData

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.HTTPRepositoryTraitFactory",
		"Interface with the factory for `CarbonLDP.DocumentsRepository.Traits.HTTPRepositoryTrait` objects."
	), () => {

		// TODO: Document & Test

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
