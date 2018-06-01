import { ModelSchema } from "../../core/ModelSchema";
import { Fragment } from "../../Fragment";
import { ObjectSchema } from "../../ObjectSchema";
import { CS } from "../../Vocabularies";
import { ACL } from "../ACL";
import { TransientACE, TransientACEFactory } from "./TransientACE";
export interface ACE extends TransientACE, Fragment {
    _document: ACL;
}
export interface ACEFactory extends ModelSchema, TransientACEFactory {
    TYPE: CS["AccessControlEntry"];
    SCHEMA: ObjectSchema;
    is(value: any): value is ACE;
}
export declare const ACE: ACEFactory;
