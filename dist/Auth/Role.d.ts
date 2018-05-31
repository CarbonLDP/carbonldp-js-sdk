import { BaseDocument, TransientDocument } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies";
export interface RoleBase extends BaseDocument {
    name: string;
    description?: string;
}
export interface Role extends TransientDocument {
    name: string;
    description?: string;
}
export interface RoleFactory {
    TYPE: CS["Role"];
    SCHEMA: ObjectSchema;
    is(value: any): value is Role;
    create(data: RoleBase): Role;
    createFrom<T extends RoleBase>(object: T): Role;
}
export declare const Role: RoleFactory;
