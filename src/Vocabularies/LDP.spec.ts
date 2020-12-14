import { LDP } from "./LDP";


describe( "LDP", ():void => {

	it( "should exist", ():void => {
		expect( LDP ).toEqual( jasmine.any( Object ) );
	} );

	it( "should test all exported IRIs", ():void => {
		expect( Object.keys( LDP ).length ).toBe( 29 );
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
