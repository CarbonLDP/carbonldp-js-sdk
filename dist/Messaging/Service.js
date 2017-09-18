"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SockJS = require("sockjs-client");
var webstomp = require("webstomp-client");
var Errors_1 = require("../Errors");
var Parser_1 = require("../JSONLD/Parser");
var Utils_1 = require("../Utils");
exports.DEFAULT_OPTIONS = {
    maxReconnectAttempts: 10,
    reconnectDelay: 1000,
};
var Class = (function () {
    function Class(context) {
        this.context = context;
        this._subscriptionsMap = new Map();
        this._subscriptionsQueue = [];
        this._messagingOptions = exports.DEFAULT_OPTIONS;
    }
    Class.prototype.setOptions = function (options) {
        this._messagingOptions = __assign({}, exports.DEFAULT_OPTIONS, options);
    };
    Class.prototype.connect = function (onConnect, onError) {
        var _this = this;
        try {
            if (this._messagingClient)
                throw new Errors_1.IllegalStateError("The messaging service is already connect" + (this._messagingClient.connected ? "ed" : "ing") + ".");
            onError = onError ? onError : function (error) {
            };
            var sock = new SockJS(this.context.resolve("/broker"));
            this._messagingClient = webstomp.over(sock, {
                protocols: webstomp.VERSIONS.supportedProtocols(),
                debug: false,
                heartbeat: false,
                binary: false,
            });
            this._messagingClient.connect({}, function () {
                _this._subscriptionsQueue.forEach(function (callback) { return callback(); });
                _this._subscriptionsQueue.length = 0;
                onConnect();
            }, function (errorFrameOrEvent) {
                var errorMessage;
                if (isCloseError(errorFrameOrEvent)) {
                    _this._messagingClient = null;
                    errorMessage = "CloseEventError: " + errorFrameOrEvent.reason;
                }
                else if (isFrameError(errorFrameOrEvent)) {
                    errorMessage = errorFrameOrEvent.headers["message"] + ": " + errorFrameOrEvent.body.trim();
                }
                else {
                    errorMessage = "Unknown error: " + errorFrameOrEvent;
                }
                throw new Error(errorMessage);
            });
        }
        catch (error) {
            if (onError)
                onError(error);
            throw error;
        }
    };
    Class.prototype.subscribe = function (destination, onEvent, onError) {
        var _this = this;
        if (!this._subscriptionsMap.has(destination))
            this._subscriptionsMap.set(destination, new Map());
        var callbacksMap = this._subscriptionsMap.get(destination);
        if (callbacksMap.has(onEvent))
            return;
        var subscriptionID = Utils_1.UUID.generate();
        callbacksMap.set(onEvent, subscriptionID);
        var subscribeTo = function () {
            _this._messagingClient.subscribe(destination, function (message) {
                new Parser_1.default()
                    .parse(message.body)
                    .then(onEvent)
                    .catch(onError);
            }, { id: subscriptionID });
        };
        if (this._messagingClient) {
            if (this._messagingClient.connected)
                return subscribeTo();
        }
        else {
            this.connect(function () { });
        }
        this._subscriptionsQueue.push(subscribeTo);
    };
    Class.prototype.unsubscribe = function (destination, onEvent) {
        if (!this._messagingClient || !this._subscriptionsMap.has(destination))
            return;
        var callbackMap = this._subscriptionsMap.get(destination);
        if (!callbackMap.has(onEvent))
            return;
        var subscriptionID = callbackMap.get(onEvent);
        callbackMap.delete(onEvent);
        if (callbackMap.size === 0)
            this._subscriptionsMap.delete(destination);
        this._messagingClient.unsubscribe(subscriptionID);
    };
    return Class;
}());
exports.Class = Class;
function isCloseError(object) {
    return "reason" in object;
}
function isFrameError(object) {
    return "body" in object;
}
exports.default = Class;

//# sourceMappingURL=Service.js.map
