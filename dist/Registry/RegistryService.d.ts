import { AbstractContext } from "../AbstractContext";
import { ModelDecorator } from "../core";
import { FreeResources } from "../FreeResources";
import { Response } from "../HTTP";
import { JSONLDConverter } from "../JSONLD";
import { DigestedObjectSchema, ObjectSchemaResolver } from "../ObjectSchema";
import { Pointer, PointerLibrary } from "../Pointer";
import { RDFNode } from "../RDF";
import { Registry } from "./Registry";
export declare class RegistryService<M extends Pointer, C extends AbstractContext<M, any> = undefined> implements Registry<M>, ObjectSchemaResolver {
    readonly _context: C | undefined;
    readonly _registry: Registry<any> | undefined;
    protected readonly _model: ModelDecorator<M>;
    readonly _resourcesMap: Map<string, M>;
    protected readonly _documentDecorators: Map<string, (object: object) => object>;
    readonly documentDecorators: Map<string, (object: object) => object>;
    protected readonly _jsonldConverter: JSONLDConverter;
    readonly jsonldConverter: JSONLDConverter;
    inScope: Registry<M>["inScope"];
    hasPointer: Registry<M>["hasPointer"];
    getPointer: Registry<M>["getPointer"];
    getPointers: Registry<M>["getPointers"];
    removePointer: Registry<M>["removePointer"];
    constructor(model: ModelDecorator<M>, context?: C);
    _getLocalID(id: string): string;
    _register<T extends object>(base: T & {
        id: string;
    }): T & M;
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object): DigestedObjectSchema;
    protected _getSchemaForNode(node: {
        "@id"?: string;
        "@type"?: string[];
    }): DigestedObjectSchema;
    protected _getSchemaForResource(resource: {
        id?: string;
        types?: string[];
    }): DigestedObjectSchema;
    protected _getSchema(objectTypes: string[], objectID?: string): DigestedObjectSchema;
    _parseFreeNodes(freeNodes: RDFNode[]): FreeResources;
    protected _compactRDFNodes(nodes: RDFNode[], targets: object[], library: PointerLibrary): void;
    protected _compactRDFNode(node: RDFNode, target: object, library: PointerLibrary): void;
    _parseErrorFromResponse<T extends object>(response: Response | Error | null): Promise<never>;
}
