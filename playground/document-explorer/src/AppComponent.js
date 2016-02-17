System.register(["angular2/core", "angular2/common", "angular2/router", "carbon/Carbon", "./document-explorer/DocumentExplorerComponent", "./template.html!", "./style.css!"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var core_1, common_1, router_1, Carbon_1, DocumentExplorerComponent_1, template_html_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (DocumentExplorerComponent_1_1) {
                DocumentExplorerComponent_1 = DocumentExplorerComponent_1_1;
            },
            function (template_html_1_1) {
                template_html_1 = template_html_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
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
                AppComponent.parameters = [[core_1.ElementRef], [Carbon_1.default]];
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: template_html_1.default,
                        directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, DocumentExplorerComponent_1.default],
                    })
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("default", AppComponent);
        }
    }
});
//# sourceMappingURL=AppComponent.js.map