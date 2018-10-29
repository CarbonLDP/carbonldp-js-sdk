import { DocumentsContextSettings } from "./Context/DocumentsContextSettings";


/**
 * Interface of the possible settings used by the Carbon class.
 */
export interface CarbonLDPSettings extends DocumentsContextSettings {
	/**
	 * The host of the platform to connect to.
	 */
	host:string;
	/**
	 * The optional port of the host to connect to.
	 */
	port?:number;
	/**
	 * Flag that indicates is the server is under a secure connection or not.
	 * By default it will be set to true, making the host to be resolved as `https://`
	 */
	ssl?:boolean;
}
