import { CarbonLDP } from "../CarbonLDP";
import { EventMessage } from "./EventMessage";
import { MessagingOptions } from "./Options";
export declare class MessagingService {
    readonly context: CarbonLDP;
    private _options;
    private _attempts;
    private _client?;
    private _subscriptionsMap;
    private _subscriptionsQueue;
    constructor(context: CarbonLDP);
    setOptions(options: MessagingOptions): void;
    connect(onConnect?: () => void, onError?: (error: Error) => void): void;
    reconnect(onConnect?: () => void, onError?: (error: Error) => void): void;
    subscribe(destination: string, onEvent: (data: EventMessage) => void, onError: (error: Error) => void): void;
    unsubscribe(destination: string, onEvent: (data: EventMessage) => void): void;
    private _broadcastError(error);
    private _makeSubscription(id, destination, eventCallback, errorCallback);
    private _saveSubscriptions();
}
