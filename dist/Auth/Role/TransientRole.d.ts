import { TransientDocument } from "../../Document";
import { CS } from "../../Vocabularies";
import { BaseRole } from "./BaseRole";
export interface TransientRole extends TransientDocument {
    name: string;
    description?: string;
}
export interface TransientRoleFactory {
    TYPE: CS["Role"];
    is(value: any): value is TransientRole;
    create<T extends object>(data: T & BaseRole): T & TransientRole;
    createFrom<T extends object>(object: T & BaseRole): T & TransientRole;
}
export declare const TransientRole: TransientRoleFactory;
