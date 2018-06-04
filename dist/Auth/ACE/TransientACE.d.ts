import { TransientFragment } from "../../Fragment";
import { Pointer } from "../../Pointer";
import { CS } from "../../Vocabularies";
import { BaseACE } from "./BaseACE";
export interface TransientACE extends TransientFragment {
    subject: Pointer;
    permissions: Pointer[];
}
export interface TransientACEFactory {
    TYPE: CS["AccessControlEntry"];
    create<T extends object>(data: T & BaseACE): T & TransientACE;
    createFrom<T extends object>(object: T & BaseACE): T & TransientACE;
}
export declare const TransientACE: TransientACEFactory;
