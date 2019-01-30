import { BlankNodeToken, CollectionToken, IRIToken, TokenNode, TripleToken, VariableOrIRIToken } from "sparqler/tokens";

import { isNumber } from "../Utils";


/**
 * The tokens that states a change in the data.
 *
 * Used in the {@link LDPatchToken.statements}.
 */
export type StatementToken = AddToken | DeleteToken | UpdateListToken;

/**
 * Token for defining an LD Patch expression.
 */
export class LDPatchToken implements TokenNode {
	readonly token:"ldpatch" = "ldpatch";
	readonly prologues:PrefixToken[];
	readonly statements:StatementToken[];

	constructor() {
		this.prologues = [];
		this.statements = [];
	}

	toString():string {
		const tokens:TokenNode[] = [
			...this.prologues,
			...this.statements,
		];

		return tokens.join( " " );
	}
}

/**
 * Token for defining a LD Patch prefix statement.
 *
 * @see {@link https://www.w3.org/TR/ldpatch/#grammar-production-prefixID}
 */
export class PrefixToken implements TokenNode {
	readonly token:"prefix" = "prefix";
	readonly namespace:string;
	readonly iri:IRIToken;

	constructor( namespace:string, iri:IRIToken ) {
		this.namespace = namespace;
		this.iri = iri;
	}

	toString():string {
		return `@prefix ${this.namespace}: ${this.iri}.`;
	}
}

/**
 * Token for defining a LD Patch add statement.
 *
 * @see {@link https://www.w3.org/TR/ldpatch/#Add-statement}.
 * @see {@link https://www.w3.org/TR/ldpatch/#grammar-production-add}.
 */
export class AddToken implements TokenNode {
	readonly token:"add" = "add";
	readonly triples:TripleToken[];

	constructor() {
		this.triples = [];
	}

	toString():string {
		return `Add { ${this.triples.join( ". " )}. }.`;
	}
}

/**
 * Token for defining a LD Patch delete statement.
 *
 * @see {@link https://www.w3.org/TR/ldpatch/#Delete-statement}.
 * @see {@link https://www.w3.org/TR/ldpatch/#grammar-production-delete}.
 */
export class DeleteToken implements TokenNode {
	readonly token:"delete" = "delete";
	readonly triples:TripleToken[];

	constructor() {
		this.triples = [];
	}

	toString():string {
		return `Delete { ${this.triples.join( ". " )}. }.`;
	}
}

/**
 * Token for defining a LD Patch update list statement.
 *
 * @see {@link https://www.w3.org/TR/ldpatch/#UpdateList-statement}.
 * @see {@link https://www.w3.org/TR/ldpatch/#grammar-production-updateList}.
 */
export class UpdateListToken implements TokenNode {
	readonly token:"updateList" = "updateList";

	// Extend LD Patch grammar allowing blank-nodes
	readonly subject:VariableOrIRIToken | BlankNodeToken;
	readonly predicate:IRIToken;
	readonly slice:SliceToken;
	readonly collection:CollectionToken;

	constructor( subject:VariableOrIRIToken | BlankNodeToken, predicate:IRIToken, slice:SliceToken, collection:CollectionToken ) {
		this.subject = subject;
		this.predicate = predicate;
		this.slice = slice;
		this.collection = collection;
	}

	toString():string {
		return `UpdateList ${this.subject} ${this.predicate} ${this.slice} ${this.collection}.`;
	}
}

/**
 * Token for defining a LD Patch slice expression of a update list statement.
 *
 * @see {@link https://www.w3.org/TR/ldpatch/#dfn-slice-expression}.
 * @see {@link https://www.w3.org/TR/ldpatch/#grammar-production-slice}.
 */
export class SliceToken implements TokenNode {
	readonly token:"slice" = "slice";
	readonly minIndex?:number;
	readonly maxIndex?:number;

	constructor( minIndex?:number, maxIndex?:number ) {
		if( isNumber( minIndex ) ) this.minIndex = minIndex;
		if( isNumber( maxIndex ) ) this.maxIndex = maxIndex;
	}

	toString():string {
		let buffer:string = "..";
		if( this.minIndex !== void 0 ) buffer = this.minIndex + buffer;
		if( this.maxIndex !== void 0 ) buffer = buffer + this.maxIndex;

		return buffer;
	}
}
