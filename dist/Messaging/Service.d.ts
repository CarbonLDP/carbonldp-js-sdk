import Carbon from "../Carbon";
import * as Message from "./Message";
import Options from "./Options";
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
    subscribe(destination: string, onEvent: (data: Message.Class) => void, onError: (error: Error) => void): void;
    unsubscribe(destination: string, onEvent: (data: Message.Class) => void): void;
    private broadcastError(error);
    private makeSubscription(id, destination, eventCallback, errorCallback);
    private storeSubscriptions();
}
export default Class;
