import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";

export class DigestedObjectSchema {
	base:string;
	language:string;
	vocab:string;
	prefixes:Map<string, string>;
	properties:Map<string, DigestedObjectSchemaProperty>;

	constructor() {
		this.base = "";
		this.vocab = void 0;
		this.language = null;
		this.prefixes = new Map<string, string>();
		this.properties = new Map<string, DigestedObjectSchemaProperty>();
	}

}
