import { NgModule }      from '@angular/core';
import { ExplainingComponent } from './explaining.component';
import { FormsModule } from '@angular/forms';
import {routing} from "./explaining.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports:      [ FormsModule, SharedModule, routing],
    declarations: [ ExplainingComponent ]
})
export class ExplainingModule { }
