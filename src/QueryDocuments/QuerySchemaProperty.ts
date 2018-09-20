import { Path, PathBuilder } from "sparqler/patterns";

import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";


export interface QuerySchemaProperty {
	"@id"?:string;
	"@type"?:"@id" | string;
	"@language"?:string;
	"@container"?:"@set" | "@list" | "@language";
	query?:( queryBuilder:SubQueryDocumentsBuilder ) => SubQueryDocumentsBuilder;
	path?:( pathBuilder:PathBuilder ) => Path;
}
