import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";


export interface QueryRootPropertyData {
	queryContainer:QueryContainer;

	name:string;

	uri:string;
	containerType:QueryContainerType;
}
