/**
 * Interface with the methods to serialize values.
 */
export interface Serializer {
	/**
	 * Method that serialize the provided value into a string.
	 * @param value Value to be serialized.
	 */
	serialize( value:any ):string;
}
