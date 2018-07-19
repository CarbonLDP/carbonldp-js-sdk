import { TransientDocument } from "../Document/TransientDocument";
import { BaseResource } from "../Resource/BaseResource";
export interface BaseTransientFragment extends BaseResource {
    $registry: TransientDocument;
}
