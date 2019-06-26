import { IRIToken, LiteralToken } from "sparqler/tokens";

import { QueryContainer } from "./QueryContainer";
import { QueryRootPropertyType } from "./QueryRootPropertyType";


/**
 * Base data to create a {@link QueryRootProperty}.
 */
export interface QueryRootPropertyData {
	queryContainer:QueryContainer;
	rootPropertyType:QueryRootPropertyType;

	values?:(IRIToken | LiteralToken)[];
	containerIRI?:IRIToken;
}
