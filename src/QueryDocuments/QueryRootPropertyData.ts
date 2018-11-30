import { IRIToken } from "sparqler/tokens";

import { QueryContainer } from "./QueryContainer";


/**
 * Base data to create a {@link QueryRootProperty}.
 */
export interface QueryRootPropertyData {
	queryContainer:QueryContainer;
	documentIRI:IRIToken;
}
