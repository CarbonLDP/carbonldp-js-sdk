import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";
import { ModelSchema } from "../Model";


/**
 * Model that represents a `c:MemberAddedEventDetails`.
 */
export interface MemberAddedEventDetails extends MemberEventDetails {
}


/**
 * Factory, decorator and utils for {@link MemberAddedEventDetails}.
 */
export type MemberAddedEventDetailsFactory =
	& ModelSchema<C["MemberAddedEventDetails"]>;

const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for a {@link MemberAddedEventDetails} object.
 */
export const MemberAddedEventDetails:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#MemberAddedEventDetails`.
	 */
	TYPE: C["MemberAddedEventDetails"];

	/**
	 * Schema for the {@link MemberAddedEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = <MemberAddedEventDetailsFactory> {
	TYPE: C.MemberAddedEventDetails,
	SCHEMA,
};
