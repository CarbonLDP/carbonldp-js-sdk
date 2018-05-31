import { BaseDocument } from "../../Document";

export interface BaseRole extends BaseDocument {
	name:string;
	description?:string;
}
