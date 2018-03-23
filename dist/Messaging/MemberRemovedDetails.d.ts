import { ObjectSchema } from "../ObjectSchema";
import { MemberDetails } from "./MemberDetails";
export interface MemberRemovedDetails extends MemberDetails {
}
export interface MemberRemovedDetailsFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const TYPE: string;
export declare const SCHEMA: ObjectSchema;
export declare const MemberRemovedDetails: MemberRemovedDetailsFactory;
