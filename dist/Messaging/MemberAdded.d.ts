import { ObjectSchema } from "../ObjectSchema";
import { EventMessage } from "./EventMessage";
import { MemberAddedDetails } from "./MemberAddedDetails";
export interface MemberAdded extends EventMessage {
    details: MemberAddedDetails;
}
export interface MemberAddedFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const MemberAdded: MemberAddedFactory;
export default MemberAdded;
