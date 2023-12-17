import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SidenavComponent } from './sidenav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class SidenavModule { }
