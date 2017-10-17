import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentCreated from "./DocumentCreated";

export const RDF_CLASS:string = NS.C.Class.ChildCreated;

export const SCHEMA:ObjectSchema.Class = DocumentCreated.SCHEMA;

export interface Class extends DocumentCreated.Class {
}

export default Class;
