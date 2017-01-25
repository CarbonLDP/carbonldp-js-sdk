"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var Carbon_1 = require("carbon/Carbon");
var DocumentExplorerComponent_1 = require("./document-explorer/DocumentExplorerComponent");
var template_html_1 = require("./template.html!");
require("./style.css!");
var AppComponent = (function () {
    function AppComponent(element, carbon) {
        this.username = "";
        this.password = "";
        this.appContext = null;
        this.element = element;
        this.carbon = carbon;
    }
    AppComponent.prototype.login = function (username, password) {
        this.carbon.Auth.authenticate(username, password).then(function () {
            console.log("login >> Logged in");
        });
    };
    AppComponent.prototype.logout = function () {
        this.carbon.Auth.clearAuthentication();
        console.log("logout << Logged out");
    };
    AppComponent.prototype.getAppContext = function (appSlug) {
        var _this = this;
        this.carbon.apps.get(appSlug).then(function (appContext) {
            _this.appContext = appContext;
        });
    };
    return AppComponent;
}());
AppComponent.parameters = [[core_1.ElementRef], [Carbon_1.default]];
AppComponent = __decorate([
    core_1.Component({
        selector: "app",
        template: template_html_1.default,
        directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, DocumentExplorerComponent_1.default],
    })
], AppComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppComponent;
