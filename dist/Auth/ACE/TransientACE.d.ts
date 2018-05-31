import { ModelFactory } from "../../core/ModelFactory";
import { TransientFragment } from "../../Fragment";
import { Pointer } from "../../Pointer";
import { CS } from "../../Vocabularies";
import { BaseACE } from "./BaseACE";
export interface TransientACE extends TransientFragment {
    granting: boolean;
    permissions: Pointer[];
    subjects: Pointer[];
    subjectsClass: Pointer;
}
export interface TransientACEFactory extends ModelFactory<TransientACE> {
    TYPE: CS["AccessControlEntry"];
    is(value: any): value is TransientACE;
    create<T extends object>(data: T & BaseACE): T & TransientACE;
    createFrom<T extends object>(object: T & BaseACE): T & TransientACE;
}
export declare const TransientACE: TransientACEFactory;
