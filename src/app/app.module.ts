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
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './site-pages/home-page/home-page.component';
import { SiteNavbarComponent } from './shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from './shared/site-footer/site-footer.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { InterestComponent } from './auth/interest/interest.component';
import { SiteSidebarComponent } from './shared/site-sidebar/site-sidebar.component';

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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverviewModule,
    FormsModule,
    ClientsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
