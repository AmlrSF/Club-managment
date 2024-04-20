import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private functionsS:FuncServicesService , private auth: AuthUserService, private router : Router, private http: HttpClient){}

  public customer :any;


  ngOnInit(): void {
    let token = {
      token: this.auth.getToken()
    };

    //console.log(token);

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`, token).subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(["Login"]);
          }

          this.customer = res.customer;


          
        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  public logout(){
    this.toggleDropdown();
    return this.auth.logout();
  }
  
  public toggleDropdown() {
    document.getElementById('user-dropdown')?.classList.toggle('hidden');
  }

  public navigateTo(item: string) {

    this.router.navigate([item]);

  }
  
  
  public addToggle(){
    this.functionsS.addToggle(); 
  }

  
}
