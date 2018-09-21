import { IRIToken } from "sparqler/tokens";

import { QueryContainer } from "./QueryContainer";


export interface QueryRootPropertyData {
	queryContainer:QueryContainer;
	documentIRI:IRIToken;
}
