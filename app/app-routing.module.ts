import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./feature/client/client.component";
import {EmergencyPinHistoryComponent} from "./feature/other-items/emergency-pin-history.component";
import {EmergencyPinConfigComponent} from "./feature/other-items/emergency-pin-config.component";
import {ClientLookHistoryComponent} from "./feature/other-items/clients-look-history.component";

const routes: Routes = [
  { path: 'client', component: ClientComponent },
  { path: 'client-look-history', component: ClientLookHistoryComponent },
  { path: 'emergency-pin-configuration', component: EmergencyPinConfigComponent },
  { path: 'emergency-pin-history', component: EmergencyPinHistoryComponent },
  { path: '', redirectTo: '/client', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
