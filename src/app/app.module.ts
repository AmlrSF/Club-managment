import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewModule } from './admin/pages/overview/overview.module';
import { ClientsModule } from './admin/pages/clients/clients.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SiteLayoutComponent } from './client/site/site-layout/site-layout.component';

import { HomePageComponent } from './client/site-pages/home-page/home-page.component';
import { SiteNavbarComponent } from './shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from './shared/site-footer/site-footer.component';

import { InterestComponent } from './auth/interest/interest.component';
import { SiteSidebarComponent } from './shared/site-sidebar/site-sidebar.component';
import { ProfileComponent } from './client/site-pages/profile/profile.component';
import { SettingsComponent } from './client/site-pages/settings/settings.component';
import { SquadsComponent } from './admin/pages/squads/squads.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SiteLayoutComponent,
    HomePageComponent,
    SiteNavbarComponent,
    SiteFooterComponent,
    InterestComponent,
    SiteSidebarComponent,
    ProfileComponent,
    SettingsComponent,
    SquadsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverviewModule,
    FormsModule,
    ClientsModule,
    HttpClientModule,
    ReactiveFormsModule,
  
 
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
