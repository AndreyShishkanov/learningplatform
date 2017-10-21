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
var video_module_1 = require("./video/video.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var home_module_1 = require("./home/home.module");
var login_component_1 = require("./login/login.component");
var not_found_component_1 = require("./not-found.component");
var authentication_guard_1 = require("./shared/service/authentication.guard");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var authentication_service_1 = require("./shared/service/authentication.service");
var video_component_1 = require("./video/video.component");
var file_upload_service_1 = require("./shared/service/file-upload.service");
var forms_2 = require("@angular/forms");
var explaining_component_1 = require("./explaining/explaining.component");
var explaining_module_1 = require("./explaining/explaining.module");
var validation_component_1 = require("./shared/modules/validation.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'registration', component: login_component_1.RegistrationComponent },
    { path: 'video', component: video_component_1.VideoComponent, canActivate: [authentication_guard_1.AuthGuard] },
    { path: 'explaining', component: explaining_component_1.ExplainingComponent, canActivate: [authentication_guard_1.AuthGuard] },
    { path: '', component: home_component_1.HomeComponent, canActivate: [authentication_guard_1.AuthGuard] },
    { path: '**', component: not_found_component_1.PageNotFoundComponent, canActivate: [authentication_guard_1.AuthGuard] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, video_module_1.VideoModule, explaining_module_1.ExplainingModule, forms_1.FormsModule, http_1.HttpModule, home_module_1.HomeModule, forms_2.ReactiveFormsModule, router_1.RouterModule.forRoot(appRoutes)],
            bootstrap: [app_component_1.AppComponent],
            declarations: [app_component_1.AppComponent, not_found_component_1.PageNotFoundComponent, login_component_1.LoginComponent, login_component_1.LogoutComponent, login_component_1.RegistrationComponent, validation_component_1.ControlMessages],
            providers: [authentication_service_1.AuthenticationService, authentication_guard_1.AuthGuard, file_upload_service_1.FilesUploadService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map