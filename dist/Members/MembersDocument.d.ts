import { AbstractContext } from "../AbstractContext";
import { RequestOptions } from "../HTTP";
import { Pointer } from "../Pointer";
import { RegistryService } from "../Registry";
import { TransientResource } from "../Resource";
import { PickSelfProps } from "../Utils";
export interface MembersDocument extends TransientResource {
    _registry: RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined> | undefined;
    addMember(member: string | Pointer, requestOptions?: RequestOptions): Promise<void>;
    addMember(uri: string, member: string | Pointer, requestOptions?: RequestOptions): Promise<void>;
    addMembers(members: (string | Pointer)[], requestOptions?: RequestOptions): Promise<void>;
    addMembers(uri: string, members: (string | Pointer)[], requestOptions?: RequestOptions): Promise<void>;
    removeMember(member: string | Pointer, requestOptions?: RequestOptions): Promise<void>;
    removeMember(uri: string, member: string | Pointer, requestOptions?: RequestOptions): Promise<void>;
    removeMembers(members: (string | Pointer)[], requestOptions?: RequestOptions): Promise<void>;
    removeMembers(uri: string, members: (string | Pointer)[], requestOptions?: RequestOptions): Promise<void>;
    removeAllMembers(requestOptions?: RequestOptions): Promise<void>;
    removeAllMembers(uri: string, requestOptions?: RequestOptions): Promise<void>;
}
export interface MembersDocumentFactory {
    PROTOTYPE: PickSelfProps<MembersDocument, TransientResource, "_registry">;
    isDecorated(object: object): object is MembersDocument;
    decorate<T extends object>(object: T): T & MembersDocument;
}
export declare const MembersDocument: MembersDocumentFactory;
