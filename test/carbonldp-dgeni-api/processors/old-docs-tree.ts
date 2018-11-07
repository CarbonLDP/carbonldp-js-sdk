import { DocCollection, Document, Processor } from "dgeni";

import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ClassExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassExportDoc";
import { ConstExportDoc } from "dgeni-packages/typescript/api-doc-types/ConstExportDoc";
import { FunctionExportDoc } from "dgeni-packages/typescript/api-doc-types/FunctionExportDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";
import { PropertyMemberDoc } from "dgeni-packages/typescript/api-doc-types/PropertyMemberDoc";

import { SymbolFlags } from "typescript";

import { ExtendedClassLikeExportDoc } from "../dgeni-models/ExtendedClassLikeExportDoc";
import { ExtendedModuleDoc } from "../dgeni-models/ExtendedModuleDoc";
import { FunctionJSDoc } from "../dgeni-models/FunctionJSDoc";
import { JSDoc } from "../dgeni-models/JSDoc";

import { ClassLikeDoc } from "../local-models/ClassLikeDoc";
import { InterfaceDoc } from "../local-models/InterfaceDoc";
import { MemberLike } from "../local-models/MemberLike";
import { MethodDoc } from "../local-models/MethodDoc";
import { ModuleDoc } from "../local-models/ModuleDoc";
import { PropertyDoc } from "../local-models/PropertyDoc";
import { ReexportDoc } from "../local-models/ReexportDoc";
import { SuiteDoc } from "../local-models/SuiteDoc";


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
		const preModules:ModuleDoc[] = docs
			.filter( doc => doc.docType === "module" )
			.map( ( doc ) => this._getModule( doc ) )
			.sort( compareSuites );

		const finalModules:ModuleDoc[] = preModules
			.filter( doc => {
				if( ! doc.id.includes( "/" ) ) return true;
				return this._hasReexportParent( doc, preModules );
			} );

		const index:Document = docs.find( doc => doc.docType === "index" );
		index.modules = finalModules;
		index.docs = docs;

		return [ index ];
	}


	private _getModule( doc:ExtendedModuleDoc ):ModuleDoc {
		const interfaces:InterfaceDoc[] = doc.exports
			.filter( subDoc => subDoc.docType === "interface" )
			.map( subDoc => this._getInterface( subDoc as InterfaceExportDoc ) )
			.sort( compareSuites );

		const classes:ClassLikeDoc[] = doc.exports
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

		const properties:PropertyDoc[] = doc.exports
			.filter( _ => _.docType === "const" )
			.map( _ => this._getPropertyLike( _ as ConstExportDoc ) )
			.sort( compareNamed );

		const methods:MethodDoc[] = doc.exports
			.filter( _ => _.docType === "function" )
			.map( _ => this._getFunctionLike( _ as FunctionExportDoc ) )
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

	private _getInterface( doc:InterfaceExportDoc ):InterfaceDoc {
		const properties:PropertyDoc[] = doc.members
			.filter( _ => _ instanceof PropertyMemberDoc )
			.map( _ => this._getPropertyLike( _ as PropertyMemberDoc ) )
			.sort( compareNamed );

		const methods:MethodDoc[] = doc.members
			.filter( _ => _ instanceof MethodMemberDoc )
			.map( _ => this._getFunctionLike( _ as MethodMemberDoc ) )
			.sort( compareNamed );

		return {
			...this._getClassLike( doc ),
			properties: properties,
			methods: methods,
		};
	}

	private _getClassLike( doc:ExtendedClassLikeExportDoc ):ClassLikeDoc {
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

	private _hasReexportParent( doc:ModuleDoc, docs:ModuleDoc[] ):boolean {
		let parentID:string = doc.id;
		while( parentID.includes( "/" ) ) {
			parentID = parentID.substring( 0, parentID.lastIndexOf( "/" ) );

			const parentDoc:ModuleDoc | undefined = docs.find( x => x.id === parentID );
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

	private _getPropertyLike( doc:(ConstExportDoc | PropertyMemberDoc) & JSDoc ):PropertyDoc {
		return {
			...this._getMemberLike( doc ),

			name: doc.name,
			description: doc.description,

			type: "variableDeclaration" in doc
				? doc.variableDeclaration.type.getText()
				: doc.type,
		};
	}

	private _getFunctionLike( doc:(FunctionExportDoc | MethodMemberDoc) & FunctionJSDoc ):MethodDoc {
		const signatures:MethodDoc[ "signatures" ] = [ doc, ...doc.overloads ]
			.map( _ => ({
				...this._getMemberLike( doc ),

				name: _.name,
				generics: _.generics,
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

	private _getMemberLike( doc:(ConstExportDoc | PropertyMemberDoc) | (MethodMemberDoc | FunctionExportDoc) ):MemberLike {
		return {
			access: ! ("isStatic" in doc) || doc.isStatic
				? "static" : "instance",

			optional: "isOptional" in doc ?
				doc.isOptional : false,
		};
	}

}

function compareSuites( a:SuiteDoc, b:SuiteDoc ):number {
	return a.id.localeCompare( b.id );
}

function compareNamed( a:{ name:string }, b:{ name:string } ):number {
	return a.name.localeCompare( b.name );
}
