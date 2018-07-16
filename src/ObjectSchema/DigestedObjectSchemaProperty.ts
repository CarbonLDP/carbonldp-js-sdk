import { ContainerType } from "./ContainerType";
import { PointerType } from "./PointerType";


export class DigestedObjectSchemaProperty {
	uri:string = null;
	literal:boolean = null;
	literalType:string = null;
	pointerType:PointerType = null;
	language?:string;
	containerType:ContainerType = null;
}
