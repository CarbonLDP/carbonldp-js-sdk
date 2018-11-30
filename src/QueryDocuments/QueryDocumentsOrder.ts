/**
 * Interface that specifies the data of the order wanted fot the result query.
 */
export interface QueryDocumentsOrder {
	/**
	 * The path to the property that specifies the order of the query.
	 */
	path:string;
	/**
	 * The flow of the order wanted.
	 */
	flow?:"ASC" | "DESC";
}
