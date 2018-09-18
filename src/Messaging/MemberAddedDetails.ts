import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberDetails } from "./MemberDetails";


export interface MemberAddedDetails extends MemberDetails {
}


export interface MemberAddedDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberAddedEventDetails;
const SCHEMA:ObjectSchema = MemberDetails.SCHEMA;

export const MemberAddedDetails:MemberAddedDetailsFactory = {
	TYPE,
	SCHEMA,
};

