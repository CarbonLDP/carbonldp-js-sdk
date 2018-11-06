import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { OldModuleDoc } from "./OldModuleDoc";

export interface IndexDocument {
	modules:OldModuleDoc[];
	docs:ApiDoc[];
}
