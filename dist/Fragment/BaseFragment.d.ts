import { BaseResource } from "../Resource";
import { TransientDocument } from "../TransientDocument";
export interface BaseFragment extends BaseResource {
    _document: TransientDocument;
}
