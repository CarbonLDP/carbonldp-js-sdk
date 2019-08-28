import { Extension } from "nunjucks";

export interface Tag extends Extension {
	process( context:object, content:() => string ):string;
}