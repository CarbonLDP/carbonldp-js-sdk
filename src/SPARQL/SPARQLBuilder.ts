import { FinishFactory, SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";

import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";
import { SPARQLSelectResults } from "./SelectResults";


/**
 * Clause that extends the query builder allowing to execute the request for the SELECT built query.
 */
export interface FinishSPARQLSelect extends FinishClause {
	/**
	 * Executes the SPARQL query.
	 */
	execute<T extends object>():Promise<SPARQLSelectResults<T>>;
}

/**
 * Clause that extends the query builder allowing to execute the request for the ASK built query.
 */
export interface FinishSPARQLAsk extends FinishClause {
	/**
	 * Executes the SPARQL query.
	 */
	execute():Promise<boolean>;
}


function getFinishSelectFactory( resource:SPARQLDocumentsRepositoryTrait, entryPoint:string ):FinishFactory<FinishSPARQLSelect> {
	return ( container, object ) => {
		const finishClause:FinishClause & typeof object = FinishClause.createFrom( container, object );

		return Object.assign( finishClause, {
			execute: <T extends object>() => resource.executeSELECTQuery<T>( entryPoint, finishClause.toCompactString() ),
		} );
	};
}

function getFinishAskFactory( resource:SPARQLDocumentsRepositoryTrait, entryPoint:string ):FinishFactory<FinishSPARQLAsk> {
	return ( container, object ) => {
		const finishClause:FinishClause & typeof object = FinishClause.createFrom( container, object );

		return Object.assign( finishClause, {
			execute: () => resource.executeASKQuery( entryPoint, finishClause.toCompactString() ),
		} );
	};
}


/**
 * Customized SPARQLER class to be used by the SDK.
 */
export class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect, FinishSPARQLAsk> {
	/**
	 * @param repository The repository where the builder is been constructed from.
	 * @param entryPoint The entry point URI where the query can be executed from.
	 */
	constructor( repository:SPARQLDocumentsRepositoryTrait, entryPoint:string ) {
		const finishSelectFactory:FinishFactory<FinishSPARQLSelect> = getFinishSelectFactory( repository, entryPoint );
		const finishAskFactory:FinishFactory<FinishSPARQLAsk> = getFinishAskFactory( repository, entryPoint );

		super( finishSelectFactory, finishAskFactory );
	}
}
