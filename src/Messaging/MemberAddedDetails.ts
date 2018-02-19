import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as MemberDetails from "./MemberDetails";

export const RDF_CLASS:string = NS.C.MemberAddedDetails;

export const SCHEMA:ObjectSchema.Class = MemberDetails.SCHEMA;

export interface Class extends MemberDetails.Class {
}

export default Class;
