import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";
import { ResolvablePointer } from "../Repository/ResolvablePointer";
import { QueryableMetadata } from "./QueryableMetadata";
export interface QueryablePointer extends ResolvablePointer {
    $_queryableMetadata: QueryableMetadata | undefined;
    $isQueried(): boolean;
}
export declare type QueryablePointerFactory = ModelPrototype<QueryablePointer, ResolvablePointer> & ModelDecorator<QueryablePointer, BaseResolvablePointer> & ModelTypeGuard<QueryablePointer>;
export declare const QueryablePointer: QueryablePointerFactory;
