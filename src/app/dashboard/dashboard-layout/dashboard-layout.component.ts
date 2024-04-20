import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
    
  constructor(
    public functionsS: FuncServicesService,
    public auth : AuthUserService,
    private router : Router,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    
    let token = {
      token : this.auth.getToken()
    }

    //console.log(token);
    
    
    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res:any)=>{
        
          
          if(!res.success) {
            this.router.navigate(["Login"])
          }
          

        },(err:any)=>{
          console.log(err);
        }
      )
    } catch (error) {
      
    }

  }

  getContentStyles() {
    return this.functionsS.status ? { 'width': 'calc(100% - 60px)', 'left': '60px' } : {};
  }

}
