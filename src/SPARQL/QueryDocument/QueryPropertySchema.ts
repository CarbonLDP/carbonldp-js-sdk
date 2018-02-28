import { QueryDocumentBuilder } from "./QueryDocumentBuilder";

export interface Class {
	"@id"?:string;
	"@type"?:"@id" | string;
	"@language"?:string;
	"@container"?:"@set" | "@list" | "@language";
	query?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder;
}

export default Class;
