import { TransientDirectContainer } from "../LDP/DirectContainer/TransientDirectContainer";
import { ModelFactory } from "../Model/ModelFactory";
import { Pointer } from "../Pointer/Pointer";
import { C } from "../Vocabularies/C";
import { BaseAccessPoint } from "./BaseAccessPoint";
export interface TransientAccessPoint extends TransientDirectContainer {
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export interface TransientAccessPointFactory extends ModelFactory<TransientAccessPoint> {
    TYPE: C["AccessPoint"];
    is(value: any): value is TransientAccessPoint;
    create<T extends object>(data: T & BaseAccessPoint): T & TransientAccessPoint;
    createFrom<T extends object>(object: T & BaseAccessPoint): T & TransientAccessPoint;
}
export declare const TransientAccessPoint: TransientAccessPointFactory;
