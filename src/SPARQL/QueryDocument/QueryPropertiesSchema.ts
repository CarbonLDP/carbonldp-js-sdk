import * as QueryPropertySchema from "./QueryPropertySchema";

export interface Class  {
	[ propertyName:string ]:QueryPropertySchema.Class | string;
}

export default Class;
