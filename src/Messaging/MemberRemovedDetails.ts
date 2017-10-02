import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import * as MemberDetails from "./MemberDetails";

export const RDF_CLASS:string = NS.C.Class.MemberRemovedDetails;

export const SCHEMA:ObjectSchema.Class = MemberDetails.SCHEMA;

export interface Class extends Resource.Class, MemberDetails.Class {
}

export default Class;
