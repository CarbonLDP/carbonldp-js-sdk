import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

export interface ModelSchema<TYPE extends string = string> {
	TYPE:TYPE;
	SCHEMA:ObjectSchema;
}

export const ModelSchema:{
	is( object:object ):object is ModelSchema;
} = {
	is( object:object ):object is ModelSchema {
		return "TYPE" in object
			&& "SCHEMA" in object
			;
	},
};
