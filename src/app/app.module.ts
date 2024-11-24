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
import { FeedComponent } from './client/site-pages/feed/feed.component';
import { ProfileDetailsComponent } from './client/site-pages/profile-details/profile-details.component';
import { RepliesComponent } from './client/site-pages/profile-pages/replies/replies.component';
import { PostsComponent } from './client/site-pages/profile-pages/posts/posts.component';
import { InteretsComponent } from './client/site-pages/profile-pages/interets/interets.component';
import { UpvotesComponent } from './client/site-pages/profile-pages/upvotes/upvotes.component';
import { NotificationsComponent } from './client/site-pages/notifications/notifications.component';

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
    FeedComponent,
    ProfileDetailsComponent,
    RepliesComponent,
    PostsComponent,
    InteretsComponent,
    UpvotesComponent,
    NotificationsComponent,
    
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
