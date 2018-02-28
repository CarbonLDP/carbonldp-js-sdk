import { SPARQLER } from "sparqler";
import { Container, FinishClause } from "sparqler/clauses";
import { finishDecorator } from "sparqler/clauses/decorators";

import { Documents } from "../Documents";
import { Response } from "../HTTP/Response";
import RawResults from "./RawResults";
import SELECTResults from "./SELECTResults";

export interface FinishSPARQLSelect extends FinishClause {
	execute<T extends object>():Promise<[ SELECTResults<T>, Response ]>;

	executeRaw():Promise<[ RawResults, Response ]>;
}

export class SPARQLBuilder extends SPARQLER<FinishSPARQLSelect> {
	constructor( documents:Documents, entryPoint:string ) {
		super( <W extends object>( container:Container<FinishSPARQLSelect>, object:W ):W & FinishSPARQLSelect => {
			const finishObject:FinishClause & W = finishDecorator( container, object );
			return Object.assign( finishObject, {
				execute: <T extends object>():Promise<[ SELECTResults<T>, Response ]> =>
					documents.executeSELECTQuery<T>( entryPoint, finishObject.toCompactString() ),
				executeRaw: ():Promise<[ RawResults, Response ]> =>
					documents.executeRawSELECTQuery( entryPoint, finishObject.toCompactString() ),
			} );
		} );
	}
}

export default SPARQLBuilder;
