import { DocumentsContextSettings } from "./Context/DocumentsContextSettings";
export interface CarbonLDPSettings extends DocumentsContextSettings {
    host: string;
    port?: number;
    ssl?: boolean;
}
