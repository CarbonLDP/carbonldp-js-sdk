import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface MemberDetails extends Resource {
    members: Pointer[];
}
export interface MemberDetailsConstant {
    SCHEMA: ObjectSchema;
}
export declare const MemberDetails: MemberDetailsConstant;
export default MemberDetails;
