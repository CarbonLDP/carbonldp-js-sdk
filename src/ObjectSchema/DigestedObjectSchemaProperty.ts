import { ContainerType } from "./ContainerType";
import { PointerType } from "./PointerType";


export class DigestedObjectSchemaProperty {
	uri:string;
	literal:boolean = null;
	literalType:string = null;
	pointerType:PointerType = null;
	language?:string;
	containerType:ContainerType = null;

	constructor( uri:string = null ) {
		this.uri = uri;
	}
}
