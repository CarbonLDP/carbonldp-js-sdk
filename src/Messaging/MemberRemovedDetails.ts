import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberDetails from "./MemberDetails";

export const RDF_CLASS:string = C.MemberRemovedDetails;

export const SCHEMA:ObjectSchema.ObjectSchema = MemberDetails.SCHEMA;

export interface Class extends MemberDetails.Class {
}

export default Class;
