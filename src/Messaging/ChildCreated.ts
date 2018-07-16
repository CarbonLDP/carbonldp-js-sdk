import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentCreated } from "./DocumentCreated";


export interface ChildCreated extends DocumentCreated {
}


export interface ChildCreatedFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.ChildCreated;
const SCHEMA:ObjectSchema = DocumentCreated.SCHEMA;

export const ChildCreated:ChildCreatedFactory = {
	TYPE,
	SCHEMA,
};
