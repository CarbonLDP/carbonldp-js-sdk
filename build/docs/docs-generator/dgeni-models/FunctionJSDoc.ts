import { ParameterContainer } from "dgeni-packages/typescript/api-doc-types/ParameterContainer";
import { JSDoc } from "./JSDoc";

export interface FunctionJSDoc extends JSDoc {
	overloads?:(ParameterContainer & FunctionJSDoc)[];
	generics?:string[];
	returns?:{ description:string };
}
