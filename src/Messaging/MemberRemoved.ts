import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberRemovedDetails from "./MemberRemovedDetails";
import * as Message from "./Message";

export const RDF_CLASS:string = C.MemberRemoved;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	...Message.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export interface Class extends Message.Class {
	details:MemberRemovedDetails.Class;
}

export default Class;
