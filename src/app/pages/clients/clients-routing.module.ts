import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

const routes: Routes = [
  {path:"" ,component:ListClientsComponent},
  {path:"new",component:AddClientComponent},
  {path:"client/:id" ,component:ClientDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
