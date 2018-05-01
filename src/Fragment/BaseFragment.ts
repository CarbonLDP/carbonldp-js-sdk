import { BaseResource } from "../Resource";
import { TransientDocument } from "../Document";


export interface BaseFragment extends BaseResource {
	_document:TransientDocument;
}
