import { QueryContainer } from "./QueryContainer";
import { QueryRootContainerType } from "./QueryRootContainerType";


export interface QueryRootPropertyData {
	queryContainer:QueryContainer;

	name:string;

	uri:string;
	containerType?:QueryRootContainerType;
}
