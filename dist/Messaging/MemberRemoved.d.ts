import { ObjectSchema } from "../ObjectSchema";
import { EventMessage } from "./EventMessage";
import { MemberRemovedDetails } from "./MemberRemovedDetails";
export interface MemberRemoved extends EventMessage {
    details: MemberRemovedDetails;
}
export interface MemberRemovedConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const MemberRemoved: MemberRemovedConstant;
export default MemberRemoved;
