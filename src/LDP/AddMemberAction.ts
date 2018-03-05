import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";


export interface AddMemberAction extends Resource {
	targetMembers:Pointer[];
}


export interface AddMemberActionConstant extends ModelFactory<AddMemberAction>, ModelDecorator<AddMemberAction> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is AddMemberAction;

	create( targetMembers:Pointer[] ):AddMemberAction;
}

export const SCHEMA:ObjectSchema = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export const AddMemberAction:AddMemberActionConstant = {
	TYPE: C.AddMemberAction,
	SCHEMA,

	isDecorated( object:object ):object is AddMemberAction {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	},

	create( targetMembers:Pointer[] ):AddMemberAction {
		return Resource.createFrom( {
			types: [ AddMemberAction.TYPE ],
			targetMembers,
		} );
	},
};

export default AddMemberAction;
