import { ObjectSchema } from "../ObjectSchema";
import { MemberDetails } from "./MemberDetails";
export interface MemberAddedDetails extends MemberDetails {
}
export interface MemberAddedDetailsConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const MemberAddedDetails: MemberAddedDetailsConstant;
export default MemberAddedDetails;
