import { Fragment } from "../Fragment";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
export interface ACE extends Fragment {
    granting: boolean;
    permissions: Pointer[];
    subjects: Pointer[];
    subjectsClass: Pointer;
}
export interface ACEFactory extends ModelFactory<ACE> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is ACE;
    create(granting: boolean, subjects: Pointer[], subjectClass: Pointer, permissions: Pointer[]): ACE;
    createFrom<T extends object>(object: T, granting: boolean, subjects: Pointer[], subjectClass: Pointer, permissions: Pointer[]): T & ACE;
}
export declare const ACE: ACEFactory;
