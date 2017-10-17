import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberDetails from "./MemberDetails";

export const RDF_CLASS:string = NS.C.Class.MemberRemovedDetails;

export const SCHEMA:ObjectSchema.Class = MemberDetails.SCHEMA;

export interface Class extends MemberDetails.Class {
}

export default Class;
