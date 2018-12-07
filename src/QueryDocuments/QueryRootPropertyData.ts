import { IRIToken, LiteralToken } from "sparqler/tokens";

import { QueryContainer } from "./QueryContainer";


/**
 * Base data to create a {@link QueryRootProperty}.
 */
export interface QueryRootPropertyData {
	queryContainer:QueryContainer;
	values?:(IRIToken | LiteralToken)[];
}
