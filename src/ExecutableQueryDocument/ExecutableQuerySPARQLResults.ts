import { SPARQLSelectResults } from "../SPARQL/SelectResults";

/**
 * Type that represents a parsed response of an { @link ExecutableQueryDocument }'s stored query response,
 * which can have either an ASK query or a SELECT query.
 */
export type ExecutableQuerySPARQLResults =
	| SPARQLSelectResults
	| boolean;

