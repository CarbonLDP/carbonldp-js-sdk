import { CarbonLDP } from "../CarbonLDP";
import { Document } from "../Document";
import { Response } from "../HTTP";
import { Pointer } from "../Pointer";
import { RegistryService } from "./RegistryService";
export declare class DocumentsRegistry extends RegistryService<Document, CarbonLDP> {
    readonly _context: CarbonLDP | undefined;
    constructor(context?: CarbonLDP);
    register(id: string): Document;
    _register<T extends object>(base: T & {
        id: string;
    }): T & Document;
    _getLocalID(id: string): string;
    _requestURLFor(pointer: Pointer, uri?: string): string;
    _parseErrorResponse<T extends object>(response: Response | Error | null): Promise<never>;
}
