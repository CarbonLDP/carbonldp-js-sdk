import { CarbonLDP } from "../CarbonLDP";
import { Document } from "../Document";
import { Response } from "../HTTP";
import { RegistryService } from "./RegistryService";
export declare class DocumentsRegistry extends RegistryService<Document, CarbonLDP> {
    readonly context: CarbonLDP | undefined;
    constructor(context?: CarbonLDP);
    register(id: string): Document;
    _getLocalID(id: string): string;
    _parseErrorFromResponse<T extends object>(response: Response | Error | null): Promise<never>;
    protected _addErrorResponseData(response: Response, error: Error): Promise<never>;
}
