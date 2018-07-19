import { SPARQLER } from "sparqler";
import { Container, FinishClause } from "sparqler/clauses";
import { finishDecorator } from "sparqler/clauses/decorators";

import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";
import { SPARQLSelectResults } from "./SelectResults";


export interface FinishSPARQLSelect extends FinishClause {
	execute<T extends object>():Promise<SPARQLSelectResults<T>>;
}

export class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
	constructor( resource:SPARQLDocumentsRepositoryTrait, entryPoint:string ) {
		super( <W extends object>( container:Container<FinishSPARQLSelect>, object:W ):W & FinishSPARQLSelect => {
			const finishObject:FinishClause & W = finishDecorator( container, object );
			return Object.assign( finishObject, {
				execute: <T extends object>():Promise<SPARQLSelectResults<T>> =>
					resource.executeSELECTQuery<T>( entryPoint, finishObject.toCompactString() ),
			} );
		} );
	}
}
