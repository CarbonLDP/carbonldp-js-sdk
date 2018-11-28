import { hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../test/JasmineExtender";

import { LDP } from "./LDP";


describe( module( "carbonldp/Vocabularies/LDP" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Vocabularies.LDP",
		"Interface that describes the used vocabulary defined for the W3C Linked Data Platform (LDP)"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"namespace",
			"string"
		), ():void => {
			const target:LDP[ "namespace" ] = "http://www.w3.org/ns/ldp#";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Resource",
			"string"
		), ():void => {
			const target:LDP[ "Resource" ] = "http://www.w3.org/ns/ldp#Resource";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"RDFSource",
			"string"
		), ():void => {
			const target:LDP[ "RDFSource" ] = "http://www.w3.org/ns/ldp#RDFSource";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Container",
			"string"
		), ():void => {
			const target:LDP[ "Container" ] = "http://www.w3.org/ns/ldp#Container";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"BasicContainer",
			"string"
		), ():void => {
			const target:LDP[ "BasicContainer" ] = "http://www.w3.org/ns/ldp#BasicContainer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"DirectContainer",
			"string"
		), ():void => {
			const target:LDP[ "DirectContainer" ] = "http://www.w3.org/ns/ldp#DirectContainer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"IndirectContainer",
			"string"
		), ():void => {
			const target:LDP[ "IndirectContainer" ] = "http://www.w3.org/ns/ldp#IndirectContainer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"NonRDFSource",
			"string"
		), ():void => {
			const target:LDP[ "NonRDFSource" ] = "http://www.w3.org/ns/ldp#NonRDFSource";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"MemberSubject",
			"string"
		), ():void => {
			const target:LDP[ "MemberSubject" ] = "http://www.w3.org/ns/ldp#MemberSubject";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"PreferContainment",
			"string"
		), ():void => {
			const target:LDP[ "PreferContainment" ] = "http://www.w3.org/ns/ldp#PreferContainment";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"PreferMembership",
			"string"
		), ():void => {
			const target:LDP[ "PreferMembership" ] = "http://www.w3.org/ns/ldp#PreferMembership";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"PreferEmptyContainer",
			"string"
		), ():void => {
			const target:LDP[ "PreferEmptyContainer" ] = "http://www.w3.org/ns/ldp#PreferEmptyContainer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"PreferMinimalContainer",
			"string"
		), ():void => {
			const target:LDP[ "PreferMinimalContainer" ] = "http://www.w3.org/ns/ldp#PreferMinimalContainer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Page",
			"string"
		), ():void => {
			const target:LDP[ "Page" ] = "http://www.w3.org/ns/ldp#Page";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"PageSortCriterion",
			"string"
		), ():void => {
			const target:LDP[ "PageSortCriterion" ] = "http://www.w3.org/ns/ldp#PageSortCriterion";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Ascending",
			"string"
		), ():void => {
			const target:LDP[ "Ascending" ] = "http://www.w3.org/ns/ldp#Ascending";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Descending",
			"string"
		), ():void => {
			const target:LDP[ "Descending" ] = "http://www.w3.org/ns/ldp#Descending";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"contains",
			"string"
		), ():void => {
			const target:LDP[ "contains" ] = "http://www.w3.org/ns/ldp#contains";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"member",
			"string"
		), ():void => {
			const target:LDP[ "member" ] = "http://www.w3.org/ns/ldp#member";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"string"
		), ():void => {
			const target:LDP[ "hasMemberRelation" ] = "http://www.w3.org/ns/ldp#hasMemberRelation";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"isMemberOfRelation",
			"string"
		), ():void => {
			const target:LDP[ "isMemberOfRelation" ] = "http://www.w3.org/ns/ldp#isMemberOfRelation";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"string"
		), ():void => {
			const target:LDP[ "membershipResource" ] = "http://www.w3.org/ns/ldp#membershipResource";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"string"
		), ():void => {
			const target:LDP[ "insertedContentRelation" ] = "http://www.w3.org/ns/ldp#insertedContentRelation";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"constrainedBy",
			"string"
		), ():void => {
			const target:LDP[ "constrainedBy" ] = "http://www.w3.org/ns/ldp#constrainedBy";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"pageSortCriteria",
			"string"
		), ():void => {
			const target:LDP[ "pageSortCriteria" ] = "http://www.w3.org/ns/ldp#pageSortCriteria";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"pageSortOrder",
			"string"
		), ():void => {
			const target:LDP[ "pageSortOrder" ] = "http://www.w3.org/ns/ldp#pageSortOrder";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"pageSortCollation",
			"string"
		), ():void => {
			const target:LDP[ "pageSortCollation" ] = "http://www.w3.org/ns/ldp#pageSortCollation";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"pageSequence",
			"string"
		), ():void => {
			const target:LDP[ "pageSequence" ] = "http://www.w3.org/ns/ldp#pageSequence";
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"LDP",
		"CarbonLDP.Vocabularies.LDP",
		"Constant that implements the used vocabulary defined for the W3C Linked Data Platform (LDP)"
	), ():void => {

		it( "should exist", ():void => {
			expect( LDP ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( LDP ).length ).toBe( 28 );
		} );

		it( "LDP.namespace", ():void => {
			expect( LDP.namespace ).toEqual( jasmine.any( String ) );
			expect( LDP.namespace ).toBe( "http://www.w3.org/ns/ldp#" );
		} );

		it( "LDP.Resource", ():void => {
			expect( LDP.Resource ).toEqual( jasmine.any( String ) );
			expect( LDP.Resource ).toBe( "http://www.w3.org/ns/ldp#Resource" );
		} );

		it( "LDP.RDFSource", ():void => {
			expect( LDP.RDFSource ).toEqual( jasmine.any( String ) );
			expect( LDP.RDFSource ).toBe( "http://www.w3.org/ns/ldp#RDFSource" );
		} );

		it( "LDP.Container", ():void => {
			expect( LDP.Container ).toEqual( jasmine.any( String ) );
			expect( LDP.Container ).toBe( "http://www.w3.org/ns/ldp#Container" );
		} );

		it( "LDP.BasicContainer", ():void => {
			expect( LDP.BasicContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.BasicContainer ).toBe( "http://www.w3.org/ns/ldp#BasicContainer" );
		} );

		it( "LDP.DirectContainer", ():void => {
			expect( LDP.DirectContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.DirectContainer ).toBe( "http://www.w3.org/ns/ldp#DirectContainer" );
		} );

		it( "LDP.IndirectContainer", ():void => {
			expect( LDP.IndirectContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.IndirectContainer ).toBe( "http://www.w3.org/ns/ldp#IndirectContainer" );
		} );

		it( "LDP.NonRDFSource", ():void => {
			expect( LDP.NonRDFSource ).toEqual( jasmine.any( String ) );
			expect( LDP.NonRDFSource ).toBe( "http://www.w3.org/ns/ldp#NonRDFSource" );
		} );

		it( "LDP.MemberSubject", ():void => {
			expect( LDP.MemberSubject ).toEqual( jasmine.any( String ) );
			expect( LDP.MemberSubject ).toBe( "http://www.w3.org/ns/ldp#MemberSubject" );
		} );

		it( "LDP.PreferContainment", ():void => {
			expect( LDP.PreferContainment ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferContainment ).toBe( "http://www.w3.org/ns/ldp#PreferContainment" );
		} );

		it( "LDP.PreferMembership", ():void => {
			expect( LDP.PreferMembership ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferMembership ).toBe( "http://www.w3.org/ns/ldp#PreferMembership" );
		} );

		it( "LDP.PreferEmptyContainer", ():void => {
			expect( LDP.PreferEmptyContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferEmptyContainer ).toBe( "http://www.w3.org/ns/ldp#PreferEmptyContainer" );
		} );

		it( "LDP.PreferMinimalContainer", ():void => {
			expect( LDP.PreferMinimalContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferMinimalContainer ).toBe( "http://www.w3.org/ns/ldp#PreferMinimalContainer" );
		} );

		it( "LDP.Page", ():void => {
			expect( LDP.Page ).toEqual( jasmine.any( String ) );
			expect( LDP.Page ).toBe( "http://www.w3.org/ns/ldp#Page" );
		} );

		it( "LDP.PageSortCriterion", ():void => {
			expect( LDP.PageSortCriterion ).toEqual( jasmine.any( String ) );
			expect( LDP.PageSortCriterion ).toBe( "http://www.w3.org/ns/ldp#PageSortCriterion" );
		} );

		it( "LDP.Ascending", ():void => {
			expect( LDP.Ascending ).toEqual( jasmine.any( String ) );
			expect( LDP.Ascending ).toBe( "http://www.w3.org/ns/ldp#Ascending" );
		} );

		it( "LDP.Descending", ():void => {
			expect( LDP.Descending ).toEqual( jasmine.any( String ) );
			expect( LDP.Descending ).toBe( "http://www.w3.org/ns/ldp#Descending" );
		} );

		it( "LDP.contains", ():void => {
			expect( LDP.contains ).toEqual( jasmine.any( String ) );
			expect( LDP.contains ).toBe( "http://www.w3.org/ns/ldp#contains" );
		} );

		it( "LDP.member", ():void => {
			expect( LDP.member ).toEqual( jasmine.any( String ) );
			expect( LDP.member ).toBe( "http://www.w3.org/ns/ldp#member" );
		} );

		it( "LDP.hasMemberRelation", ():void => {
			expect( LDP.hasMemberRelation ).toEqual( jasmine.any( String ) );
			expect( LDP.hasMemberRelation ).toBe( "http://www.w3.org/ns/ldp#hasMemberRelation" );
		} );

		it( "LDP.isMemberOfRelation", ():void => {
			expect( LDP.isMemberOfRelation ).toEqual( jasmine.any( String ) );
			expect( LDP.isMemberOfRelation ).toBe( "http://www.w3.org/ns/ldp#isMemberOfRelation" );
		} );

		it( "LDP.membershipResource", ():void => {
			expect( LDP.membershipResource ).toEqual( jasmine.any( String ) );
			expect( LDP.membershipResource ).toBe( "http://www.w3.org/ns/ldp#membershipResource" );
		} );

		it( "LDP.insertedContentRelation", ():void => {
			expect( LDP.insertedContentRelation ).toEqual( jasmine.any( String ) );
			expect( LDP.insertedContentRelation ).toBe( "http://www.w3.org/ns/ldp#insertedContentRelation" );
		} );

		it( "LDP.constrainedBy", ():void => {
			expect( LDP.constrainedBy ).toEqual( jasmine.any( String ) );
			expect( LDP.constrainedBy ).toBe( "http://www.w3.org/ns/ldp#constrainedBy" );
		} );

		it( "LDP.pageSortCriteria", ():void => {
			expect( LDP.pageSortCriteria ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSortCriteria ).toBe( "http://www.w3.org/ns/ldp#pageSortCriteria" );
		} );

		it( "LDP.pageSortOrder", ():void => {
			expect( LDP.pageSortOrder ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSortOrder ).toBe( "http://www.w3.org/ns/ldp#pageSortOrder" );
		} );

		it( "LDP.pageSortCollation", ():void => {
			expect( LDP.pageSortCollation ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSortCollation ).toBe( "http://www.w3.org/ns/ldp#pageSortCollation" );
		} );

		it( "LDP.pageSequence", ():void => {
			expect( LDP.pageSequence ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSequence ).toBe( "http://www.w3.org/ns/ldp#pageSequence" );
		} );

	} );

} );
