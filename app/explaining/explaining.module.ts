import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExplainingComponent } from './explaining.component';
import { FormsModule } from '@angular/forms';
import {SocketService} from "../shared/service/websocket.service";

@NgModule({
    imports:      [ BrowserModule, FormsModule],
    declarations: [ ExplainingComponent ],
    providers:    [SocketService]
})
export class ExplainingModule { }
