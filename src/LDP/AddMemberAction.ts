import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";


export interface AddMemberAction extends TransientResource {
	targetMembers:Pointer[];
}


export interface AddMemberActionFactory extends ModelFactory<AddMemberAction>, ModelDecorator<AddMemberAction> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is AddMemberAction;

	create( targetMembers:Pointer[] ):AddMemberAction;
}

const SCHEMA:ObjectSchema = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export const AddMemberAction:AddMemberActionFactory = {
	TYPE: C.AddMemberAction,
	SCHEMA,

	isDecorated( object:object ):object is AddMemberAction {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	},

	create( targetMembers:Pointer[] ):AddMemberAction {
		return TransientResource.createFrom( {
			types: [ AddMemberAction.TYPE ],
			targetMembers,
		} );
	},
};
