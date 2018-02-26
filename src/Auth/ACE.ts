import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { Fragment } from "./../Fragment";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = CS.AccessControlEntry;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"granting": {
		"@id": CS.granting,
		"@type": XSD.boolean,
	},
	"permissions": {
		"@id": CS.permission,
		"@type": "@id",
		"@container": "@set",
	},
	"subjects": {
		"@id": CS.subject,
		"@type": "@id",
		"@container": "@set",
	},
	"subjectsClass": {
		"@id": CS.subjectClass,
		"@type": "@id",
	},
};

export interface Class extends Fragment {
	granting:boolean;
	permissions:Pointer[];
	subjects:Pointer[];
	subjectsClass:Pointer;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "granting" )
			&& Utils.hasPropertyDefined( object, "permissions" )
			&& Utils.hasPropertyDefined( object, "subjects" )
			&& Utils.hasPropertyDefined( object, "subjectsClass" )
			;
	}

	static createFrom<T extends Object>( object:T, granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):T & Class {
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
