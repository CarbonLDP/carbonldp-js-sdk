export let namespace:string = "https://carbonldp.com/ns/v1/platform#";

export class Class {
	static get AccessPoint():string { return namespace + "AccessPoint"; }

	static get AccessPointCreated():string { return namespace + "AccessPointCreated"; }

	static get AddMemberAction():string { return namespace + "AddMemberAction"; }

	static get ChildCreated():string { return namespace + "ChildCreatedEvent"; }

	static get Document():string { return namespace + "Document"; }

	static get DocumentCreatedDetails():string { return namespace + "DocumentCreatedEventDetails"; }

	static get DocumentDeleted():string { return namespace + "DocumentDeleted"; }

	static get DocumentMetadata():string { return namespace + "DocumentMetadata"; }

	static get DocumentModified():string { return namespace + "DocumentModified"; }

	static get ErrorResponse():string { return namespace + "ErrorResponse"; }

	static get Error():string { return namespace + "Error"; }

	static get Instance():string { return namespace + "Instance"; }

	static get Map():string { return namespace + "Map"; }

	static get MemberAdded():string { return namespace + "MemberAddedEvent"; }

	static get MemberAddedDetails():string { return namespace + "MemberAddedEventDetails"; }

	static get MemberRemoved():string { return namespace + "MemberRemovedEvent"; }

	static get MemberRemovedDetails():string { return namespace + "MemberRemovedEventDetails"; }

	static get NonReadableMembershipResourceTriples():string { return namespace + "NonReadableMembershipResourceTriples"; }

	static get Platform():string { return namespace + "Platform"; }

	static get PreferContainer():string { return namespace + "PreferContainer"; }

	static get PreferContainmentResources():string { return namespace + "PreferContainmentResources"; }

	static get PreferContainmentTriples():string { return namespace + "PreferContainmentTriples"; }

	static get PreferDocumentETags():string { return namespace + "PreferDocumentETags"; }

	static get PreferMembershipResources():string { return namespace + "PreferMembershipResources"; }

	static get PreferMembershipTriples():string { return namespace + "PreferMembershipTriples"; }

	static get PreferResultsContext():string { return namespace + "PreferResultsContext"; }

	static get PreferSelectedMembershipTriples():string { return namespace + "PreferSelectedMembershipTriples"; }

	static get QueryMetadata():string { return namespace + "QueryMetadata"; }

	static get RDFRepresentation():string { return namespace + "RDFRepresentation"; }

	static get RemoveMemberAction():string { return namespace + "RemoveMemberAction"; }

	static get ResponseMetadata():string { return namespace + "ResponseMetadata"; }

	static get ValidationError():string { return namespace + "ValidationError"; }

	static get VolatileResource():string { return namespace + "VolatileResource"; }
}

export class Predicate {
	static get accessPoint():string { return namespace + "accessPoint"; }

	static get bNodesMap():string { return namespace + "bNodesMap"; }

	static get buildDate():string { return namespace + "buildDate"; }

	static get created():string { return namespace + "created"; }

	static get createdDocument():string { return namespace + "createdDocument"; }

	static get details():string { return namespace + "details"; }

	static get defaultInteractionModel():string { return namespace + "defaultInteractionModel"; }

	static get documentMetadata():string { return namespace + "documentMetadata"; }

	static get entry():string { return namespace + "entry"; }

	static get error():string { return namespace + "error"; }

	static get errorCode():string { return namespace + "errorCode"; }

	static get errorDetails():string { return namespace + "errorDetails"; }

	static get errorMessage():string { return namespace + "errorMessage"; }

	static get errorParameters():string { return namespace + "errorParameters"; }

	static get eTag():string { return namespace + "eTag"; }

	static get httpStatusCode():string { return namespace + "httpStatusCode"; }

	static get entryKey():string { return namespace + "key"; }

	static get mediaType():string { return namespace + "mediaType"; }

	static get member():string { return namespace + "member"; }

	static get modified():string { return namespace + "modified"; }

	static get requestID():string { return namespace + "requestID"; }

	static get relatedDocument():string { return namespace + "relatedDocument"; }

	static get size():string { return namespace + "size"; }

	static get target():string { return namespace + "target"; }

	static get targetMember():string { return namespace + "targetMember"; }

	static get entryValue():string { return namespace + "value"; }

	static get version():string { return namespace + "version"; }
}
