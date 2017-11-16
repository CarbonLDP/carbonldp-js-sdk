import { DigestedObjectSchema } from "../../ObjectSchema";
import { OptionalToken } from "sparqler/tokens";
import { M as MUtils } from "../../Utils";
import * as URI from "../../RDF/URI";
import { IllegalArgumentError } from "../../Errors";

export class Class {
	readonly schema:DigestedObjectSchema;
	readonly query:OptionalToken[];

	constructor( schema:DigestedObjectSchema, query:OptionalToken[], partialData?:Class ) {
		this.schema = schema;
		this.query = query;
	}

}

export default Class;
