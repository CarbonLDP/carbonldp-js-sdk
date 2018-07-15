import { Document } from "../Document";
import { Pointer } from "../Pointer";
import { TransientAccessPointFactory } from "./TransientAccessPoint";
export interface AccessPoint extends Document {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export interface AccessPointFactory extends TransientAccessPointFactory {
    is(value: any): value is AccessPoint;
}
export declare const AccessPoint: AccessPointFactory;
