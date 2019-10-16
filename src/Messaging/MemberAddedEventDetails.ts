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

const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for a {@link MemberAddedEventDetails} object.
 */
export const MemberAddedEventDetails:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#MemberAddedEventDetails'
	 */
	TYPE: C["MemberAddedEventDetails"];

	/**
	 * Defines the basic schema for the {@link MemberAddedEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.MemberAddedEventDetails,
	SCHEMA,
};
