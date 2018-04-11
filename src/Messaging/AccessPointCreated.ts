import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { DocumentCreated } from "./DocumentCreated";


export interface AccessPointCreated extends DocumentCreated {
}


export interface AccessPointCreatedFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = DocumentCreated.SCHEMA;

export const AccessPointCreated:AccessPointCreatedFactory = {
	TYPE: C.AccessPointCreated,
	SCHEMA,
};
