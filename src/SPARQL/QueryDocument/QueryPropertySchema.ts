export interface Class {
	"@id"?:string;
	"@type"?:"@id" | string;
	"@language"?:string;
	"@container"?:"@set" | "@list" | "@language";
	// "@query":( builder:QueryPropertyBuilder ) => QueryDocumentGetter;
}

export default Class;
