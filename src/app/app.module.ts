import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewModule } from './pages/overview/overview.module';
import { ClientsModule } from './pages/clients/clients.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SiteLayoutComponent } from './site/site-layout/site-layout.component';

import { HomePageComponent } from './site-pages/home-page/home-page.component';
import { SiteNavbarComponent } from './shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from './shared/site-footer/site-footer.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { InterestComponent } from './auth/interest/interest.component';
import { SiteSidebarComponent } from './shared/site-sidebar/site-sidebar.component';
import { ManageRequestsComponent } from './pages/manage-requests/manage-requests.component';
import { GroupesPostsComponent } from './site-pages/groupes-posts/groupes-posts.component';
import { GroupesAboutComponent } from './site-pages/groupes-about/groupes-about.component';
import { GroupesManageRequestsComponent } from './site-pages/groupes-manage-requests/groupes-manage-requests.component';
import { GroupesEventsComponent } from './site-pages/groupes-events/groupes-events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SiteLayoutComponent,
    HomePageComponent,
    SiteNavbarComponent,
    SiteFooterComponent,
    ProfileComponent,
    InterestComponent,
    SiteSidebarComponent,
    ManageRequestsComponent,
    GroupesPostsComponent,
    GroupesAboutComponent,
    GroupesManageRequestsComponent,
    GroupesEventsComponent,
    
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
