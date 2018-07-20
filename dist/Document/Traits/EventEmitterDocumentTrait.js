"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../../Messaging/Event");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var URI_1 = require("../../RDF/URI");
var ResolvablePointer_1 = require("../../Repository/ResolvablePointer");
var Utils_1 = require("../../Utils");
var TransientDocument_1 = require("../TransientDocument");
function __parseParams(resource, uriPatternOROnEvent, onEventOrOnError, onError) {
    var uriPattern = Utils_1.isString(uriPatternOROnEvent) ?
        URI_1.URI.resolve(resource.$id, uriPatternOROnEvent) : resource.$id;
    var onEvent = Utils_1.isFunction(uriPatternOROnEvent) ?
        uriPatternOROnEvent : onEventOrOnError;
    if (onEvent !== onEventOrOnError)
        onError = onEventOrOnError;
    return { uriPattern: uriPattern, onEvent: onEvent, onError: onError };
}
exports.EventEmitterDocumentTrait = {
    PROTOTYPE: {
        on: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
            var _a = __parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, $onError = _a.onError;
            return this.$repository.on(event, uriPattern, onEvent, $onError);
        },
        off: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
            var _a = __parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, $onError = _a.onError;
            return this.$repository.off(event, uriPattern, onEvent, $onError);
        },
        one: function (event, uriPatternOROnEvent, onEventOrOnError, onError) {
            var _a = __parseParams(this, uriPatternOROnEvent, onEventOrOnError, onError), uriPattern = _a.uriPattern, onEvent = _a.onEvent, $onError = _a.onError;
            return this.$repository.one(event, uriPattern, onEvent, $onError);
        },
        onChildCreated: function (uriPatternOROnEvent, onEventOrOnError, onError) {
            return this.on(Event_1.Event.CHILD_CREATED, uriPatternOROnEvent, onEventOrOnError, onError);
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
    },
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.EventEmitterDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.EventEmitterDocumentTrait.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.EventEmitterDocumentTrait.PROTOTYPE, resource);
    },
};

//# sourceMappingURL=EventEmitterDocumentTrait.js.map
