import { ModelSchema } from "../../core/ModelSchema";
import { Fragment } from "../../Fragment";
import { ObjectSchema } from "../../ObjectSchema";
import {
	CS,
	XSD
} from "../../Vocabularies";
import { ACL } from "../ACL";
import {
	TransientACE,
	TransientACEFactory
} from "./TransientACE";


export interface ACE extends TransientACE, Fragment {
	_document:ACL;
}


export interface ACEFactory extends ModelSchema, TransientACEFactory {
	TYPE:CS[ "AccessControlEntry" ];
	SCHEMA:ObjectSchema;


	is( value:any ):value is ACE;
}

export const ACE:ACEFactory = {
	TYPE: TransientACE.TYPE,
	SCHEMA: {
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
	},


	is( value:any ):value is ACE {
		return Fragment.is( value )
			&& value.hasType( ACE.TYPE )
			;
	},


	create: TransientACE.create,
	createFrom: TransientACE.createFrom,
};
