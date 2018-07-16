import { Document } from "../Document/Document";
import { Pointer } from "../Pointer/Pointer";
import { TransientAccessPointFactory } from "./TransientAccessPoint";
export interface AccessPoint extends Document {
    membershipResource: Document;
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export interface AccessPointFactory extends TransientAccessPointFactory {
    is(value: any): value is AccessPoint;
}
export declare const AccessPoint: AccessPointFactory;
