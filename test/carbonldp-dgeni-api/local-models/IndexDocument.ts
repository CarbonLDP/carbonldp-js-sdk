import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ModuleDoc } from "./ModuleDoc";

export interface IndexDocument {
	modules:ModuleDoc[];
	docs:ApiDoc[];
}
