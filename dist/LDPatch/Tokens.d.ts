import { CollectionToken, IRIToken, PrefixedNameToken, SubjectToken, TokenNode, VariableOrIRI } from "sparqler/tokens";
export declare type StatementToken = AddToken | DeleteToken | UpdateListToken;
export declare class LDPatchToken implements TokenNode {
    readonly token: "ldpatch";
    readonly prologues: PrefixToken[];
    readonly statements: StatementToken[];
    constructor();
    toString(): string;
}
export declare class PrefixToken implements TokenNode {
    readonly token: "prefix";
    readonly namespace: string;
    readonly iri: IRIToken;
    constructor(namespace: string, iri: IRIToken);
    toString(): string;
}
export declare type TripleToken = SubjectToken;
export declare class AddToken implements TokenNode {
    readonly token: "add";
    readonly triples: TripleToken[];
    constructor();
    toString(): string;
}
export declare class DeleteToken implements TokenNode {
    readonly token: "delete";
    readonly triples: TripleToken[];
    constructor();
    toString(): string;
}
export declare class UpdateListToken implements TokenNode {
    readonly token: "updateList";
    readonly subject: VariableOrIRI;
    readonly predicate: IRIToken | PrefixedNameToken;
    readonly slice: SliceToken;
    readonly collection: CollectionToken;
    constructor(subject: VariableOrIRI, predicate: IRIToken | PrefixedNameToken, slice: SliceToken, collection: CollectionToken);
    toString(): string;
}
export declare class SliceToken implements TokenNode {
    readonly token: "slice";
    readonly minIndex?: number;
    readonly maxIndex?: number;
    constructor(minIndex?: number, maxIndex?: number);
    toString(): string;
}
