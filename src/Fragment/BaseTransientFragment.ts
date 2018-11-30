import { TransientDocument } from "../Document/TransientDocument";

import { BaseResource } from "../Resource/BaseResource";


/**
 * Properties to create an in-memory fragment.
 */
export interface BaseTransientFragment extends BaseResource {
	/**
	 * Registry the fragment will belong to.
	 */
	$registry:TransientDocument;
}
