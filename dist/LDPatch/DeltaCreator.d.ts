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
    private __getSchema(id, previousResource, currentResource);
    private _getPropertyIRI(schema, propertyName);
    private __getObjects(value, schema, definition?);
    private __expandValues(values, schema, definition?);
    private __expandLanguageMap(values, schema);
    private __expandPointer(value, schema);
    private __expandLiteral(value, schema, definition?);
    private __compactIRI(schema, iri);
    private __addPrefixFrom(object, schema);
}
