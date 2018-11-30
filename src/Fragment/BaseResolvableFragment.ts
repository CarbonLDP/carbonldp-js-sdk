import { Document } from "../Document/Document";
import { BaseTransientFragment } from "./BaseTransientFragment";

/**
 * Properties to create a persisted fragment.
 */
export interface BaseResolvableFragment extends BaseTransientFragment {
	/**
	 * Registry the fragment will belong to.
	 */
	$registry:Document;
}
