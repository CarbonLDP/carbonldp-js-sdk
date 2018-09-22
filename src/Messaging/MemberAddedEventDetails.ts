import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";


export interface MemberAddedEventDetails extends MemberEventDetails {
}


export interface MemberAddedEventDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberAddedEventDetails;
const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

export const MemberAddedEventDetails:MemberAddedEventDetailsFactory = {
	TYPE,
	SCHEMA,
};

