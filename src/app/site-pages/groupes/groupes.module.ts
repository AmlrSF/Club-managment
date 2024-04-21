import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupesRoutingModule } from './groupes-routing.module';
import { NewGroupeComponent } from './new-groupe/new-groupe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListGroupesComponent } from './list-groupes/list-groupes.component';


@NgModule({
  declarations: [
    NewGroupeComponent,
    ListGroupesComponent
  ],
  imports: [
    CommonModule,
    GroupesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class GroupesModule { }
