import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberAddedDetails from "./MemberAddedDetails";
import * as Message from "./Message";

export const RDF_CLASS:string = NS.C.Class.MemberAdded;

export const SCHEMA:ObjectSchema.Class = {
	...Message.SCHEMA,
	"details": {
		"@id": NS.C.Predicate.details,
		"@type": "@id",
	},
};

export interface Class extends Message.Class {
	details:MemberAddedDetails.Class;
}

export default Class;
