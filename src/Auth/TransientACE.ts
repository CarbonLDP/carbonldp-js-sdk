import { TransientFragment } from "../TransientFragment";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

export interface TransientACE extends TransientFragment {
	granting:boolean;
	permissions:Pointer[];
	subjects:Pointer[];
	subjectsClass:Pointer;
}


export interface TransientACEFactory extends ModelFactory<TransientACE> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	is( object:object ):object is TransientACE;


	create( granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):TransientACE;

	createFrom<T extends object>( object:T, granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):T & TransientACE;
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

export const TransientACE:TransientACEFactory = {
	TYPE: CS.AccessControlEntry,
	SCHEMA,

	is( object:object ):object is TransientACE {
		return TransientFragment.is( object )
			&& object.hasOwnProperty( "granting" )
			&& object.hasOwnProperty( "permissions" )
			&& object.hasOwnProperty( "subjects" )
			&& object.hasOwnProperty( "subjectsClass" )
			;
	},

	create( granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):TransientACE {
		return TransientACE.createFrom( {}, granting, subjects, subjectClass, permissions );
	},

	createFrom<T extends object>( object:T, granting:boolean, subjects:Pointer[], subjectClass:Pointer, permissions:Pointer[] ):T & TransientACE {
		const ace:T & TransientACE = object as T & TransientACE;

		TransientFragment.decorate( ace );

		ace.addType( TransientACE.TYPE );
		ace.granting = granting;
		ace.subjects = subjects;
		ace.subjectsClass = subjectClass;
		ace.permissions = permissions;

		return ace;
	},

};
