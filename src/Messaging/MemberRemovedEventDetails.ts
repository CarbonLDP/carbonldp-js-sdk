import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";
import { ModelSchema } from "../Model";


/**
 * Model that represents a `c:MemberRemovedEventDetails`.
 */
export interface MemberRemovedEventDetails extends MemberEventDetails {
}


/**
 * Factory, decorator and utils for {@link MemberRemovedEventDetails}.
 */
export type MemberRemovedEventDetailsFactory =
	& ModelSchema<C["MemberRemovedEventDetails"]>;

const SCHEMA:ObjectSchema = MemberEventDetails.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for a {@link MemberRemovedEventDetails} object.
 */
export const MemberRemovedEventDetails:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#MemberRemovedEventDetails`.
	 */
	TYPE: C["MemberRemovedEventDetails"];

	/**
	 * Schema for the {@link MemberRemovedEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = <MemberRemovedEventDetailsFactory> {
	TYPE: C.MemberRemovedEventDetails,
	SCHEMA,
};
