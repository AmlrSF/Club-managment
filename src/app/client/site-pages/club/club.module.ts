import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ListClubComponent } from './list-club/list-club.component';
import { NewClubComponent } from './new-club/new-club.component';
import { ClubDetailsComponent } from './club-details/club-details.component';


@NgModule({
  declarations: [
    ListClubComponent,
    NewClubComponent,
    ClubDetailsComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule
  ]
})
export class ClubModule { }
