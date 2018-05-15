import { JSONLDConverter } from "../JSONLD";
import { DigestedObjectSchema } from "../ObjectSchema";
export declare class DeltaCreator {
    private prefixesMap;
    private jsonldConverter;
    private readonly addToken;
    private readonly deleteToken;
    private readonly updateLists;
    constructor(jsonldConverter: JSONLDConverter);
    getPatch(): string;
    addResource(schema: DigestedObjectSchema, id: string, previousResource: object, currentResource: object): void;
    private _getPropertyIRI(schema, propertyName);
    private _getObjects(value, schema, definition?);
    private _expandValues(values, schema, definition?);
    private _expandLanguageMap(values, schema);
    private _expandPointer(value, schema);
    private _expandLiteral(value, schema, definition?);
    private _compactIRI(schema, iri);
    private _addPrefixFrom(object, schema);
}
