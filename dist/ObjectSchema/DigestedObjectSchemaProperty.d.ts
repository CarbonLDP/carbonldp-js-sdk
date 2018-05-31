import { ContainerType } from "./ContainerType";
import { PointerType } from "./PointerType";
export declare class DigestedObjectSchemaProperty {
    uri: string;
    literal: boolean;
    literalType: string;
    pointerType: PointerType;
    language?: string;
    containerType: ContainerType;
}
