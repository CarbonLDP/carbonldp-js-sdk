import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { EventMessage } from "./EventMessage";


export interface DocumentDeleted extends EventMessage {
}


export interface DocumentDeletedConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.DocumentDeleted;
const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

export const DocumentDeleted:DocumentDeletedConstant = {
	TYPE,
	SCHEMA,
};


export default DocumentDeleted;
