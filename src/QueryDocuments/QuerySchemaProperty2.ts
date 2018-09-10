import { Path } from "sparqler/patterns/paths/Path";
import { PathBuilder } from "sparqler/patterns/paths/PathBuilder";

import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder2";


export interface QuerySchemaProperty2 {
	"@id"?:string;
	"@type"?:"@id" | string;
	"@language"?:string;
	"@container"?:"@set" | "@list" | "@language";
	query?:( queryBuilder:SubQueryDocumentsBuilder ) => SubQueryDocumentsBuilder;
	path?:( pathBuilder:PathBuilder ) => Path;
}
