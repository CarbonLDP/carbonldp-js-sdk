import { Document } from "../Document/Document";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
export interface MemberDetails extends Resource {
    members: Document[];
}
export interface MemberDetailsFactory {
    SCHEMA: ObjectSchema;
}
export declare const MemberDetails: MemberDetailsFactory;
