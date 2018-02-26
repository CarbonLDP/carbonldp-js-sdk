import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberAddedDetails from "./MemberAddedDetails";
import * as Message from "./Message";

export const RDF_CLASS:string = C.MemberAdded;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	...Message.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export interface Class extends Message.Class {
	details:MemberAddedDetails.Class;
}

export default Class;
