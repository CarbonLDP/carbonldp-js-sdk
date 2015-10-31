const namespace:string = "http://www.w3.org/ns/ldp#";

class Class {
	static get Resource():string { return namespace + "Resource"; }

	static get RDFSource():string { return namespace + "RDFSource"; }

	static get Container():string { return namespace + "Container"; }

	static get BasicContainer():string { return namespace + "BasicContainer"; }

	static get DirectContainer():string { return namespace + "DirectContainer"; }

	static get IndirectContainer():string { return namespace + "IndirectContainer"; }

	static get NonRDFSource():string { return namespace + "NonRDFSource"; }

	static get MemberSubject():string { return namespace + "MemberSubject"; }

	static get PreferContainment():string { return namespace + "PreferContainment"; }

	static get PreferMembership():string { return namespace + "PreferMembership"; }

	static get PreferEmptyContainer():string { return namespace + "PreferEmptyContainer"; }

	static get PreferMinimalContainer():string { return namespace + "PreferMinimalContainer"; }

	static get Page():string { return namespace + "Page"; }

	static get PageSortCriterion():string { return namespace + "PageSortCriterion"; }

	static get Ascending():string { return namespace + "Ascending"; }

	static get Descending():string { return namespace + "Descending"; }
}

class Predicate {
	static get contains():string { return namespace + "contains"; }

	static get member():string { return namespace + "member"; }

	static get hasMemberRelation():string { return namespace + "hasMemberRelation"; }

	static get memberOfRelation():string { return namespace + "memberOfRelation"; }

	static get membershipResource():string { return namespace + "membershipResource"; }

	static get insertedContentRelation():string { return namespace + "insertedContentRelation"; }

	static get constrainedBy():string { return namespace + "constrainedBy"; }

	static get pageSortCriteria():string { return namespace + "pageSortCriteria"; }

	static get pageSortOrder():string { return namespace + "pageSortOrder"; }

	static get pageSortCollation():string { return namespace + "pageSortCollation"; }

	static get pageSequence():string { return namespace + "pageSequence"; }

}

//@formatter:off
export {
	namespace,
	Class,
	Predicate
};
//@formatter:on