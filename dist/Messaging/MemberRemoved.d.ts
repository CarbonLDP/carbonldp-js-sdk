import * as ObjectSchema from "./../ObjectSchema";
import * as MemberRemovedDetails from "./MemberRemovedDetails";
import * as Message from "./Message";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Message.Class {
    details: MemberRemovedDetails.Class;
}
export default Class;
