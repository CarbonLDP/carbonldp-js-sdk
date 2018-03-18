import { ObjectSchema } from "../ObjectSchema";
import { MemberDetails } from "./MemberDetails";
export interface MemberAddedDetails extends MemberDetails {
}
export interface MemberAddedDetailsFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const MemberAddedDetails: MemberAddedDetailsFactory;
export default MemberAddedDetails;
