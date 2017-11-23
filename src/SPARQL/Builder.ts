import { SPARQLER } from "sparqler";
import { Container, FinishClause } from "sparqler/clauses";
import { finishDecorator } from "sparqler/clauses/decorators";

import Documents from "./../Documents";
import HTTPResponse from "./../HTTP/Response";
import RawResults from "./RawResults";
import SELECTResults from "./SELECTResults";

export interface ExecuteSelect extends FinishClause {
	execute<T extends object>():Promise<[ SELECTResults<T>, HTTPResponse ]>;

	executeRaw():Promise<[ RawResults, HTTPResponse ]>;
}

export class Class extends SPARQLER<ExecuteSelect> {
	constructor( documents:Documents, entryPoint:string ) {
		super( <W extends object>( container:Container<ExecuteSelect>, object:W ):W & ExecuteSelect => {
			const finishObject:FinishClause & W = finishDecorator( container, object );
			return Object.assign( finishObject, {
				execute: <T extends object>():Promise<[ SELECTResults<T>, HTTPResponse ]> =>
					documents.executeSELECTQuery<T>( entryPoint, finishObject.toCompactString() ),
				executeRaw: ():Promise<[ RawResults, HTTPResponse ]> =>
					documents.executeRawSELECTQuery( entryPoint, finishObject.toCompactString() ),
			} );
		} );
	}
}

export default Class;
