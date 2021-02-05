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
	virtualHost?:string;
	virtualPort?:number;
	virtualSsl?:boolean;
	setSettings?(settings:CarbonLDPSettings):void;
}
export class CarbonLDPSettings implements CarbonLDPSettings {
	private static _instance:CarbonLDPSettings;
	public static getInstance(): CarbonLDPSettings {
		CarbonLDPSettings._instance = CarbonLDPSettings._instance || new CarbonLDPSettings();
		return CarbonLDPSettings._instance;
	}
	// @ts-ignore
	public setSettings( settings:CarbonLDPSettings ):void {
		this.host = settings.host;
		this.port = settings.port;
		this.ssl = settings.ssl;
		this.virtualHost = settings.virtualHost;
		this.virtualPort = settings.virtualPort;
		this.virtualSsl = settings.virtualSsl;
	}
	private constructor() {
		if(CarbonLDPSettings._instance) {
			throw new Error("Error: Instantiation failed: Use CarbonLDPSettings.getInstance() instead of new.");
		}
		CarbonLDPSettings._instance = this;
	}
}
