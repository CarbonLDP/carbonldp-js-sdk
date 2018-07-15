import { TransientDocument } from "../Document";
import { BaseResource } from "../Resource";
export interface BaseTransientFragment extends BaseResource {
    $registry: TransientDocument;
}
