declare const namespace: string;
declare class Class {
    static readonly Resource: string;
    static readonly RDFSource: string;
    static readonly Container: string;
    static readonly BasicContainer: string;
    static readonly DirectContainer: string;
    static readonly IndirectContainer: string;
    static readonly NonRDFSource: string;
    static readonly MemberSubject: string;
    static readonly PreferContainment: string;
    static readonly PreferMembership: string;
    static readonly PreferEmptyContainer: string;
    static readonly PreferMinimalContainer: string;
    static readonly Page: string;
    static readonly PageSortCriterion: string;
    static readonly Ascending: string;
    static readonly Descending: string;
}
declare class Predicate {
    static readonly contains: string;
    static readonly member: string;
    static readonly hasMemberRelation: string;
    static readonly isMemberOfRelation: string;
    static readonly membershipResource: string;
    static readonly insertedContentRelation: string;
    static readonly constrainedBy: string;
    static readonly pageSortCriteria: string;
    static readonly pageSortOrder: string;
    static readonly pageSortCollation: string;
    static readonly pageSequence: string;
}
export { namespace, Class, Predicate };
