import { DocCollection } from "dgeni";

import { ExportDoc } from "dgeni-packages/typescript/api-doc-types/ExportDoc";

import { ReadTypeScriptModules } from "dgeni-packages/typescript/processors/readTypeScriptModules";

import { Host } from "dgeni-packages/typescript/services/ts-host/host";
import { AugmentedSymbol, ModuleSymbol, TsParser } from "dgeni-packages/typescript/services/TsParser";

import { Symbol, SymbolFlags } from "typescript";


export default function readTypeScriptModules(
	tsParser:TsParser,
	tsHost:Host,
	modules:any,
	exportSymbolsToDocsMap:Map<Symbol, ExportDoc>,
	createDocMessage:any,
	log:any ):ExtendedReadTypeScriptModules {

	return new ExtendedReadTypeScriptModules( tsParser, tsHost, modules, exportSymbolsToDocsMap, createDocMessage, log );
}


export interface ExtendedModuleSymbol extends ModuleSymbol {
	reexportArray?:AugmentedSymbol[];
}

// @ts-ignore
export class ExtendedReadTypeScriptModules extends ReadTypeScriptModules {

	private addModuleDocs( docs:DocCollection, moduleSymbols:ExtendedModuleSymbol[], basePath:string ):void {
		for( const moduleSymbol of moduleSymbols ) {
			moduleSymbol.reexportArray = moduleSymbol.exportArray
				.filter( symbol => isReexportSymbol( symbol ) );

			moduleSymbol.exportArray = moduleSymbol.exportArray
				.filter( symbol => ! isReexportSymbol( symbol ) );
		}

		// @ts-ignore
		super.addModuleDocs( docs, moduleSymbols, basePath );
	}
}

const isReexportSymbol:( symbol:AugmentedSymbol ) => boolean = symbol =>
	! ! ((symbol.resolvedSymbol && symbol.resolvedSymbol.flags) & SymbolFlags.ValueModule);
