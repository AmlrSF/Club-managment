import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClubComponent } from './list-club/list-club.component';
import { NewClubComponent } from './new-club/new-club.component';
import { ClubDetailsComponent } from './club-details/club-details.component';

const routes: Routes = [
  { path:"" ,component:ListClubComponent},
  {path:"new",component:NewClubComponent},
  {path:"squad/:id" ,component:ClubDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }