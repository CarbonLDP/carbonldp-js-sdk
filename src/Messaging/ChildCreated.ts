import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentCreated from "./DocumentCreated";

export const RDF_CLASS:string = C.ChildCreated;

export const SCHEMA:ObjectSchema.Class = DocumentCreated.SCHEMA;

export interface Class extends DocumentCreated.Class {
}

export default Class;
