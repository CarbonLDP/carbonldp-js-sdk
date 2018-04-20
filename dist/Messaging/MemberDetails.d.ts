import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
export interface MemberDetails extends TransientResource {
    members: Pointer[];
}
export interface MemberDetailsFactory {
    SCHEMA: ObjectSchema;
}
export declare const MemberDetails: MemberDetailsFactory;
