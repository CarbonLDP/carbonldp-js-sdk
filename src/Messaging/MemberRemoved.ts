import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberRemovedDetails from "./MemberRemovedDetails";
import * as Message from "./Message";

export const RDF_CLASS:string = NS.C.MemberRemoved;

export const SCHEMA:ObjectSchema.Class = {
	...Message.SCHEMA,
	"details": {
		"@id": NS.C.details,
		"@type": "@id",
	},
};

export interface Class extends Message.Class {
	details:MemberRemovedDetails.Class;
}

export default Class;
