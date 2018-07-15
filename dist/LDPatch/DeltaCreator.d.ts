import { Context } from "../Context/Context";
export declare class DeltaCreator {
    private prefixesMap;
    private context;
    private readonly addToken;
    private readonly deleteToken;
    private readonly updateLists;
    constructor(context: Context);
    getPatch(): string;
    addResource(id: string, previousResource: object, currentResource: object): void;
    private __getSchema;
    private _getPropertyIRI;
    private _getObjects;
    private _expandValues;
    private _expandLanguageMap;
    private _expandPointer;
    private _expandLiteral;
    private _compactIRI;
    private _addPrefixFrom;
}
