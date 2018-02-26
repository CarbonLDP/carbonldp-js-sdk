import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as Message from "./Message";

export const RDF_CLASS:string = C.DocumentModified;

export const SCHEMA:ObjectSchema.ObjectSchema = Message.SCHEMA;

export interface Class extends Message.Class {
}

export default Class;
