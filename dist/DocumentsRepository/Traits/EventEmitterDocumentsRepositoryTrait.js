"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralRepository_1 = require("../../GeneralRepository/GeneralRepository");
var Event_1 = require("../../Messaging/Event");
var Utils_1 = require("../../Messaging/Utils");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var Utils_2 = require("../../Utils");
exports.EventEmitterDocumentsRepositoryTrait = {
    PROTOTYPE: {
        on: function (event, uriPattern, onEvent, onError) {
            try {
                var destination = Utils_1.createDestination(event, uriPattern, this.$context.baseURI);
                this.$context.messaging.subscribe(destination, onEvent, onError);
            }
            catch (error) {
                if (!onError)
                    throw error;
                onError(error);
            }
        },
        off: function (event, uriPattern, onEvent, onError) {
            try {
                var destination = Utils_1.createDestination(event, uriPattern, this.$context.baseURI);
                this.$context.messaging.unsubscribe(destination, onEvent);
            }
            catch (error) {
                if (!onError)
                    throw error;
                onError(error);
            }
        },
        one: function (event, uriPattern, onEvent, onError) {
            var _this = this;
            try {
                var destination_1 = Utils_1.createDestination(event, uriPattern, this.$context.baseURI);
                var onEventWrapper_1 = function (message) {
                    onEvent(message);
                    _this.$context.messaging.unsubscribe(destination_1, onEventWrapper_1);
                };
                this.$context.messaging.subscribe(destination_1, onEventWrapper_1, onError);
            }
            catch (error) {
                if (!onError)
                    throw error;
                onError(error);
            }
        },
        onChildCreated: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.CHILD_CREATED, uriPattern, onEvent, onError);
        },
        onDocumentModified: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError);
        },
        onDocumentDeleted: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.DOCUMENT_DELETED, uriPattern, onEvent, onError);
        },
        onMemberAdded: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.MEMBER_ADDED, uriPattern, onEvent, onError);
        },
        onMemberRemoved: function (uriPattern, onEvent, onError) {
            return this.on(Event_1.Event.MEMBER_REMOVED, uriPattern, onEvent, onError);
        },
    },
    isDecorated: function (object) {
        return Utils_2.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.EventEmitterDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.EventEmitterDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, GeneralRepository_1.GeneralRepository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.EventEmitterDocumentsRepositoryTrait.PROTOTYPE, resource);
    },
};

//# sourceMappingURL=EventEmitterDocumentsRepositoryTrait.js.map
