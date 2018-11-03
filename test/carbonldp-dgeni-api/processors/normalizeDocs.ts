import { DocCollection, Document, Processor } from "dgeni";

import fs from "fs";
import path from "path";


export default function normalizeDocs():NormalizeDocs {
	return new NormalizeDocs();
}

export class NormalizeDocs implements Processor {
	$runAfter:[ "processing-docs" ];
	$runBefore:[ "docs-processed" ];

	private _indexMap:Map<string, boolean>;

	constructor() {
		this.$runAfter = [ "processing-docs" ];
		this.$runBefore = [ "docs-processed" ];

		this._indexMap = new Map();
	}

	$process( docs:DocCollection ):any {
		docs = docs.filter( ( doc ) => {
			if( doc.fileInfo.baseName === "index" ) return true;

			if( ! this._hasIndex( doc ) ) return true;

			// Filter modules that has corresponding index module
			if( doc.docType === "module" ) return false;

			// Filter exports from non "index" modules
			if( doc.moduleDoc ) {
				if( doc.moduleDoc.fileInfo.baseName !== "index" ) return false;
			}

			return true;
		} );

		// Normalize IDs
		docs.forEach( doc => {
			if( doc.docType === "module" ) return;
			if( ! doc.moduleDoc ) return;

			const indexOfSameName:number = doc.moduleDoc.exports
				.findIndex( subDoc => subDoc.name === doc.moduleDoc.name );

			if( indexOfSameName !== - 1 ) {
				doc.id = doc.id.replace( doc.moduleDoc.name + "/", "" );
			}
		} );

		return docs.concat( [
			{ docType: "index" },
		] );
	}

	_hasIndex( doc:Document ):boolean {
		const indexPath:string = path.resolve( doc.fileInfo.filePath, "../index.ts" );

		if( this._indexMap.has( indexPath ) )
			return this._indexMap.get( indexPath );

		const exists:boolean = fs.existsSync( indexPath );
		this._indexMap.set( indexPath, exists );

		return exists;
	}

}
