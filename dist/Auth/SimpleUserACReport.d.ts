import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import { CS } from "../Vocabularies";
export interface SimpleUserACReport extends TransientResource {
    protectedDocument: Pointer;
    permissions: Pointer[];
}
export interface SimpleUserACReportFactory {
    TYPE: CS["SimpleUserACReport"];
    SCHEMA: ObjectSchema;
}
export declare const SimpleUserACReport: SimpleUserACReportFactory;
