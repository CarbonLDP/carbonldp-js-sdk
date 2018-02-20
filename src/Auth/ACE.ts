import * as Fragment from "./../Fragment";
import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.AccessControlEntry;

export const SCHEMA:ObjectSchema.Class = {
	"granting": {
		"@id": NS.CS.granting,
		"@type": NS.XSD.boolean,
	},
	"permissions": {
		"@id": NS.CS.permission,
		"@type": "@id",
		"@container": "@set",
	},
	"subjects": {
		"@id": NS.CS.subject,
		"@type": "@id",
		"@container": "@set",
	},
	"subjectsClass": {
		"@id": NS.CS.subjectClass,
		"@type": "@id",
	},
};

export interface Class extends Fragment.Class {
	granting:boolean;
	permissions:Pointer.Class[];
	subjects:Pointer.Class[];
	subjectsClass:Pointer.Class;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "granting" )
			&& Utils.hasPropertyDefined( object, "permissions" )
			&& Utils.hasPropertyDefined( object, "subjects" )
			&& Utils.hasPropertyDefined( object, "subjectsClass" )
			;
	}

	static createFrom<T extends Object>( object:T, granting:boolean, subjects:Pointer.Class[], subjectClass:Pointer.Class, permissions:Pointer.Class[] ):T & Class {
		let ace:T & Class = <any> object;

		if( ! ace.types ) ace.types = [];
		ace.types.push( RDF_CLASS );

		ace.granting = granting;
		ace.subjects = subjects;
		ace.subjectsClass = subjectClass;
		ace.permissions = permissions;

		return ace;
	}

}

export default Class;
