import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { RegisteredPointer } from "../Registry";
import { AbstractContext } from "./AbstractContext";
export declare class GlobalContext extends AbstractContext<RegisteredPointer, undefined, undefined> {
    static readonly instance: GlobalContext;
    readonly registry: GeneralRegistry<RegisteredPointer>;
    readonly repository: undefined;
    protected _baseURI: "";
    private constructor();
    private _registerDefaultObjectSchemas;
    private _registerDefaultDecorators;
}
