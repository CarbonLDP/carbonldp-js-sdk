declare const namespace: string;
declare class Class {
    static Resource: string;
    static RDFSource: string;
    static Container: string;
    static BasicContainer: string;
    static DirectContainer: string;
    static IndirectContainer: string;
    static NonRDFSource: string;
    static MemberSubject: string;
    static PreferContainment: string;
    static PreferMembership: string;
    static PreferEmptyContainer: string;
    static PreferMinimalContainer: string;
    static Page: string;
    static PageSortCriterion: string;
    static Ascending: string;
    static Descending: string;
}
declare class Predicate {
    static contains: string;
    static member: string;
    static hasMemberRelation: string;
    static memberOfRelation: string;
    static membershipResource: string;
    static insertedContentRelation: string;
    static constrainedBy: string;
    static pageSortCriteria: string;
    static pageSortOrder: string;
    static pageSortCollation: string;
    static pageSequence: string;
}
export { namespace, Class, Predicate };
