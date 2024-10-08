import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomePageComponent } from '../site-pages/home-page/home-page.component';

const routes: Routes = [
  { path: "", component:SiteLayoutComponent , children: [
    { path : "" , component : HomePageComponent },
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
