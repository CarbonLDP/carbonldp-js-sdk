import { QuerySchemaProperty2 } from "./QuerySchemaProperty2";


export interface QuerySchema2 {
	[ propertyName:string ]:QuerySchemaProperty2 | string;
}
