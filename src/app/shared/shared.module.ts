import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AuthenticationService } from "./service/authentication.service";
import {AuthGuard} from "./service/authentication.guard";
import {SocketService} from "./service/websocket.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [

    ],
    exports: [CommonModule, RouterModule]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AuthenticationService, AuthGuard, SocketService]
        };
    }
}