var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Component, ElementRef } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES } from "angular2/router";
import Carbon from "carbon/Carbon";
import DocumentExplorerComponent from "./document-explorer/DocumentExplorerComponent";
import template from "./template.html!";
import "./style.css!";
let AppComponent = class {
    constructor(element, carbon) {
        this.username = "";
        this.password = "";
        this.appContext = null;
        this.element = element;
        this.carbon = carbon;
    }
    login(username, password) {
        this.carbon.Auth.authenticate(username, password).then(() => {
            console.log("login >> Logged in");
        });
    }
    logout() {
        this.carbon.Auth.clearAuthentication();
        console.log("logout << Logged out");
    }
    getAppContext(appSlug) {
        this.carbon.apps.get(appSlug).then((appContext) => {
            this.appContext = appContext;
        });
    }
};
AppComponent.parameters = [[ElementRef], [Carbon]];
AppComponent = __decorate([
    Component({
        selector: "app",
        template: template,
        directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, DocumentExplorerComponent],
    })
], AppComponent);
export default AppComponent;
//# sourceMappingURL=AppComponent.js.map