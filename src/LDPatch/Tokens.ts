import {
	BlankNodeToken,
	CollectionToken,
	IRIToken,
	PrefixedNameToken,
	SubjectToken,
	TokenNode,
	VariableOrIRI,
} from "sparqler/tokens";
import { joinPatterns } from "sparqler/tokens/utils";
import { isNumber } from "../Utils";

export type StatementToken = AddToken | DeleteToken | UpdateListToken;

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

export class PrefixToken implements TokenNode {
	readonly token:"prefix" = "prefix";
	readonly namespace:string;
	readonly iri:IRIToken;

	constructor( namespace:string, iri:IRIToken ) {
		this.namespace = namespace;
		this.iri = iri;
	}

	toString():string {
		return `@prefix ${ this.namespace }: ${ this.iri }.`;
	}
}

export type TripleToken = SubjectToken;

export class AddToken implements TokenNode {
	readonly token:"add" = "add";
	readonly triples:TripleToken[];

	constructor() {
		this.triples = [];
	}

	toString():string {
		return `Add { ${ joinPatterns( this.triples ) }. }.`;
	}
}

export class DeleteToken implements TokenNode {
	readonly token:"delete" = "delete";
	readonly triples:TripleToken[];

	constructor() {
		this.triples = [];
	}

	toString():string {
		return `Delete { ${ joinPatterns( this.triples ) }. }.`;
	}
}

export class UpdateListToken implements TokenNode {
	readonly token:"updateList" = "updateList";

	// Extend LD Patch grammar allowing blank-nodes
	readonly subject:VariableOrIRI | BlankNodeToken;
	readonly predicate:IRIToken | PrefixedNameToken;
	readonly slice:SliceToken;
	readonly collection:CollectionToken;

	constructor( subject:VariableOrIRI | BlankNodeToken, predicate:IRIToken | PrefixedNameToken, slice:SliceToken, collection:CollectionToken ) {
		this.subject = subject;
		this.predicate = predicate;
		this.slice = slice;
		this.collection = collection;
	}

	toString():string {
		return `UpdateList ${ this.subject } ${ this.predicate } ${ this.slice } ${ this.collection }.`;
	}
}

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
