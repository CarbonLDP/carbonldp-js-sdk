import { Document } from "../Document/Document";
import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { DocumentsRepository } from "../DocumentsRepository/DocumentsRepository";
import { MessagingService } from "../Messaging/MessagingService";
import { AbstractContext } from "./AbstractContext";
import { DocumentsContextSettings, Paths } from "./DocumentsContextSettings";
import { GlobalContext } from "./GlobalContext";
export declare class DocumentsContext extends AbstractContext<Document, Document, GlobalContext> {
    protected _baseURI: string;
    readonly registry: DocumentsRegistry;
    readonly repository: DocumentsRepository;
    readonly messaging: MessagingService;
    protected _settings?: DocumentsContextSettings;
    private static __mergePaths;
    constructor(url: string);
    _resolvePath(path: string): string;
    protected _extendPaths(paths: Paths): void;
    protected _extendsSettings(settings: DocumentsContextSettings): void;
}
