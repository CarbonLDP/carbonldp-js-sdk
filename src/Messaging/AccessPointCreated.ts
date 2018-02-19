import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentCreated from "./DocumentCreated";

export const RDF_CLASS:string = NS.C.AccessPointCreated;

export const SCHEMA:ObjectSchema.Class = DocumentCreated.SCHEMA;

export interface Class extends DocumentCreated.Class {
}

export default Class;
