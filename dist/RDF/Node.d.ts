import { PointerLibrary } from "../Pointer";
import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { RDFValue } from "./Value";
export declare type RDFNodePropertyValue = string | RDFNode | RDFList | RDFValue | RDFLiteral;
export interface RDFNode {
    "@id": string;
    "@type"?: string[];
    [propertyURI: string]: string | RDFNodePropertyValue[];
}
export interface RDFNodeFactory {
    is(value: any): value is RDFNode;
    create(uri: string): RDFNode;
    getID(node: RDFNode): string;
    getRelativeID(node: RDFNode): string;
    areEqual(node1: RDFNode, node2: RDFNode): boolean;
    isFragment(node: RDFNode): boolean;
    hasType(node: RDFNode, type: string): boolean;
    getTypes(node: RDFNode): string[];
    getFreeNodes(objects: object | object[]): RDFNode[];
    getList(propertyValues: RDFNodePropertyValue[]): RDFList | undefined;
    getProperties(propertyValues: RDFNodePropertyValue[], pointerLibrary: PointerLibrary): any[] | undefined;
    getPropertyPointers(propertyValues: RDFNodePropertyValue[], pointerLibrary: PointerLibrary): any[] | undefined;
    getPropertyLiterals(propertyValues: RDFNodePropertyValue[], literalType: string): any[] | undefined;
    getPropertyLanguageMap(propertyValues: RDFNodePropertyValue[]): object | undefined;
}
export declare const RDFNode: RDFNodeFactory;
