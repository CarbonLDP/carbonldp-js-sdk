import { DocCollection, Document, Processor } from "dgeni";

import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ClassExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassExportDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";
import { ModuleDoc } from "dgeni-packages/typescript/api-doc-types/ModuleDoc";
import { SymbolFlags } from "typescript";

import { ExtendedClassLikeExportDoc } from "../models/ExtendedClassLikeExportDoc";
import { OldClassLikeDoc } from "../models/OldClassLikeDoc";
import { OldModuleDoc } from "../models/OldModuleDoc";
import { ReexportDoc } from "../models/ReexportDoc";
import { SuiteDoc } from "../models/SuiteDoc";


export default function oldDocsTree():Processor {
	return new OldDocsTree();
}

enum DOC_TYPE_ORDER {
	index = 0,
	class = 1,
	interface = 2,
	"type-alias" = 3,
	const = 4,
	enum = 5,
	function = 6,
	module = 7,
	parameter = 8,
	member = 9,
	"get-accessor-info" = 10,
}

export class OldDocsTree implements Processor {
	$runAfter:[ "paths-computed" ];
	$runBefore:[ "rendering-docs" ];

	constructor() {
		this.$runAfter = [ "paths-computed" ];
		this.$runBefore = [ "rendering-docs" ];
	}

	$process( docs:DocCollection ):any[] {
		const preModules:OldModuleDoc[] = docs
			.filter( doc => doc.docType === "module" )
			.map( ( doc ) => this._getModule( doc ) )
			.sort( compareSuites );

		const finalModules:OldModuleDoc[] = preModules
			.filter( doc => {
				if( ! doc.id.includes( "/" ) ) return true;
				return this._hasReexportParent( doc, preModules );
			} );

		const index:Document = docs.find( doc => doc.docType === "index" );
		index.modules = finalModules;
		index.docs = docs.sort( ( a, b ) => {
			const indexA:string | number = DOC_TYPE_ORDER[ a.docType ];
			const indexB:string | number = DOC_TYPE_ORDER[ b.docType ];

			if( indexA < indexB ) return - 1;
			if( indexA > indexB ) return 1;

			return 0;
		} );

		return [ index ];
	}


	private _getModule( doc:ModuleDoc ):OldModuleDoc {
		const interfaces:OldClassLikeDoc[] = doc.exports
			.filter( subDoc => subDoc.docType === "interface" )
			.map( subDoc => this._getClassLike( subDoc as InterfaceExportDoc ) )
			.sort( compareSuites );

		const classes:OldClassLikeDoc[] = doc.exports
			.filter( subDoc => subDoc.docType === "class" )
			.map( subDoc => this._getClassLike( subDoc as ClassExportDoc ) )
			.sort( compareSuites );

		const reexports:ReexportDoc[] = doc.symbol.exportArray
			.filter( symbol =>
				(symbol.resolvedSymbol && symbol.resolvedSymbol.flags) & SymbolFlags.ValueModule
			)
			.map<ReexportDoc>( symbol => ({
				access: "static",
				name: "" + symbol.escapedName,
				originalLocation: "",
			}) )
			.sort( ( a, b ) => a.name.localeCompare( b.name ) );

		return {
			...this._getSuite( doc ),

			interfaces: interfaces,
			classes: classes,
			reexports: reexports,
		};
	}

	private _getClassLike( doc:ExtendedClassLikeExportDoc ):OldClassLikeDoc {
		return {
			...this._getSuite( doc ),
			description: doc.description,
			generics: doc.generics,
		};
	}

	private _getSuite( doc:ApiDoc ):SuiteDoc {
		return {
			suiteType: doc.docType,
			name: doc.name,
			id: doc.id,
			path: doc.path,
		};
	}

	private _hasReexportParent( doc:OldModuleDoc, docs:OldModuleDoc[] ):boolean {
		let parentID:string = doc.id;
		while( parentID.includes( "/" ) ) {
			parentID = parentID.substring( 0, parentID.lastIndexOf( "/" ) );

			const parentDoc:OldModuleDoc | undefined = docs.find( x => x.id === parentID );
			if( ! parentDoc ) continue;

			const reexport:ReexportDoc | undefined = parentDoc.reexports
				.find( x => x.name === doc.name );

			if( reexport ) {
				reexport.originalLocation = doc.path;
				return true;
			}
		}

		return false;
	}

}

function compareSuites( a:SuiteDoc, b:SuiteDoc ):number {
	return a.id.localeCompare( b.id );
}
