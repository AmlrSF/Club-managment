import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGroupeComponent } from './new-groupe/new-groupe.component';
import { ListGroupesComponent } from './list-groupes/list-groupes.component';
import { GroupeDetailsComponent } from './groupe-details/groupe-details.component';

const routes: Routes = [
  {path:"",component:ListGroupesComponent},
  {path:"new",component:NewGroupeComponent},
  {path:":id",component:GroupeDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupesRoutingModule { }
