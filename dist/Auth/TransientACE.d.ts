import { TransientFragment } from "../Fragment";
import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
export interface TransientACE extends TransientFragment {
    granting: boolean;
    permissions: Pointer[];
    subjects: Pointer[];
    subjectsClass: Pointer;
}
export interface TransientACEFactory extends ModelFactory<TransientACE> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is TransientACE;
    create(granting: boolean, subjects: Pointer[], subjectClass: Pointer, permissions: Pointer[]): TransientACE;
    createFrom<T extends object>(object: T, granting: boolean, subjects: Pointer[], subjectClass: Pointer, permissions: Pointer[]): T & TransientACE;
}
export declare const TransientACE: TransientACEFactory;
