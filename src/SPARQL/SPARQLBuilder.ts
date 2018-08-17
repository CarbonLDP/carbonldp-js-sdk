import { FinishFactory, SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";

import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";
import { SPARQLSelectResults } from "./SelectResults";


export interface FinishSPARQLSelect extends FinishClause {
	execute<T extends object>():Promise<SPARQLSelectResults<T>>;
}


function getFinishSelectFactory( resource:SPARQLDocumentsRepositoryTrait, entryPoint:string ):FinishFactory<FinishSPARQLSelect> {
	return ( container, object ) => {
		const finishClause:FinishClause & typeof object = FinishClause.createFrom( container, object );

		return Object.assign( finishClause, {
			execute: <T extends object>() => resource.executeSELECTQuery<T>( entryPoint, finishClause.toCompactString() ),
		} );
	};
}


export class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
	constructor( resource:SPARQLDocumentsRepositoryTrait, entryPoint:string ) {
		const finishSelectFactory:FinishFactory<FinishSPARQLSelect> = getFinishSelectFactory( resource, entryPoint );

		super( finishSelectFactory );
	}
}
