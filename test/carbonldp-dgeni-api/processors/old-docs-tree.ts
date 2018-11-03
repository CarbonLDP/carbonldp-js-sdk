import { DocCollection, Document, Processor } from "dgeni";

import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ModuleDoc } from "dgeni-packages/typescript/api-doc-types/ModuleDoc";
import { SymbolFlags } from "typescript";


interface SuiteDoc {
	suiteType:string;
	name:string;
	id:string;
	path:string;
}

interface OldModuleDoc extends SuiteDoc {
	interfaces:SuiteDoc[];
	classes:SuiteDoc[];
	reexports:OldModuleDoc[];
}


export default function oldDocsTree():Processor {
	return new OldDocsTree();
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
			.sort( ( a, b ) => a.id.localeCompare( b.id ) );

		const finalModules:OldModuleDoc[] = preModules
			.filter( oldModule => {
				if( ! oldModule.id.includes( "/" ) ) return true;

				// Find paren module
				const parentID:string = oldModule.id.replace( "/" + oldModule.name, "" );
				const parentDoc:ModuleDoc | undefined = docs.find( doc => doc.id === parentID );
				if( ! parentDoc ) return true;

				const exportIndex:number = parentDoc.symbol.exportArray
					.findIndex( symbol => {
						return symbol.escapedName === oldModule.name
							&& ! ! symbol.resolvedSymbol
							&& ! ! (symbol.resolvedSymbol.flags && SymbolFlags.ValueModule);
					} );

				if( exportIndex !== - 1 ) return true;
			} );

		const index:Document = docs.find( doc => doc.docType === "index" );
		index.modules = finalModules;

		return [ index ];
	}


	private _getModule( doc:ModuleDoc ):OldModuleDoc {
		const interfaces:SuiteDoc[] = doc.exports
			.filter( subDoc => subDoc.docType === "interface" )
			.map( subDoc => this._getSuite( subDoc ) );

		const classes:SuiteDoc[] = doc.exports
			.filter( subDoc => subDoc.docType === "class" )
			.map( subDoc => this._getSuite( subDoc ) );

		return {
			...this._getSuite( doc ),

			interfaces: interfaces,
			classes: classes,
			reexports: [],
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

}
