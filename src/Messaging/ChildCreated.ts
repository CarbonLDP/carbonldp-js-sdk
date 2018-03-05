import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { DocumentCreated } from "./DocumentCreated";


export interface ChildCreated extends DocumentCreated {
}


export interface ChildCreatedConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.ChildCreated;
const SCHEMA:ObjectSchema = DocumentCreated.SCHEMA;

export const ChildCreated:ChildCreatedConstant = {
	TYPE,
	SCHEMA,
};

export default ChildCreated;
