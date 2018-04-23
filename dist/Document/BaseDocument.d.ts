import { Pointer } from "../Pointer";
import { BaseResource } from "../Resource";
export interface BaseDocument extends BaseResource {
    hasMemberRelation?: Pointer | string;
    isMemberOfRelation?: Pointer | string;
}
