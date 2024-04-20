import { Component, OnInit } from '@angular/core';
import { FuncServicesService } from './services/func-services.service';
import { AuthUserService } from './services/auth/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public isAuthenticated: boolean = true;
  public currentRoutePath: string = "";
  
  constructor(
    public functionsS: FuncServicesService,
    private auth: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}
  
  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path || "";
  }
  
  getContentStyles() {
    return this.functionsS.status ? { 'width': 'calc(100% - 60px)', 'left': '60px' } : {};
  }


  title = ""

}
