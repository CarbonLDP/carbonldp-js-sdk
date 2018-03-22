import { SPARQLER } from "sparqler";
import { Container, FinishClause } from "sparqler/clauses";
import { finishDecorator } from "sparqler/clauses/decorators";

import { Documents } from "../Documents";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";

export interface FinishSPARQLSelect extends FinishClause {
	execute<T extends object>():Promise<SPARQLSelectResults<T>>;

	executeRaw():Promise<SPARQLRawResults>;
}

export class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
	constructor( documents:Documents, entryPoint:string ) {
		super( <W extends object>( container:Container<FinishSPARQLSelect>, object:W ):W & FinishSPARQLSelect => {
			const finishObject:FinishClause & W = finishDecorator( container, object );
			return Object.assign( finishObject, {
				execute: <T extends object>():Promise<SPARQLSelectResults<T>> =>
					documents.executeSELECTQuery<T>( entryPoint, finishObject.toCompactString() ),
				executeRaw: ():Promise<SPARQLRawResults> =>
					documents.executeRawSELECTQuery( entryPoint, finishObject.toCompactString() ),
			} );
		} );
	}
}

export default SPARQLBuilder;
