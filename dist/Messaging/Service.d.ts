import { DocumentsContext } from "../Context";
import { EventMessage } from "./EventMessage";
import { MessagingOptions } from "./Options";
export declare class MessagingService {
    readonly context: DocumentsContext;
    private _options;
    private _attempts;
    private _client?;
    private _subscriptionsMap;
    private _subscriptionsQueue;
    constructor(context: DocumentsContext);
    setOptions(options: MessagingOptions): void;
    connect(onConnect?: () => void, onError?: (error: Error) => void): void;
    reconnect(onConnect?: () => void, onError?: (error: Error) => void): void;
    subscribe(destination: string, onEvent: (data: EventMessage) => void, onError: (error: Error) => void): void;
    unsubscribe(destination: string, onEvent: (data: EventMessage) => void): void;
    private _broadcastError;
    private _makeSubscription;
    private _saveSubscriptions;
}
