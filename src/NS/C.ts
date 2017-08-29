export let namespace:string = "https://carbonldp.com/ns/v1/platform#";

export class Class {
	static get AccessPoint():string { return namespace + "AccessPoint"; }

	static get AddMemberAction():string { return namespace + "AddMemberAction"; }

	static get CreatedResource():string { return namespace + "CreatedResource"; }

	static get Document():string { return namespace + "Document"; }

	static get DocumentMetadata():string { return namespace + "DocumentMetadata"; }

	static get Instance():string { return namespace + "Instance"; }

	static get Map():string { return namespace + "Map"; }

	static get ModifiedResource():string { return namespace + "ModifiedResource"; }

	static get NonReadableMembershipResourceTriples():string { return namespace + "NonReadableMembershipResourceTriples"; }

	static get Platform():string { return namespace + "Platform"; }

	static get PreferContainer():string { return namespace + "PreferContainer"; }

	static get PreferContainmentResources():string { return namespace + "PreferContainmentResources"; }

	static get PreferContainmentTriples():string { return namespace + "PreferContainmentTriples"; }

	static get PreferMembershipResources():string { return namespace + "PreferMembershipResources"; }

	static get PreferMembershipTriples():string { return namespace + "PreferMembershipTriples"; }

	static get PreferSelectedMembershipTriples():string { return namespace + "PreferSelectedMembershipTriples"; }

	static get VolatileResource():string { return namespace + "VolatileResource"; }

	static get RDFRepresentation():string { return namespace + "RDFRepresentation"; }

	static get RemoveMemberAction():string { return namespace + "RemoveMemberAction"; }

	static get ErrorResponse():string { return namespace + "ErrorResponse"; }

	static get Error():string { return namespace + "Error"; }

	static get ResponseMetadata():string { return namespace + "ResponseMetadata"; }
}

export class Predicate {
	static get accessPoint():string { return namespace + "accessPoint"; }

	static get bNodesMap():string { return namespace + "bNodesMap"; }

	static get buildDate():string { return namespace + "buildDate"; }

	static get carbonCode():string { return namespace + "carbonCode"; }

	static get created():string { return namespace + "created"; }

	static get documentMetadata():string { return namespace + "documentMetadata"; }

	static get defaultInteractionModel():string { return namespace + "defaultInteractionModel"; }

	static get entry():string { return namespace + "entry"; }

	static get error():string { return namespace + "error"; }

	static get eTag():string { return namespace + "eTag"; }

	static get httpStatusCode():string { return namespace + "httpStatusCode"; }

	static get entryKey():string { return namespace + "entryKey"; }

	static get mediaType():string { return namespace + "mediaType"; }

	static get message():string { return namespace + "message"; }

	static get modified():string { return namespace + "modified"; }

	static get requestID():string { return namespace + "requestID"; }

	static get relatedDocument():string { return namespace + "relatedDocument"; }

	static get size():string { return namespace + "size"; }

	static get targetMember():string { return namespace + "targetMember"; }

	static get entryValue():string { return namespace + "entryValue"; }

	static get version():string { return namespace + "version"; }
}
