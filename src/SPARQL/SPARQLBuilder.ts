import { FinishFactory, SPARQLER } from "sparqler";
import { FinishClause } from "sparqler/clauses";

import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";
import { SPARQLSelectResults } from "./SelectResults";


export interface FinishSPARQLSelect extends FinishClause {
	execute<T extends object>():Promise<SPARQLSelectResults<T>>;
}

export interface FinishSPARQLAsk extends FinishClause {
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


export class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect, FinishSPARQLAsk> {
	constructor( resource:SPARQLDocumentsRepositoryTrait, entryPoint:string ) {
		const finishSelectFactory:FinishFactory<FinishSPARQLSelect> = getFinishSelectFactory( resource, entryPoint );
		const finishAskFactory:FinishFactory<FinishSPARQLAsk> = getFinishAskFactory( resource, entryPoint );

		super( finishSelectFactory, finishAskFactory );
	}
}
