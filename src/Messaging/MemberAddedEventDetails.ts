import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";


/**
 * Model that represents a `c:MemberAddedEventDetails`.
 */
export interface MemberAddedEventDetails extends MemberEventDetails {
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link MemberAddedEventDetails}.
 */
export interface MemberAddedEventDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberAddedEventDetails;
const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

/**
 * Constant that implements {@link MemberAddedEventDetailsFactory}.
 */
export const MemberAddedEventDetails:MemberAddedEventDetailsFactory = {
	TYPE,
	SCHEMA,
};
