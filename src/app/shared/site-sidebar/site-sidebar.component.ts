import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-site-sidebar',
  templateUrl: './site-sidebar.component.html',
  styleUrls: ['./site-sidebar.component.css']
})
export class SiteSidebarComponent {

  public currentPath: string | undefined;
  customer: any;
  squads: any[] = [];
  feeds: any[] = [];



  constructor(
    public functionsS: FuncServicesService,
    private router: Router,
    private auth: AuthUserService,
    private http:HttpClient
  ) {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        this.currentPath = event.url.slice(1);

      }
    });

    let token = {
      token: this.auth.getToken(),
    };

    //console.log(token);

    try {
      this.http
        .post(`http://localhost:3000/api/v1/customers/profile`, token)
        .subscribe(
          (res: any) => {
            if (!res.success) {
              this.router.navigate(['Login']);
            }

            this.customer = res.customer;
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }

   
  }




  // Add this to your component class
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  public navigateTo(item: string) {

    this.router.navigate([item]);

  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  public logout() {
    this.auth.logout();
  }

  public navigateToSquads(){
    this.router.navigate(['/squads/new'])
  }

  public navigateToPublicSquads(){
    this.router.navigate(['/squads'])
  }

  navigateToMyprofile(id:string){
    this.router.navigate([`/profile/${id}`])
  }

  public navigateToSingleSquad(id:any){
    this.router.navigate([`/squads/squad/${id}`])
  }


}
