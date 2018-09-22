import { ContextSettings } from "./ContextSettings";


export interface Paths {
	[ document:string ]:string | DocumentPaths;
}

export interface DocumentPaths {
	paths?:Paths;
	slug?:string;
}

export interface DocumentsContextSettings extends ContextSettings {
	paths?:Paths;
}
