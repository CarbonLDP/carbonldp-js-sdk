import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";


export interface MemberRemovedEventDetails extends MemberEventDetails {
}


export interface MemberRemovedEventDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberRemovedEventDetails;
const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

export const MemberRemovedEventDetails:MemberRemovedEventDetailsFactory = {
	TYPE,
	SCHEMA,
};
