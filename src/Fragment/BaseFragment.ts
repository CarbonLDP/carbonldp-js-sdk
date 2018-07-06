import { TransientDocument } from "../Document";
import { BaseResource } from "../Resource";


export interface BaseFragment extends BaseResource {
	$registry:TransientDocument;
}
