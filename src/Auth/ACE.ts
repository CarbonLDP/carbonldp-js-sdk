import { Fragment } from "../Fragment";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

export interface ACE extends Fragment {
	granting:boolean;
	permissions:Pointer[];
	subjects:Pointer[];
	subjectsClass:Pointer;
}


export interface ACEConstant extends ModelFactory<ACE> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	is( object:object ):object is ACE;


	create( granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):ACE;

	createFrom<T extends object>( object:T, granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):T & ACE;
}


const SCHEMA:ObjectSchema = {
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

export const ACE:ACEConstant = {
	TYPE: CS.AccessControlEntry,
	SCHEMA,

	is( object:object ):object is ACE {
		return Fragment.is( object )
			&& object.hasOwnProperty( "granting" )
			&& object.hasOwnProperty( "permissions" )
			&& object.hasOwnProperty( "subjects" )
			&& object.hasOwnProperty( "subjectsClass" )
			;
	},

	create( granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):ACE {
		return ACE.createFrom( {}, granting, subjects, subjectClass, permissions );
	},

	createFrom<T extends object>( object:T, granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):T & ACE {
		const ace:T & ACE = object as T & ACE;

		Fragment.decorate( ace );

		ace.addType( ACE.TYPE );
		ace.granting = granting;
		ace.subjects = subjects;
		ace.subjectsClass = subjectClass;
		ace.permissions = permissions;

		return ace;
	},

};

export default ACE;
