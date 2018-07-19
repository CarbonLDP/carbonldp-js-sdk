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
    private __getObjects;
    private __expandValues;
    private __expandLanguageMap;
    private __expandPointer;
    private __expandLiteral;
    private __compactIRI;
    private __addPrefixFrom;
}
