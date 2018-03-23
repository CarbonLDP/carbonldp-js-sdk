import { DirectContainer } from "./LDP/DirectContainer";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
export interface AccessPointBase {
    hasMemberRelation: string | Pointer;
    isMemberOfRelation?: string | Pointer;
    insertedContentRelation?: string | Pointer;
}
export interface AccessPoint extends DirectContainer {
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export interface AccessPointFactory extends ModelFactory<AccessPoint> {
    TYPE: string;
    is(object: object): object is AccessPoint;
    create(membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): AccessPoint;
    createFrom<T extends object>(object: T, membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): T & AccessPoint;
}
export declare const AccessPoint: AccessPointFactory;
