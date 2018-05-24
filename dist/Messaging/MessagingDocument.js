"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Document_1 = require("../Document");
var Errors_1 = require("../Errors");
var RDF_1 = require("../RDF");
var Utils_1 = require("../Utils");
var Event_1 = require("./Event");
var Utils_2 = require("./Utils");
function getMessagingService(repository) {
    if (!repository._context || !repository._context.messaging)
        throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support messaging subscriptions.");
    return repository._context.messaging;
}
function parseParams(resource, uriPatternOROnEvent, onEventOrOnError, onError) {
    var uriPattern = Utils_1.isString(uriPatternOROnEvent) ?
        RDF_1.URI.resolve(resource.id, uriPatternOROnEvent) : resource.id;
    var onEvent = Utils_1.isFunction(uriPatternOROnEvent) ?
        uriPatternOROnEvent : onEventOrOnError;
    if (onEvent !== onEventOrOnError)
        onError = onEventOrOnError;
    return { uriPattern: uriPattern, onEvent: onEvent, onError: onError };
}
var PROTOTYPE = {
    on: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
        try {
            var messaging = getMessagingService(this);
            var uriPattern = void 0, onEvent = void 0;
            (_a = parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, onError = _a.onError);
            var destination = Utils_2.createDestination(event, uriPattern, this._context.baseURI);
            messaging.subscribe(destination, onEvent, onError);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
        var _a;
    },
    off: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
        try {
            var messaging = getMessagingService(this);
            var uriPattern = void 0, onEvent = void 0;
            (_a = parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, onError = _a.onError);
            var destination = Utils_2.createDestination(event, uriPattern, this._context.baseURI);
            messaging.unsubscribe(destination, onEvent);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
        var _a;
    },
    one: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
        try {
            var messaging_1 = getMessagingService(this);
            var uriPattern = void 0, onEvent_1;
            (_a = parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent_1 = _a.onEvent, onError = _a.onError);
            var destination_1 = Utils_2.createDestination(event, uriPattern, this._context.baseURI);
            messaging_1.subscribe(destination_1, function onEventWrapper(message) {
                onEvent_1(message);
                messaging_1.unsubscribe(destination_1, onEventWrapper);
            }, onError);
        }
        catch (error) {
            if (!onError)
                throw error;
            onError(error);
        }
        var _a;
    },
    onAccessPointCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.ACCESS_POINT_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onChildCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.CHILD_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onDocumentCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.DOCUMENT_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onDocumentModified: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.DOCUMENT_MODIFIED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onDocumentDeleted: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.DOCUMENT_DELETED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onMemberAdded: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.MEMBER_ADDED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
    onMemberRemoved: function (uriPatternOROnEvent, onEventOrOnError, onError) {
        return this.on(Event_1.Event.MEMBER_REMOVED, uriPatternOROnEvent, onEventOrOnError, onError);
    },
};
exports.MessagingDocument = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.MessagingDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, Document_1.TransientDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=MessagingDocument.js.map
