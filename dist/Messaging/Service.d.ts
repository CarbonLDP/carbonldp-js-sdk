import Carbon from "../Carbon";
import RDFNode from "../RDF/Node";
import Options from "./Options";
declare module "webstomp-client" {
    interface Client {
        connected: boolean;
        connect(headers: ConnectionHeaders, connectCallback: (frame?: Frame) => any, errorCallback?: (error: Frame | CloseEvent) => any): void;
    }
    interface Frame {
        command: string;
        body: string;
        headers: ExtendedHeaders;
    }
}
export declare const DEFAULT_OPTIONS: Options;
export declare class Class {
    private context;
    private _options;
    private _attempts;
    private _client?;
    private _subscriptionsMap;
    private _subscriptionsQueue;
    constructor(context: Carbon);
    setOptions(options: Options): void;
    connect(onConnect?: () => void, onError?: (error: Error) => void): void;
    reconnect(onConnect?: () => void, onError?: (error: Error) => void): void;
    subscribe(destination: string, onEvent: (data: RDFNode[]) => void, onError: (error: Error) => void): void;
    unsubscribe(destination: string, onEvent: (data: RDFNode[]) => void): void;
    private broadcastError(error);
    private makeSubscription(id, destination, eventCallback, errorCallback);
    private storeSubscriptions();
}
export default Class;
