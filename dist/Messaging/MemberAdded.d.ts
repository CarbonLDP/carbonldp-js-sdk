import * as ObjectSchema from "./../ObjectSchema";
import * as MemberAddedDetails from "./MemberAddedDetails";
import * as Message from "./Message";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Message.Class {
    details: MemberAddedDetails.Class;
}
export default Class;
