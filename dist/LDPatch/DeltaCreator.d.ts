import { JSONLDConverter } from "../JSONLD/Converter";
import { DigestedObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
export declare class DeltaCreator {
    private prefixesMap;
    private jsonldConverter;
    private addToken;
    private deleteToken;
    private updateLists;
    constructor(jsonldConverter: JSONLDConverter);
    getPatch(): string;
    addResource(schema: DigestedObjectSchema, oldResource: Resource, newResource: Resource): void;
    private getPropertyIRI(schema, propertyName);
    private getObjects(value, schema, definition?);
    private expandValues(values, schema, definition?);
    private expandLanguageMap(values, schema);
    private expandPointer(value, schema);
    private expandLiteral(value, schema, definition?);
    private compactIRI(schema, iri);
    private addPrefixFrom(object, schema);
}
