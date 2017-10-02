import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import * as MemberDetails from "./MemberDetails";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class, MemberDetails.Class {
}
export default Class;
