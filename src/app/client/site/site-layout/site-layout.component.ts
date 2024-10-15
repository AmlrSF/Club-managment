import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
    
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
          localStorage.setItem("id",res.customer._id);

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
