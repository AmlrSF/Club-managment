import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGroupeComponent } from './new-groupe/new-groupe.component';
import { ListGroupesComponent } from './list-groupes/list-groupes.component';

const routes: Routes = [
  {path:"",component:ListGroupesComponent},
  {path:"new",component:NewGroupeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupesRoutingModule { }
