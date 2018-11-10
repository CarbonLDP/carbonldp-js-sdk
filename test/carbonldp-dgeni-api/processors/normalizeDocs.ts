import { DocCollection, Processor } from "dgeni";

import { ApiDoc, BaseApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ConstExportDoc } from "dgeni-packages/typescript/api-doc-types/ConstExportDoc";
import { ExportDoc } from "dgeni-packages/typescript/api-doc-types/ExportDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";
import { ModuleDoc } from "dgeni-packages/typescript/api-doc-types/ModuleDoc";
import { Host } from "dgeni-packages/typescript/services/ts-host/host";
import { getExportDocType } from "dgeni-packages/typescript/services/TsParser";

import fs from "fs";
import path from "path";

import { SymbolFlags } from "typescript";


export default function normalizeDocs( tsHost:Host, log:any ):NormalizeDocs {
	return new NormalizeDocs( tsHost, log );
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

const DOCS_TO_IGNORE:string[] = [ "get-accessor-info" ];

export class NormalizeDocs implements Processor {
	$runAfter:[ "readTypeScriptModules" ];
	$runBefore:[ "parsing-tags" ];

	private readonly tsHost:Host;
	private readonly log:any;

	private readonly _indexMap:Map<string, boolean>;

	constructor( tsHost:Host, log:any ) {
		this.$runAfter = [ "readTypeScriptModules" ];
		this.$runBefore = [ "parsing-tags" ];

		this.tsHost = tsHost;
		this.log = log;

		this._indexMap = new Map();
	}

	$process( docs:ApiDoc[] ):any {
		docs = docs.filter( ( doc ) => {
			if( DOCS_TO_IGNORE.indexOf( doc.docType ) !== -1 ) return false;

			if( doc.fileInfo.baseName === "index" ) return true;

			if( ! this._hasIndex( doc ) ) return true;

			// Filter modules that has corresponding index module
			if( doc.docType === "module" ) return false;

			// Filter exports from non "index" modules
			if( doc instanceof BaseApiDoc ) {
				if( doc.moduleDoc.fileInfo.baseName !== "index" ) return false;
			}

			return true;
		} );

		// Normalize IDs
		docs.forEach( doc => {
			if( doc.docType === "module" ) return;
			if( ! (doc instanceof BaseApiDoc) ) return;

			const indexOfSameName:number = doc.moduleDoc.exports
				.findIndex( subDoc => subDoc.name === doc.moduleDoc.name );

			if( indexOfSameName !== - 1 ) {
				doc.id = doc.id.replace( doc.moduleDoc.name + "/", "" );
			}
		} );

		// Add merged constant into only interface
		docs.forEach( doc => {
			if( ! (doc instanceof InterfaceExportDoc) ) return;

			// Not only an interface
			if( ! (doc.symbol.flags ^ SymbolFlags.Interface) ) return;

			// Remove interface momentary
			doc.symbol.flags = doc.symbol.flags ^ SymbolFlags.Interface;

			switch( getExportDocType( doc.symbol ) ) {
				case "const":
					const exportDoc:ExportDoc = new ConstExportDoc( this.tsHost, doc.moduleDoc, doc.symbol );
					this._addExportDoc( docs, doc.moduleDoc, exportDoc );

					// Add correct content
					doc.content = this.tsHost.getContent( doc.symbol.getDeclarations()![ 0 ]! );
					break;
				default:
					this.log.error( `Other declaration merged for ${ doc.name }` );
					break;
			}

			// Return interface flag
			doc.symbol.flags = doc.symbol.flags | SymbolFlags.Interface;
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

	private _hasIndex( doc:ApiDoc ):boolean {
		const indexPath:string = path.resolve( doc.fileInfo.filePath, "../index.ts" );

		if( this._indexMap.has( indexPath ) )
			return this._indexMap.get( indexPath );

		const exists:boolean = fs.existsSync( indexPath );
		this._indexMap.set( indexPath, exists );

		return exists;
	}

	private _addExportDoc( docs:DocCollection, moduleDoc:ModuleDoc, exportDoc:ExportDoc ):void {
		this.log.debug( `>>>> EXPORT: ${ exportDoc.name } (${ exportDoc.docType }) from ${ moduleDoc.id }` );

		moduleDoc.exports.push( exportDoc );
		docs.push( exportDoc );
	}

}
