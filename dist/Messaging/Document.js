"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
function on(event, onEvent, onError) {
    return this._documents.on(event, this.id, onEvent, onError);
}
function off(event, onEvent, onError) {
    return this._documents.off(event, this.id, onEvent, onError);
}
function one(event, onEvent, onError) {
    return this._documents.one(event, this.id, onEvent, onError);
}
function onAccessPointCreated(onEvent, onError) {
    return this._documents.onAccessPointCreated(this.id, onEvent, onError);
}
function onChildCreated(onEvent, onError) {
    return this._documents.onChildCreated(this.id, onEvent, onError);
}
function onDocumentCreated(onEvent, onError) {
    return this._documents.onDocumentCreated(this.id, onEvent, onError);
}
function onDocumentModified(onEvent, onError) {
    return this._documents.onDocumentModified(this.id, onEvent, onError);
}
function onDocumentDeleted(onEvent, onError) {
    return this._documents.onDocumentDeleted(this.id, onEvent, onError);
}
function onMemberAdded(onEvent, onError) {
    return this._documents.onMemberAdded(this.id, onEvent, onError);
}
function onMemberRemoved(onEvent, onError) {
    return this._documents.onMemberRemoved(this.id, onEvent, onError);
}
exports.MessagingDocument = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && Utils_1.hasFunction(object, "on")
            && Utils_1.hasFunction(object, "off")
            && Utils_1.hasFunction(object, "one")
            && Utils_1.hasFunction(object, "onDocumentCreated")
            && Utils_1.hasFunction(object, "onChildCreated")
            && Utils_1.hasFunction(object, "onAccessPointCreated")
            && Utils_1.hasFunction(object, "onDocumentModified")
            && Utils_1.hasFunction(object, "onDocumentDeleted")
            && Utils_1.hasFunction(object, "onMemberAdded")
            && Utils_1.hasFunction(object, "onMemberRemoved");
    },
    decorate: function (object) {
        if (exports.MessagingDocument.isDecorated(object))
            return object;
        return Object.defineProperties(object, {
            "on": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: on,
            },
            "off": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: off,
            },
            "one": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: one,
            },
            "onDocumentCreated": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onDocumentCreated,
            },
            "onChildCreated": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onChildCreated,
            },
            "onAccessPointCreated": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onAccessPointCreated,
            },
            "onDocumentModified": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onDocumentModified,
            },
            "onDocumentDeleted": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onDocumentDeleted,
            },
            "onMemberAdded": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onMemberAdded,
            },
            "onMemberRemoved": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: onMemberRemoved,
            },
        });
    },
};

//# sourceMappingURL=Document.js.map
