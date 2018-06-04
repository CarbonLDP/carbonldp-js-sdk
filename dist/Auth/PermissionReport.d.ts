import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies";
import { GrantingStep } from "./GrantingStep";
export interface PermissionReport {
    permission: Pointer;
    granted: boolean;
    grantingChain: GrantingStep[];
}
export interface PermissionReportFactory {
    TYPE: CS["PermissionReport"];
    SCHEMA: ObjectSchema;
}
export declare const PermissionReport: PermissionReportFactory;
