import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";


/**
 * Model that represents a `c:MemberRemovedEventDetails`.
 */
export interface MemberRemovedEventDetails extends MemberEventDetails {
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link MemberRemovedEventDetails}.
 */
export interface MemberRemovedEventDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberRemovedEventDetails;
const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

/**
 * Constant that implements {@link MemberRemovedEventDetailsFactory}.
 */
export const MemberRemovedEventDetails:MemberRemovedEventDetailsFactory = {
	TYPE,
	SCHEMA,
};
