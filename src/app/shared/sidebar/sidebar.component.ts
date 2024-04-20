import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public currentPath: string | undefined;



  constructor(
    public functionsS: FuncServicesService,
    private router: Router,
    private auth: AuthUserService
  ) {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        this.currentPath = event.url.slice(1);

      }
    });

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

 

}
