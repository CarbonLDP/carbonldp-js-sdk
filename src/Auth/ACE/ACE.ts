import { ModelSchema } from "../../core/ModelSchema";
import { Fragment } from "../../Fragment";
import { ObjectSchema } from "../../ObjectSchema";
import { CS } from "../../Vocabularies";
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
}

export const ACE:ACEFactory = {
	TYPE: TransientACE.TYPE,
	SCHEMA: {
		"permissions": {
			"@id": CS.permission,
			"@type": "@id",
			"@container": "@set",
		},
		"subject": {
			"@id": CS.subject,
			"@type": "@id",
		},
	},

	create: TransientACE.create,
	createFrom: TransientACE.createFrom,
};
