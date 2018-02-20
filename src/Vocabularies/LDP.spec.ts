import {
	hasProperty,
	INSTANCE,
	module,
	namespaze,
} from "../test/JasmineExtender";

import { LDP } from "./LDP";

describe( module( "Carbon/Vocabularies/LDP" ), ():void => {

	describe( namespaze( "Carbon.Vocabularies.LDP", "Vocabulary defined for the W3C Linked Data Platform (LDP)" ), ():void => {

		it( "should exists", ():void => {
			expect( LDP ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( LDP ).length ).toBe( 28 );
		} );

		it( hasProperty(
			INSTANCE,
			"namespace",
			"string"
		), ():void => {
			expect( LDP.namespace ).toEqual( jasmine.any( String ) );
			expect( LDP.namespace ).toBe( "http://www.w3.org/ns/ldp#" );
		} );

		it( hasProperty(
			INSTANCE,
			"Resource",
			"string"
		), ():void => {
			expect( LDP.Resource ).toEqual( jasmine.any( String ) );
			expect( LDP.Resource ).toBe( "http://www.w3.org/ns/ldp#Resource" );
		} );

		it( hasProperty(
			INSTANCE,
			"RDFSource",
			"string"
		), ():void => {
			expect( LDP.RDFSource ).toEqual( jasmine.any( String ) );
			expect( LDP.RDFSource ).toBe( "http://www.w3.org/ns/ldp#RDFSource" );
		} );

		it( hasProperty(
			INSTANCE,
			"Container",
			"string"
		), ():void => {
			expect( LDP.Container ).toEqual( jasmine.any( String ) );
			expect( LDP.Container ).toBe( "http://www.w3.org/ns/ldp#Container" );
		} );

		it( hasProperty(
			INSTANCE,
			"BasicContainer",
			"string"
		), ():void => {
			expect( LDP.BasicContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.BasicContainer ).toBe( "http://www.w3.org/ns/ldp#BasicContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"DirectContainer",
			"string"
		), ():void => {
			expect( LDP.DirectContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.DirectContainer ).toBe( "http://www.w3.org/ns/ldp#DirectContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"IndirectContainer",
			"string"
		), ():void => {
			expect( LDP.IndirectContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.IndirectContainer ).toBe( "http://www.w3.org/ns/ldp#IndirectContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"NonRDFSource",
			"string"
		), ():void => {
			expect( LDP.NonRDFSource ).toEqual( jasmine.any( String ) );
			expect( LDP.NonRDFSource ).toBe( "http://www.w3.org/ns/ldp#NonRDFSource" );
		} );

		it( hasProperty(
			INSTANCE,
			"MemberSubject",
			"string"
		), ():void => {
			expect( LDP.MemberSubject ).toEqual( jasmine.any( String ) );
			expect( LDP.MemberSubject ).toBe( "http://www.w3.org/ns/ldp#MemberSubject" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferContainment",
			"string"
		), ():void => {
			expect( LDP.PreferContainment ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferContainment ).toBe( "http://www.w3.org/ns/ldp#PreferContainment" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferMembership",
			"string"
		), ():void => {
			expect( LDP.PreferMembership ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferMembership ).toBe( "http://www.w3.org/ns/ldp#PreferMembership" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferEmptyContainer",
			"string"
		), ():void => {
			expect( LDP.PreferEmptyContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferEmptyContainer ).toBe( "http://www.w3.org/ns/ldp#PreferEmptyContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferMinimalContainer",
			"string"
		), ():void => {
			expect( LDP.PreferMinimalContainer ).toEqual( jasmine.any( String ) );
			expect( LDP.PreferMinimalContainer ).toBe( "http://www.w3.org/ns/ldp#PreferMinimalContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"Page",
			"string"
		), ():void => {
			expect( LDP.Page ).toEqual( jasmine.any( String ) );
			expect( LDP.Page ).toBe( "http://www.w3.org/ns/ldp#Page" );
		} );

		it( hasProperty(
			INSTANCE,
			"PageSortCriterion",
			"string"
		), ():void => {
			expect( LDP.PageSortCriterion ).toEqual( jasmine.any( String ) );
			expect( LDP.PageSortCriterion ).toBe( "http://www.w3.org/ns/ldp#PageSortCriterion" );
		} );

		it( hasProperty(
			INSTANCE,
			"Ascending",
			"string"
		), ():void => {
			expect( LDP.Ascending ).toEqual( jasmine.any( String ) );
			expect( LDP.Ascending ).toBe( "http://www.w3.org/ns/ldp#Ascending" );
		} );

		it( hasProperty(
			INSTANCE,
			"Descending",
			"string"
		), ():void => {
			expect( LDP.Descending ).toEqual( jasmine.any( String ) );
			expect( LDP.Descending ).toBe( "http://www.w3.org/ns/ldp#Descending" );
		} );

		it( hasProperty(
			INSTANCE,
			"contains",
			"string"
		), ():void => {
			expect( LDP.contains ).toEqual( jasmine.any( String ) );
			expect( LDP.contains ).toBe( "http://www.w3.org/ns/ldp#contains" );
		} );

		it( hasProperty(
			INSTANCE,
			"member",
			"string"
		), ():void => {
			expect( LDP.member ).toEqual( jasmine.any( String ) );
			expect( LDP.member ).toBe( "http://www.w3.org/ns/ldp#member" );
		} );

		it( hasProperty(
			INSTANCE,
			"hasMemberRelation",
			"string"
		), ():void => {
			expect( LDP.hasMemberRelation ).toEqual( jasmine.any( String ) );
			expect( LDP.hasMemberRelation ).toBe( "http://www.w3.org/ns/ldp#hasMemberRelation" );
		} );

		it( hasProperty(
			INSTANCE,
			"isMemberOfRelation",
			"string"
		), ():void => {
			expect( LDP.isMemberOfRelation ).toEqual( jasmine.any( String ) );
			expect( LDP.isMemberOfRelation ).toBe( "http://www.w3.org/ns/ldp#isMemberOfRelation" );
		} );

		it( hasProperty(
			INSTANCE,
			"membershipResource",
			"string"
		), ():void => {
			expect( LDP.membershipResource ).toEqual( jasmine.any( String ) );
			expect( LDP.membershipResource ).toBe( "http://www.w3.org/ns/ldp#membershipResource" );
		} );

		it( hasProperty(
			INSTANCE,
			"insertedContentRelation",
			"string"
		), ():void => {
			expect( LDP.insertedContentRelation ).toEqual( jasmine.any( String ) );
			expect( LDP.insertedContentRelation ).toBe( "http://www.w3.org/ns/ldp#insertedContentRelation" );
		} );

		it( hasProperty(
			INSTANCE,
			"constrainedBy",
			"string"
		), ():void => {
			expect( LDP.constrainedBy ).toEqual( jasmine.any( String ) );
			expect( LDP.constrainedBy ).toBe( "http://www.w3.org/ns/ldp#constrainedBy" );
		} );

		it( hasProperty(
			INSTANCE,
			"pageSortCriteria",
			"string"
		), ():void => {
			expect( LDP.pageSortCriteria ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSortCriteria ).toBe( "http://www.w3.org/ns/ldp#pageSortCriteria" );
		} );

		it( hasProperty(
			INSTANCE,
			"pageSortOrder",
			"string"
		), ():void => {
			expect( LDP.pageSortOrder ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSortOrder ).toBe( "http://www.w3.org/ns/ldp#pageSortOrder" );
		} );

		it( hasProperty(
			INSTANCE,
			"pageSortCollation",
			"string"
		), ():void => {
			expect( LDP.pageSortCollation ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSortCollation ).toBe( "http://www.w3.org/ns/ldp#pageSortCollation" );
		} );

		it( hasProperty(
			INSTANCE,
			"pageSequence",
			"string"
		), ():void => {
			expect( LDP.pageSequence ).toEqual( jasmine.any( String ) );
			expect( LDP.pageSequence ).toBe( "http://www.w3.org/ns/ldp#pageSequence" );
		} );

	} );

} );
