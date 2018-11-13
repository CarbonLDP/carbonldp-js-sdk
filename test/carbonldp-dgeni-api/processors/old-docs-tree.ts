import { Document, Processor } from "dgeni";

import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ClassExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassExportDoc";
import { ClassLikeExportDoc, HeritageInfo } from "dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc";
import { ConstExportDoc } from "dgeni-packages/typescript/api-doc-types/ConstExportDoc";
import { EnumExportDoc } from "dgeni-packages/typescript/api-doc-types/EnumExportDoc";
import { FunctionExportDoc } from "dgeni-packages/typescript/api-doc-types/FunctionExportDoc";
import { TypeAliasExportDoc } from "dgeni-packages/typescript/api-doc-types/TypeAliasExportDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";
import { MemberDoc } from "dgeni-packages/typescript/api-doc-types/MemberDoc";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";
import { PropertyMemberDoc } from "dgeni-packages/typescript/api-doc-types/PropertyMemberDoc";

import { Symbol, SymbolFlags, TypeChecker, TypeNode } from "typescript";

import { ExtendedClassLikeExportDoc } from "../dgeni-models/ExtendedClassLikeExportDoc";
import { ExtendedModuleDoc } from "../dgeni-models/ExtendedModuleDoc";
import { FunctionJSDoc } from "../dgeni-models/FunctionJSDoc";
import { JSDoc } from "../dgeni-models/JSDoc";
import { ClassDoc } from "../local-models/ClassDoc";

import { ClassLikeDoc } from "../local-models/ClassLikeDoc";
import { EnumDoc, EnumeralDoc } from "../local-models/EnumDoc";
import { InterfaceDoc } from "../local-models/InterfaceDoc";
import { MemberLike } from "../local-models/MemberLike";
import { MethodDoc } from "../local-models/MethodDoc";
import { ModuleDoc } from "../local-models/ModuleDoc";
import { PropertyDoc } from "../local-models/PropertyDoc";
import { ReexportDoc } from "../local-models/ReexportDoc";
import { SuiteDoc } from "../local-models/SuiteDoc";
import { TypeAlias } from "../local-models/TypeAlias";
import { Generic } from "../model-tags/generics";


export default function oldDocsTree():Processor {
	return new OldDocsTree();
}

interface CheckedApiDoc extends ApiDoc {
	typeChecker:TypeChecker;
}

const TYPE_LABELS_REGEX:RegExp = /((?:&#x3D;&gt;|&#x3D;|&lt;|&amp;|extends|is |=>|[|=<&,:](?!gt;)|^) ?)([_$a-zA-Z\xA0-\uFFFF][._$a-zA-Z0-9\xA0-\uFFFF]*)/g;

export class OldDocsTree implements Processor {
	$runAfter:[ "paths-computed" ];
	$runBefore:[ "rendering-docs" ];

	private symbolsToDocsMap:Map<Symbol, ApiDoc>;

	constructor() {
		this.$runAfter = [ "paths-computed" ];
		this.$runBefore = [ "rendering-docs" ];

		this.symbolsToDocsMap = new Map();
	}

	$process( docs:ApiDoc[] ):any[] {
		// Fill exports map
		docs.forEach( doc => {
			if( this.symbolsToDocsMap.has( doc.symbol ) ) return;
			this.symbolsToDocsMap.set( doc.symbol, doc );
		} );

		const preModules:ModuleDoc[] = docs
			.filter( doc => doc.docType === "module" )
			.map( ( doc ) => this._getModule( doc as ExtendedModuleDoc ) )
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

		const classes:ClassDoc[] = doc.exports
			.filter( subDoc => subDoc.docType === "class" )
			.map( subDoc => this._getClass( subDoc as ClassExportDoc ) )
			.sort( compareSuites );

		const typeAliases:TypeAlias[] = doc.exports
			.filter( _ => _.docType === "type-alias" )
			.map( _ => this._getTypeAlias( _ as TypeAliasExportDoc ) )
			.sort( compareSuites );

		const enums:EnumDoc[] = doc.exports
			.filter( _ => _.docType === "enum" )
			.map( _ => this._getEnum( _ as EnumExportDoc ) )
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
			typeAliases: typeAliases,
			enums: enums,

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
			.filter( _ => _ instanceof MethodMemberDoc && _.name !== "__index" )
			.map( _ => this._getFunctionLike( _ as MethodMemberDoc ) )
			.sort( compareNamed );


		const indexMember:MethodMemberDoc | undefined = doc.members
			.find( ( _ ):_ is MethodMemberDoc => _.name === "__index" );
		if( indexMember ) properties
			.push( this._getPropertyLike( <PropertyMemberDoc> {
				...indexMember,
				name: `[ ${ indexMember.parameters.join() } ]`,
				getAccessor: null,
				setAccessor: null,
			} ) );


		return {
			...this._getClassLike( doc ),
			properties: properties,
			methods: methods,
		};
	}

	private _getClass( doc:ClassExportDoc ):ClassDoc {
		const constructors:MethodDoc | undefined = ! doc.constructorDoc
			? undefined
			: this._getConstructor( doc.constructorDoc );

		const instanceProperties:PropertyDoc[] = doc.members
			.filter( _ => _ instanceof PropertyMemberDoc )
			.map( _ => this._getPropertyLike( _ as PropertyMemberDoc ) )
			.sort( compareNamed );

		const staticProperties:PropertyDoc[] = doc.statics
			.filter( _ => _ instanceof PropertyMemberDoc )
			.map( _ => this._getPropertyLike( _ as PropertyMemberDoc ) )
			.sort( compareNamed );

		const instanceMethods:MethodDoc[] = doc.members
			.filter( _ => _ instanceof MethodMemberDoc )
			.map( _ => this._getFunctionLike( _ as MethodMemberDoc ) )
			.sort( compareNamed );

		const staticMethods:MethodDoc[] = doc.statics
			.filter( _ => _ instanceof MethodMemberDoc )
			.map( _ => this._getFunctionLike( _ as MethodMemberDoc ) )
			.sort( compareNamed );

		// Remove implementations when multiple signatures
		[].concat( constructors, instanceMethods, staticMethods )
			.forEach( _ => {
				if( ! _ || _.signatures.length === 1 ) return;
				_.signatures = _.signatures.slice( 1 );
			} );

		return {
			...this._getClassLike( doc ),

			constructors: constructors,

			properties: ! (staticProperties.length || instanceProperties.length)
				? undefined
				: {
					static: staticProperties,
					instance: instanceProperties,
				},
			methods: ! (staticMethods.length || instanceMethods.length)
				? undefined
				: {
					static: staticMethods,
					instance: instanceMethods,
				},
		};
	}

	private _getClassLike( doc:ExtendedClassLikeExportDoc ):ClassLikeDoc {
		return {
			...this._getSuite( doc ),

			description: doc.description,
			generics: doc.generics,

			"super-classes": this._getHeritageNames( doc, doc.extendsClauses ),
			interfaces: this._getHeritageNames( doc, doc.implementsClauses ),
		};
	}

	private _getTypeAlias( doc:TypeAliasExportDoc & JSDoc & Generic ):TypeAlias {
		return {
			...this._getSuite( doc ),

			definition: this._getExpandedType( doc, doc.typeDefinition, { keepName: true } ),
			generics: doc.generics,

			description: doc.description,
		};
	}

	private _getEnum( doc:EnumExportDoc & JSDoc ):EnumDoc {
		return {
			...this._getSuite( doc ),

			description: doc.description,
			enumerals: doc.members.map( _ => this._getEnumerals( _ ) ),
		};
	}

	private _getEnumerals( doc:MemberDoc & JSDoc ):EnumeralDoc {
		return {
			name: doc.name,
			description: doc.description,
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
		// Constants not having correct type
		if( ! doc.type && "variableDeclaration" in doc )
			doc.type = doc.variableDeclaration.type.getText();

		return {
			...this._getMemberLike( doc ),

			name: doc.name,
			description: doc.description,

			type: this._getExpandedType( doc, doc.type ),
		};
	}

	private _getFunctionLike( doc:(FunctionExportDoc | MethodMemberDoc) & FunctionJSDoc ):MethodDoc {
		const signatures:MethodDoc[ "signatures" ] = [ doc, ...doc.overloads ]
			.map( _ => ({
				...this._getMemberLike( _ ),

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
			...this._getMemberLike( doc ),

			name: doc.name,
			returns: {
				type: this._getExpandedType( doc, doc.type ),
				description: ! doc.returns ? undefined
					: doc.returns.description,
			},
			signatures: signatures,
		};
	}

	private _getConstructor( doc:MethodMemberDoc ):MethodDoc {
		const method:MethodDoc = this._getFunctionLike( doc );

		// Delete returns since constructor
		method.returns = undefined;
		method.signatures.forEach( _ => _.returns = undefined );

		return method;
	}

	private _getMemberLike( doc:{ isStatic?:boolean, isOptional?:boolean } ):MemberLike {
		return {
			access: ! ("isStatic" in doc) || doc.isStatic
				? "static" : "instance",

			optional: "isOptional" in doc ?
				doc.isOptional : false,
		};
	}

	private _getHeritageNames( doc:ClassLikeExportDoc, heritages:HeritageInfo[] ):string[] | undefined {
		if( ! heritages.length ) return undefined;

		return heritages.map( clause => {
			const mainPath:string = this._getPathFromNode( doc, clause.type, clause.type.expression.getText() );

			if( ! clause.type.typeArguments || ! clause.type.typeArguments.length )
				return mainPath;

			const typeArguments:string[] = clause.type.typeArguments
				.map( _ => this._getPathFromNode( doc, _ ) );

			return `${ mainPath }<${ typeArguments.join( ", " ) }>`;
		} );

	}

	private _getPathFromNode( doc:ClassLikeExportDoc, node:TypeNode, text:string = node.getText() ):string {
		const symbol:Symbol | undefined = doc.typeChecker.getTypeFromTypeNode( node ).getSymbol();
		if( ! symbol ) return text;

		return this._getPathFromSymbol( symbol, text );
	}

	private _getPathFromName( doc:CheckedApiDoc, name:string, opts?:{ keepName?:boolean } ):string {
		const moduleDoc:{ locals?:Map<string, Symbol> } = doc.declaration.getSourceFile() as any;
		if( ! moduleDoc.locals ) return name;

		let [ fist, rest ] = name.split( /\.([^]*)/ );

		const localSymbol:Symbol | undefined = moduleDoc.locals.get( fist );
		if( ! localSymbol ) return name;

		let symbol:Symbol | undefined = localSymbol.flags & SymbolFlags.Alias
			? doc.typeChecker.getAliasedSymbol( localSymbol )
			: localSymbol;

		while( symbol && rest ) {
			let subName:string;
			[ subName, rest ] = rest.split( /\.([^]*)/ );

			const exportArray:Symbol[] | undefined = (symbol as any).exportArray || [];
			const subSymbol:Symbol = exportArray.find( _ => _.name === subName );

			symbol = subSymbol ? subSymbol :
				symbol.exports && symbol.exports.get( subName as any );
		}

		if( ! symbol ) return name;

		return this._getPathFromSymbol( symbol, name, opts );
	}

	private _getPathFromSymbol( symbol:Symbol, text:string, opts:{ keepName?:boolean } = {} ):string {
		if( "exportSymbol" in symbol )
			symbol = (symbol as any).exportSymbol;

		const doc:ApiDoc | undefined = this.symbolsToDocsMap.get( symbol );
		if( ! doc ) return text;

		return opts.keepName
			? `{@link ${ doc.path } ${ text }}`
			: doc.path;
	}

	private _getExpandedType( doc:CheckedApiDoc, type:string, opts?:{ keepName?:boolean } ):string {
		return type.replace( TYPE_LABELS_REGEX, ( _, before, label ) =>
			`${ before }${ this._getPathFromName( doc, label, opts ) }`
		);
	}
}

function compareSuites( a:SuiteDoc, b:SuiteDoc ):number {
	return a.id.localeCompare( b.id );
}

function compareNamed( a:{ name:string }, b:{ name:string } ):number {
	if( a.name < b.name ) return - 1;
	if( a.name > b.name ) return 1;
	return 0;
}
