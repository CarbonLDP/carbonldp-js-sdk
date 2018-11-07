import { DocCollection, Document, Processor } from "dgeni";

import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ClassExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassExportDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";
import { ModuleDoc } from "dgeni-packages/typescript/api-doc-types/ModuleDoc";
import { ConstExportDoc } from "dgeni-packages/typescript/api-doc-types/ConstExportDoc";
import { SymbolFlags } from "typescript";

import { ExtendedClassLikeExportDoc } from "../models/ExtendedClassLikeExportDoc";
import { ExtendedFunctionExportDoc } from "../models/ExtendedFunctionExportDoc";
import { JSDoc } from "../models/JSDoc";
import { OldClassLikeDoc } from "../models/OldClassLikeDoc";
import { OldMethodDoc } from "../models/OldMethodDoc";
import { OldModuleDoc } from "../models/OldModuleDoc";
import { OldPropertyDoc } from "../models/OldPropertyDoc";
import { ReexportDoc } from "../models/ReexportDoc";
import { SuiteDoc } from "../models/SuiteDoc";


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
			.sort( compareSuites );

		const finalModules:OldModuleDoc[] = preModules
			.filter( doc => {
				if( ! doc.id.includes( "/" ) ) return true;
				return this._hasReexportParent( doc, preModules );
			} );

		const index:Document = docs.find( doc => doc.docType === "index" );
		index.modules = finalModules;
		index.docs = docs;

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
			.sort( compareNamed );

		const properties:OldPropertyDoc[] = doc.exports
			.filter( _ => _.docType === "const" )
			.map( _ => this._getConst( _ as ConstExportDoc ) )
			.sort( compareNamed );

		const methods:OldMethodDoc[] = doc.exports
			.filter( _ => _.docType === "function" )
			.map( _ => this._getFunction( _ as ExtendedFunctionExportDoc ) )
			.sort( compareNamed );

		return {
			...this._getSuite( doc ),

			interfaces: interfaces,
			classes: classes,
			reexports: reexports,

			properties: properties.length
				? { static: properties } : undefined,
			methods: methods.length
				? { static: methods } : undefined,
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

	private _getConst( doc:ConstExportDoc & JSDoc ):OldPropertyDoc {
		return {
			access: "static",
			name: doc.name,
			description: doc.description,
			type: doc.variableDeclaration.type.getText(),
		};
	}

	private _getFunction( doc:ExtendedFunctionExportDoc ):OldMethodDoc {
		const signatures:OldMethodDoc[ "signatures" ] = [ doc, ...doc.overloads ]
			.map( _ => ({
				access: "static",
				name: _.name,
				generics: [],
				description: _.description,
				arguments: _.parameterDocs.map( __ => ({
					name: __.name,
					type: __.type,
					description: __.description,
					optional: __.isOptional,
				}) ),
				returns: {
					type: _.type,
					description: ! doc.returns ? undefined
						: doc.returns.description,
				},
				optional: false,
			}) );

		return {
			name: doc.name,
			returns: {
				type: doc.type,
				description: ! doc.returns ? undefined
					: doc.returns.description,
			},
			signatures: signatures,
		};
	}

}

function compareSuites( a:SuiteDoc, b:SuiteDoc ):number {
	return a.id.localeCompare( b.id );
}

function compareNamed( a:{ name:string }, b:{ name:string } ):number {
	return a.name.localeCompare( b.name );
}
