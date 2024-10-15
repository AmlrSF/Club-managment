import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomePageComponent } from '../site-pages/home-page/home-page.component';

const routes: Routes = [
  { path: "", component:SiteLayoutComponent , children: [
    { path : "" , component : HomePageComponent },
    { path : 'squads', loadChildren : ()=>import("../site-pages/club/club.module").then(m=>m.ClubModule) },
    { path : 'posts', loadChildren : ()=>import("../site-pages/post/post.module").then(m=>m.PostModule) },

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
