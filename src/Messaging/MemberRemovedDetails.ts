import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { MemberDetails } from "./MemberDetails";


export interface MemberRemovedDetails extends MemberDetails {
}


export interface MemberRemovedDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberRemovedDetails;
const SCHEMA:ObjectSchema = MemberDetails.SCHEMA;

export const MemberRemovedDetails:MemberRemovedDetailsFactory = {
	TYPE,
	SCHEMA,
};
