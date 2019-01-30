import { ContextSettings } from "./ContextSettings";


/**
 * Describe a set of paths by a key and its respective URI slug
 * or a {@link DocumentPaths} where one can add sub-paths of the desired document.
 */
export interface Paths {
	[ document:string ]:string | DocumentPaths | null;
}

/**
 * Describe the paths inside a specified document.
 */
export interface DocumentPaths {
	/**
	 * The set of paths inside the specified document.
	 */
	paths?:Paths;
	/**
	 * The slug that specifies the document to add paths.
	 */
	slug?:string;
}

/**
 * Settings of a {@link DocumentsContext}.
 */
export interface DocumentsContextSettings extends ContextSettings {
	/**
	 * The configurable paths of the documents context.
	 */
	paths?:Paths;
}
