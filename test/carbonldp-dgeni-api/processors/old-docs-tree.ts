import { DocCollection, Document, Processor } from "dgeni";

import fs from "fs";
import path from "path";


export default function oldDocsTree():Processor {
	return new OldDocsTree();
}

export class OldDocsTree implements Processor {
	$runAfter:[ "processing-docs" ];
	$runBefore:[ "docs-processed" ];

	private _indexMap:Map<string, boolean>;

	constructor() {
		this.$runAfter = [ "processing-docs" ];
		this.$runBefore = [ "docs-processed" ];

		this._indexMap = new Map();
	}

	$process( docs:DocCollection ):any {
		// Filter modules that has corresponding index module
		docs = docs.filter( ( doc ) => {
			if( doc.docType !== "module" ) return true;
			if( doc.fileInfo.baseName === "index" ) return true;

			if( ! this._hasIndex( doc ) ) return true;
		} );

		return [
			{
				docType: "index",
				modules: docs,
			},
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
