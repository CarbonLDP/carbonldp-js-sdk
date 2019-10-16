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

const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for a {@link MemberRemovedEventDetails} object.
 */
export const MemberRemovedEventDetails:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#MemberRemovedEventDetails'
	 */
	TYPE: C["MemberRemovedEventDetails"];

	/**
	 * Defines the basic schema for the {@link MemberRemovedEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.MemberRemovedEventDetails,
	SCHEMA,
};
