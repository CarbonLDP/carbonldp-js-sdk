import { FunctionExportDoc } from "dgeni-packages/typescript/api-doc-types/FunctionExportDoc";
import { JSDoc } from "./JSDoc";

export type FunctionJSDoc = JSDoc & {
	returns?:{ description:string };
};

export type ExtendedFunctionExportDoc = FunctionExportDoc & FunctionJSDoc & { overloads:FunctionJSDoc[] };
