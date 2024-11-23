import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css'],
})
export class SiteNavbarComponent implements OnInit {
  public customer: any = null;

  public constructor(
    private http: HttpClient,
    private auth: AuthUserService,
    private functionsS: FuncServicesService,
    private router: Router
  ) {}

  navigateToProfileDetails(id: any) {
    this.router.navigate([`/profile/${id}`]);
  }

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken(),
    };

    console.log(token);

    try {
      this.http
        .post(`http://localhost:3000/api/v1/customers/profile`, token)
        .subscribe(
          (res: any) => {
            this.customer = res.customer;
            console.log(this.customer);
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  public logout() {
    this.toggleDropdown();
    return this.auth.logout();
  }

  public toggleDropdown() {
    document.getElementById('user-dropdown')?.classList.toggle('hidden');
  }

  public navigateTo(item: string) {
    this.router.navigate([item]);
  }

  public addToggle() {
    this.functionsS.addToggle();
  }

  navigateToGroupe() {
    this.router.navigate(['/posts/new']);
  }
}
