import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ModuleDoc } from "./ModuleDoc";

export interface IndexDoc {
	modules:ModuleDoc[];
	docs:ApiDoc[];
}
