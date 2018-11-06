import { DocCollection, Document, Processor } from "dgeni";

import fs from "fs";
import path from "path";


export default function normalizeDocs():NormalizeDocs {
	return new NormalizeDocs();
}


const DOC_TYPE_ORDER:{ [ type:string ]:number } = {
	index: 0,
	class: 1,
	interface: 2,
	"type-alias": 3,
	const: 4,
	enum: 5,
	function: 6,
	module: 7,
	member: 8,
	"get-accessor-info": 9,
	parameter: 10,
};

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

		docs = docs.sort( ( a, b ) => {
			const indexA:string | number = DOC_TYPE_ORDER[ a.docType ];
			const indexB:string | number = DOC_TYPE_ORDER[ b.docType ];

			if( indexA < indexB ) return - 1;
			if( indexA > indexB ) return 1;

			return 0;
		} );

		return [
			{ docType: "index" },
			...docs,
		];
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
