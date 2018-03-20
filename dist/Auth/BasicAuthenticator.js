"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Utils_1 = require("../Utils");
var Authenticator_1 = require("./Authenticator");
var BasicCredentials = __importStar(require("./BasicCredentials"));
var BasicAuthenticator = (function (_super) {
    __extends(BasicAuthenticator, _super);
    function BasicAuthenticator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicAuthenticator.prototype.authenticate = function (authenticationToken) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            if (authenticationToken === null)
                throw new Errors_1.IllegalArgumentError("The authenticationToken cannot be null.");
            if (!authenticationToken.username)
                throw new Errors_1.IllegalArgumentError("The username cannot be empty.");
            if (!authenticationToken.password)
                throw new Errors_1.IllegalArgumentError("The password cannot be empty.");
            _this.credentials = new BasicCredentials.Class(authenticationToken.username, authenticationToken.password);
            return _this.credentials;
        });
    };
    BasicAuthenticator.prototype.getHeaderValue = function () {
        return "Basic " + toB64(this.credentials.username + ":" + this.credentials.password);
    };
    return BasicAuthenticator;
}(Authenticator_1.Authenticator));
exports.BasicAuthenticator = BasicAuthenticator;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}

//# sourceMappingURL=BasicAuthenticator.js.map
