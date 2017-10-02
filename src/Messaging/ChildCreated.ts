import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Message from "./Message";

export const RDF_CLASS:string = NS.C.Class.ChildCreated;

export const SCHEMA:ObjectSchema.Class = Message.SCHEMA;

export interface Class extends Message.Class {
}

export default Class;
