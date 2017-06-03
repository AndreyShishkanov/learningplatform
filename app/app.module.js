"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var video_component_1 = require("./video/video.component");
var video_module_1 = require("./video/video.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var home_module_1 = require("./home/home.module");
var login_component_1 = require("./login/login.component");
var login_module_1 = require("./login/login.module");
var not_found_component_1 = require("./not-found.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'video', component: video_component_1.VideoComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', component: not_found_component_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, video_module_1.VideoModule, home_module_1.HomeModule, login_module_1.LoginModule, router_1.RouterModule.forRoot(appRoutes)],
        bootstrap: [app_component_1.AppComponent],
        declarations: [app_component_1.AppComponent, not_found_component_1.PageNotFoundComponent],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map