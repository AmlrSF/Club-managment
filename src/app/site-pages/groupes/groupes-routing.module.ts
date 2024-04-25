import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGroupeComponent } from './new-groupe/new-groupe.component';
import { ListGroupesComponent } from './list-groupes/list-groupes.component';
import { GroupeDetailsComponent } from './groupe-details/groupe-details.component';
import { GroupesPostsComponent } from '../groupes-posts/groupes-posts.component';
import { GroupesAboutComponent } from '../groupes-about/groupes-about.component';
import { GroupesEventsComponent } from '../groupes-events/groupes-events.component';
import { GroupesManageRequestsComponent } from '../groupes-manage-requests/groupes-manage-requests.component';

const routes: Routes = [
  {
    path: '',
    component: ListGroupesComponent
  },
  {
    path: 'new',
    component: NewGroupeComponent
  },
  {
    path: ':id',
    component: GroupeDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'posts',
        component: GroupesPostsComponent
      },
      {
        path: 'about',
        component: GroupesAboutComponent
      },
      {
        path: 'events',
        component: GroupesEventsComponent
      },
      {
        path: 'requests',
        component: GroupesManageRequestsComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupesRoutingModule { }
