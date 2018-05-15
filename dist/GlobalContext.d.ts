import { AbstractContext } from "./AbstractContext";
import { Pointer } from "./Pointer";
import { RegistryService } from "./Registry";
export declare class GlobalContext extends AbstractContext<Pointer, undefined> {
    static readonly instance: GlobalContext;
    readonly registry: RegistryService<Pointer, GlobalContext>;
    readonly repository: undefined;
    readonly auth: undefined;
    protected _baseURI: "";
    protected _parentContext: undefined;
    private constructor();
    private _registerDefaultObjectSchemas();
    private _registerDefaultDecorators();
}
