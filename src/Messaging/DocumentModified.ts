import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


export interface DocumentModified extends EventMessage {
}


export interface DocumentModifiedFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.DocumentModified;
const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

export const DocumentModified:DocumentModifiedFactory = {
	TYPE,
	SCHEMA,
};
